# Squadify - A Football Squad Optimization App

## Introduction
Squadify is a data-driven football squad optimization tool designed to assist clubs, analysts, fantasy football players, and enthusiasts in creating the most effective squad within a given budget. The project leverages machine learning and optimization techniques to build an optimal starting XI while ensuring tactical balance, potential growth, and financial feasibility.

## Problem Statement
Building an optimal starting XI for a European football club within a €150M budget, focusing on young talent and tactical balance for the next 5 years.

### Key Considerations:
- **Current Ability & Future Growth** – Identify high-potential young players.
- **Market Value & Transfer Feasibility** – Stay within budget constraints.
- **Tactical Compatibility** – Ensure players fit the team’s playing style.
- **Performance Data** – Analyze recent statistics for consistency & impact.

## Challenges in Traditional Squad Building
1. **Intuition and Biases** - Subjective decision-making based on coach intuition.
2. **Player Form and Chemistry** - Balancing player form, fitness, and chemistry is difficult.
3. **Misses Out on Potential Stars** - Traditional methods may not consider all possible squad combinations.
4. **Overemphasis on Market Value** - Expensive players are often preferred without deeper analysis.

## Proposed Solution
### 1. **Statistics-Based Approach**
- Processes **6,000+ player profiles** spanning 5 seasons.
- Integrates technical metrics such as **goals, assists, tackles, and passing** from Europe's top 5 leagues.

### 2. **Advanced Machine Learning Pipeline**
- Uses **ensemble modeling** to predict player performance trajectories.
- Identifies **hidden statistical correlations** between player attributes and performance metrics.

### 3. **Genetic Algorithm Optimization**
- Generates and evolves thousands of squad combinations.
- Balances immediate performance with long-term development goals.
- Ensures formation balance and penalizes squads exceeding budget constraints.

## Target Users
- **Football Coaches & Managers** - Data-driven squad selection insights.
- **Fantasy Football Enthusiasts** - Enhances fantasy football team-building experience.
- **Scouting Agencies & Analysts** - Provides a modular database for deeper player analysis.

## Market Opportunity
- **$2.5B+ sports analytics market**, expected to grow **10x at 20% CAGR by 2030**.
- Increasing **AI adoption** by football clubs for player scouting and performance analysis.
- Growing **fantasy football market** requiring AI-driven insights.

## Data Collection
Data was scraped from football statistics platforms:
- **FBRef** - Performance and match statistics.
- **Transfermarkt** - Market values and player images.
- **SoFIFA** - FIFA attributes for labeling.

### Processed Dataset:
- **6,181 players** with **24 features**.
- Includes statistics such as **shooting, defense, passing**, and general player information.
- Weighted averages were calculated for multi-season data.
- Adjustments were made for players with injury-related missing stats.

## Machine Learning Approach
- Hybrid model using **XGBoost, Linear Regression, SVMs, and Decision Trees**.
- Uses **1,000 expert-labeled samples from FIFA** as ground truth.
- Predicts custom ratings based on correlations between raw stats and FIFA ratings.

### Player Ratings (Out of 100):
- **Overall** - Holistic measure of quality.
- **Future Potential** - Career growth projection.
- **Passing Ability** - Accuracy and impact.
- **Shooting** - Goal conversion efficiency.
- **Defensive Strength** - Tackling and positioning.
- **Goalkeeping Prowess** - Shot-stopping ability.

## Optimization Algorithm - Genetic Selection
- **Randomized population selection** for potential teams.
- **Evaluation** based on skill, potential, and chemistry.
- **Crossover and mutation techniques** to improve squad quality.
- **Elitism mechanism** to retain top-rated players.

### Customization & User Control
- **Budget Constraints** - Ensures selections remain within financial limits.
- **Squad Formation Selection** - Supports multiple formations.
- **Advanced Filtering** - Allows users to select nations, clubs, and experience levels.
- **Chemistry Boosts** - Players from the same club or nation receive synergy boosts.

## Development Stack
### **Frontend:**
- **React.js + Tailwind CSS** - Modern UI for intuitive squad building.

### **Backend:**
- **Node.js & Express.js** - Handles API requests efficiently.

### **Database:**
- **MongoDB** - Stores and retrieves player data efficiently.

### **Machine Learning Integration:**
- **Flask** - Seamless communication between UI, backend, and ML models.

## Team
Developed by **Team Haxophone** as part of a Hacksplosion - Deloitte India Hackathon 2025.

---
We hope you find Squadify as exciting and useful as we do! 🚀⚽

