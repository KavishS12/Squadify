import random
import numpy as np
import pandas as pd
from deap import base, creator, tools, algorithms
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

def select_best_squad(min_budget, max_budget, formation, scoring_strategy, clubboost, nationboost,currently,nations=[],clubs=[], nogens=200,popul=800,csv_path="final_krazi_adjusted.csv"):
    SEED = 1
    random.seed(SEED)
    np.random.seed(SEED)
    df = pd.read_csv(csv_path)
    df["Market_Value"] = pd.to_numeric(df["Market_Value"], errors="coerce")
    df = df[df["Market_Value"] > 0].reset_index(drop=True)
    if currently:
        df = df[df["Last_played"] == 2425].reset_index(drop=True)
    if scoring_strategy=='onlypotential':
        df=df[df["age"]<25].reset_index(drop=True)
    elif scoring_strategy=='futurestars':
        df=df[df["age"]<30].reset_index(drop=True)
    elif scoring_strategy=='veterans':
        df=df[30>=df["age"]>=25].reset_index(drop=True)
    elif scoring_strategy=='onlyoverall':
        df=df[df["age"]>30].reset_index(drop=True)
    if nations:  # Only filter if nations list is not empty
        df = df[df["nation"].isin(nations)].reset_index(drop=True)

    if clubs:  # Only filter if clubs list is not empty
        df = df[df["club"].isin(clubs)].reset_index(drop=True)

            
    players = df.index.tolist()
    nation = df["nation"].tolist()
    club = df["club"].tolist()
    position = df["pos"].tolist()
    overall = df["overall_ratings"].tolist()
    potential = df["potential_ratings"].tolist()
    market_value = df["Market_Value"].tolist()
    
    compatibility_boosts = {}
    for i in range(len(players)):
        for j in range(len(players)):
            if i != j:
                boost = 0
                if clubboost and club[i] == club[j]:  
                    boost += 0.05
                elif nationboost and nation[i] == nation[j]:  
                    boost += 0.03
                
                if boost > 0:
                    compatibility_boosts[(i, j)] = boost
    
    position_dict = {
        "GK": [i for i in players if "GK" in position[i]],
        "DF": [i for i in players if "DF" in position[i]],
        "MF": [i for i in players if "MF" in position[i]],
        "FW": [i for i in players if "FW" in position[i]]
    }
    
    formations = {
    "4-3-3": [1, 4, 3, 3],   # 4 Defenders, 3 Midfielders, 3 Forwards
    "4-4-2": [1, 4, 4, 2],   # 4 Defenders, 4 Midfielders, 2 Forwards
    "3-5-2": [1, 3, 5, 2],   # 3 Defenders, 5 Midfielders, 2 Forwards
    "5-3-2": [1, 5, 3, 2],   # 5 Defenders, 3 Midfielders, 2 Forwards
    "4-5-1": [1, 4, 5, 1],   # 4 Defenders, 5 Midfielders, 1 Forward
    "3-4-3": [1, 3, 4, 3],   # 3 Defenders, 4 Midfielders, 3 Forwards
    "5-4-1": [1, 5, 4, 1],   # 5 Defenders, 4 Midfielders, 1 Forward
    }
    
    scoring_weights = {
        "onlypotential": (0, 1),
        "futurestars": (0.15, 0.85),
        "peakplayers": (0.5, 0.5),
        "veterans": (0.85, 0.15),
        "onlyoverall": (1, 0)
    }
    
    w_overall, w_potential = scoring_weights[scoring_strategy]
    chosen_formation = formations[formation]
    
    def fitness(individual):
        total_score = 0
        total_market_value = 0
        
        if len(set(individual)) < len(individual):
            return (-100000,)
        
        for i in individual:
            base_score = w_overall * overall[i] + w_potential * potential[i]
            total_score += base_score
            total_market_value += market_value[i]
            max_boost = max((compatibility_boosts.get((i, j), 0) for j in individual if i != j), default=0)
            total_score += max_boost * overall[i]
        
        if total_market_value > max_budget:
            return (-100000,)
        elif total_market_value < min_budget:
            return (total_score - 50000,)
        
        return (total_score,)
    
    if not hasattr(creator, "FitnessMax"):
        creator.create("FitnessMax", base.Fitness, weights=(1.0,))
    if not hasattr(creator, "Individual"):
        creator.create("Individual", list, fitness=creator.FitnessMax)

    
    toolbox = base.Toolbox()
    def create_valid_individual():
        gk = random.sample(position_dict["GK"], chosen_formation[0])
        df = random.sample(position_dict["DF"], chosen_formation[1])
        mf = random.sample(position_dict["MF"], chosen_formation[2])
        fw = random.sample(position_dict["FW"], chosen_formation[3])
        return creator.Individual(gk + df + mf + fw)
    
    def custom_mutate(individual):
        position_labels = []
        for i in range(chosen_formation[0]):
            position_labels.append('GK')
        for i in range(chosen_formation[1]):
            position_labels.append('DF')
        for i in range(chosen_formation[2]):
            position_labels.append('MF')
        for i in range(chosen_formation[3]):
            position_labels.append('FW')
        
        used_players = set(individual)
        num_swaps = random.randint(1, 3)
        for _ in range(num_swaps):
            index = random.randint(0, len(individual) - 1)
            pos_type = position_labels[index]
            available_replacements = list(set(position_dict[pos_type]) - used_players)
            if available_replacements:
                new_player = random.choice(available_replacements)
                old_player = individual[index]
                if old_player in used_players:
                    used_players.remove(old_player)
                used_players.add(new_player)
                individual[index] = new_player
        
        return individual,
    
    toolbox.register("individual", create_valid_individual)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)
    toolbox.register("mate", tools.cxTwoPoint)
    toolbox.register("mutate", custom_mutate)
    toolbox.register("select", tools.selTournament, tournsize=8)
    toolbox.register("evaluate", fitness)
    
    population = toolbox.population(n=popul)
    best_overall_ind = None
    best_overall_fitness = float('-inf')
    
    for gen in range(nogens):
        offspring = algorithms.varAnd(population, toolbox, cxpb=0.7, mutpb=0.2)
        for ind in offspring:
            ind.fitness.values = toolbox.evaluate(ind)
        
        current_best = tools.selBest(offspring, k=1)[0]
        current_best_fitness = fitness(current_best)[0]
        
        if current_best_fitness > best_overall_fitness:
            best_overall_ind = creator.Individual(current_best)
            best_overall_fitness = current_best_fitness
        
        elites = tools.selBest(population, k=5)
        population[:] = tools.selBest(offspring, k=len(population) - 5) + elites
    
    best_squad = best_overall_ind
    selected_players = df.iloc[best_squad]
    player_ids = selected_players["id"].tolist()
    
    total_market_value = selected_players["Market_Value"].sum()
    avg_overall = selected_players["overall_ratings"].mean()
    avg_potential = selected_players["potential_ratings"].mean()
    
    return {
        "selected_player_ids": player_ids,
        "total_market_value": total_market_value,
        "average_overall": avg_overall,
        "average_potential": avg_potential
    }

app = Flask(__name__)
CORS(app)

@app.route("/select_squad", methods=["POST"])
def select_squad():
    data = request.json
    min_budget = data.get("min_budget", 0)
    max_budget = data.get("max_budget", 1000000000)
    formation = data.get("formation", "4-3-3")
    scoring_strategy = data.get("scoring_strategy", "onlyoverall")
    clubboost = data.get("clubboost", False)
    nationboost = data.get("nationboost", False)
    currently = data.get("currently", False)
    nations = data.get("nations", [])
    clubs = data.get("clubs", [])

    squad_result = select_best_squad(
        min_budget, max_budget, formation, scoring_strategy, clubboost, nationboost, currently, nations, clubs
    )
    

    def convert_to_python_types(obj):
        if isinstance(obj, np.integer):  # Convert np.int64 to Python int
            return int(obj)
        elif isinstance(obj, np.floating):  # Convert np.float64 to Python float
            return float(obj)
        elif isinstance(obj, list):  # Convert lists recursively
            return [convert_to_python_types(i) for i in obj]
        elif isinstance(obj, dict):  # Convert dict values recursively
            return {key: convert_to_python_types(value) for key, value in obj.items()}
        return obj  # Return as-is if no conversion needed

    # Convert the response data
    squad_result = convert_to_python_types(squad_result)

    return jsonify(squad_result)



if __name__ == "__main__":
    app.run(debug=True,port=5001)