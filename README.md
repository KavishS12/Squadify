# Squadify - A Football Squad Optimization App

## Table of Contents
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Data Collection](#data-collection)
- [Machine Learning Approach](#machine-learning-approach)
- [Optimization Algorithm - Genetic Selection](#optimization-algorithm---genetic-selection)
- [Development Stack](#development-stack)
- [Project Setup Instructions](#project-setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
    - [1. Frontend](#1-frontend)
    - [2. Backend](#2-backend)
    - [3. Squad Optimization](#3-squad-optimization)
  - [Switching Between Local and Deployed Backend](#switching-between-local-and-deployed-backend)

---

## Introduction
Squadify is a data-driven football squad optimization tool designed to assist clubs, analysts, fantasy football players, and enthusiasts in creating the most effective squad within a given budget. The project leverages machine learning and optimization techniques to build an optimal starting XI while ensuring tactical balance, potential growth, and financial feasibility.

---

## Problem Statement
Building an optimal starting XI for a European football club within a €150M budget, focusing on young talent and tactical balance for the next 5 years.

#### Key Considerations:
- **Current Ability & Future Growth** – Identify high-potential young players.
- **Market Value & Transfer Feasibility** – Stay within budget constraints.
- **Tactical Compatibility** – Ensure players fit the team’s playing style.
- **Performance Data** – Analyze recent statistics for consistency & impact.

#### Challenges in Traditional Squad Building
1. **Intuition and Biases** - Subjective decision-making based on coach intuition.
2. **Player Form and Chemistry** - Balancing player form, fitness, and chemistry is difficult.
3. **Misses Out on Potential Stars** - Traditional methods may not consider all possible squad combinations.
4. **Overemphasis on Market Value** - Expensive players are often preferred without deeper analysis.

---

## Proposed Solution
#### 1. **Statistics-Based Approach**
- Processes *6,000+ player profiles* spanning 5 seasons.
- Integrates technical metrics such as goals, assists, tackles, and passing from Europe's top 5 leagues.

#### 2. **Advanced Machine Learning Pipeline**
- Uses *ensemble modeling* to predict player performance trajectories.
- Identifies *hidden statistical correlations* between player attributes and performance metrics.

#### 3. **Genetic Algorithm Optimization**
- Generates and evolves thousands of squad combinations.
- Balances immediate performance with long-term development goals.
- Ensures formation balance and penalizes squads exceeding budget constraints.

### Target Users
- **Football Coaches & Managers** - Data-driven squad selection insights.
- **Fantasy Football Enthusiasts** - Enhances fantasy football team-building experience.
- **Scouting Agencies & Analysts** - Provides a modular database for deeper player analysis.

### Market Opportunity
- **$2.5B+ sports analytics market**, expected to grow **10x at 20% CAGR by 2030**.
- Increasing **AI adoption** by football clubs for player scouting and performance analysis.
- Growing **fantasy football market** requiring AI-driven insights.

---

## Data Collection
Data was scraped from football statistics platforms:
- **FBRef** - Performance and match statistics.
- **Transfermarkt** - Market values and player images.
- **SoFIFA** - FIFA attributes for labeling.

### Processed Dataset:
- *6,181 players* with *24 features*.
- Includes statistics such as *shooting, defense, passing*, and general player information.
- Weighted averages were calculated for multi-season data.
- Adjustments were made for players with injury-related missing stats.

---

## Machine Learning Approach
- Hybrid model using *XGBoost, Linear Regression, SVMs, and Decision Trees*.
- Uses *1,000 expert-labeled samples from FIFA* as ground truth.
- Predicts custom ratings based on correlations between raw stats and FIFA ratings.

### Player Ratings (Out of 100):
- **Overall** - Holistic measure of quality.
- **Future Potential** - Career growth projection.
- **Passing Ability** - Accuracy and impact.
- **Shooting** - Goal conversion efficiency.
- **Defensive Strength** - Tackling and positioning.
- **Goalkeeping Prowess** - Shot-stopping ability.

---

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

---

## Development Stack

| **Component**          | **Technology Used**            | **Purpose** |
|------------------------|--------------------------------|------------|
| **Frontend**          | React.js + Tailwind CSS       | Modern UI for intuitive squad building |
| **Backend**           | Node.js & Express.js         | Handles API requests efficiently |
| **Database**         | MongoDB                      | Stores and retrieves player data efficiently |
| **Machine Learning** | Flask                         | Seamless communication between UI, backend, and ML models |

---

# Project Setup Instructions

This repository contains three main components:

- **Frontend** (MERN Stack - React)
- **Backend** (MERN Stack - Express & MongoDB)
- **Squad Optimization** (Python Flask API for squad selection)

## Prerequisites

Make sure you have the following installed:

- **Node.js** (for frontend and backend)
- **MongoDB Atlas** (for database)
- **Python 3** (for squad optimization)
- **pip** (for installing Python dependencies)

## Setup Instructions

### 1. Frontend

The frontend is built using React. To set it up:

```sh
cd frontend
npm install
npm run dev
```

By default, the frontend connects to the deployed backend. If you want to run everything locally, update the backend API URLs in the frontend code to:

```
http://localhost:5000/  (Backend API)
http://localhost:5001/  (Squad Optimization API)
```

**Running the project locally is preferred for faster response time and lower latency, as the deployed version is hosted on a free instance on Render, which may have slower response times.**

### 2. Backend

The backend is built using Node.js and Express. To run it:

```sh
cd backend
npm install
```

You need to set up your MongoDB connection. Create a `.env` file in the backend directory and add:

```
MONGO_URI=your_mongodb_connection_string
```
#### Seeding the Database (Insert Sample Data)

The backend contains a script to populate the database with sample player data. To insert players into the database:

```sh
cd backend/scripts
node insertPlayers.js
```

This script reads `data.json` and inserts player records in batches of 500.

Ensure MongoDB is running before executing this script.
Once the script runs successfully, you’ll see logs confirming batch insertions.

Then, start the backend server:

```sh
npm start
```

### 3. Squad Optimization

The squad optimization module is implemented using Python and Flask. Install the required dependencies:

```sh
cd squad_optimization
pip install -r requirements.txt
```

Run the Flask server:

```sh
python squad_optimization.py
```

## Switching Between Local and Deployed Backend

If you want to switch between a local and deployed backend, update the API URLs in the frontend's configuration accordingly:

- **Local Backend:** `http://localhost:5000/`
- **Deployed Backend:** `https://squadify-backend.onrender.com/`
- **Local Squad Optimization API:** `http://localhost:5001/`
- **Deployed Squad Optimization API:** `https://squadify.onrender.com/`

**Note: Running the backend locally is preferred for faster response times and lower latency.**

---

## Team
Developed by **Team Haxophone** as part of Hacksplosion - Deloitte India Hackathon 2025.

---

We hope you find Squadify as exciting and useful as we do! 🚀⚽

