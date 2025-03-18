const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    nation: { type: String},
    pos: { type: String, required: true },
    born: { type: Number, required: true },
    club: { type: String},
    league: { type: String},
    Last_played: { type: Number},
    Tackles_defense: { type: Number },
    Challenges_defense: { type: Number },
    Blocks_defense: { type: Number },
    Total_passing: { type: Number },
    Short_passing: { type: Number },
    Medium_passing: { type: Number },
    Long_passing: { type: Number },
    Expected_passing: { type: Number },
    Standard_shooting: { type: Number },
    Expected_shooting: { type: Number },
    Playing_Time_stats: { type: Number },
    Performance_stats: { type: Number },
    Expected_stats: { type: Number },
    Progression_stats: { type: Number },
    Per_90_Minutes_stats: { type: Number },
    age: { type: Number, required: true },
    defense_ratings: { type: Number },
    passing_ratings: { type: Number },
    shooting_ratings: { type: Number },
    keeping_ratings: { type: Number },
    potential_ratings: { type: Number,required: true  },
    overall_ratings: { type: Number, required: true  },
    Market_Value: { type: Number },
    Image_URL: { type: String }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
