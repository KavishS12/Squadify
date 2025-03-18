const express = require('express');
const Player = require('../models/Player');
const router = express.Router();

//sample route for testing
// router.get('/',(req,res) => {
//     res.send('Welcome to player dashboard');
// });

// POST : Add a single player
router.post("/add-single-player", async (req, res) => {
    try {
        const {
            id,name, nation, pos, born, club, league, Last_played, Tackles_defense,
            Challenges_defense, Blocks_defense, Total_passing, Short_passing, 
            Medium_passing, Long_passing, Expected_passing, Standard_shooting, 
            Expected_shooting, Playing_Time_stats, Performance_stats, Expected_stats,
            Progression_stats, Per_90_Minutes_stats, age, defense_ratings, passing_ratings, 
            shooting_ratings, keeping_ratings, potential_ratings, overall_ratings, 
            Market_Value, Image_URL
        } = req.body;

        if (!id || !name || !pos || !born || !age || !potential_ratings || !overall_ratings) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create new player
        const newPlayer = new Player({
            id,name, nation, pos, born, club, league, Last_played, Tackles_defense,
            Challenges_defense, Blocks_defense, Total_passing, Short_passing, 
            Medium_passing, Long_passing, Expected_passing, Standard_shooting, 
            Expected_shooting, Playing_Time_stats, Performance_stats, Expected_stats,
            Progression_stats, Per_90_Minutes_stats, age, defense_ratings, passing_ratings, 
            shooting_ratings, keeping_ratings, potential_ratings, overall_ratings, 
            Market_Value, Image_URL
        });

        await newPlayer.save(); // Save to MongoDB
        res.status(201).json({ message: "Player added successfully", player: newPlayer });
    } catch (error) {
        console.error("Error adding player:", error);
        // Catch duplicate key error (MongoDB code 11000)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
            return res.status(400).json({ error: "Player with this name already exists" });
        }
        res.status(500).json({ error: "Server error" });
    }
});

// POST : Add multiple players
router.post("/add-players", async (req, res) => {
    try {
        const players = req.body; // Expecting an array of players

        if (!Array.isArray(players) || players.length === 0) {
            return res.status(400).json({ error: "Invalid or empty players array" });
        }

        // Validate required fields for each player
        for (let player of players) {
            if (!player.id || !player.name || !player.pos || !player.born || !player.age || 
                !player.potential_ratings || !player.overall_ratings) {
                return res.status(400).json({ error: "Missing required fields in one or more players" });
            }
        }

        // Insert multiple players into MongoDB
        const insertedPlayers = await Player.insertMany(players, { ordered: false });
        res.status(201).json({ message: `${insertedPlayers.length} players added successfully`, players: insertedPlayers });
    } catch (error) {
        console.error("Error adding players:", error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
            return res.status(400).json({ error: "One or more players have duplicate names" });
        }

        res.status(500).json({ error: "Server error" });
    }
});

// DELETE : Delete all players
router.delete("/delete-all", async (req, res) => {
    try {
        const result = await Player.deleteMany({});
        res.json({ message: `${result.deletedCount} players deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET : Retrieve all players
router.get('/',async(req,res) => {
    try{
        const players = await Player.find();
        const total = await Player.countDocuments();
        res.status(200).json({total, players});
    } 
    catch(err) {
        res.status(500).json({message : "Error retrieving posts", error : error.message});
    }
})

// GET: Retrieve all players with pagination
router.get('/pagination',async(req,res) => {
    try {
        const {page = 1,limit = 50, search = "",nation, position, minAge, maxAge, minOverall, minPotential} = req.query;
        const skip = (page - 1) * limit; // Calculate the number of players to skip
        let query = {};

        if (search) query.name = { $regex: search, $options: "i" }; // Case-insensitive search
        if (nation) query.nation = nation;
        if (position) {
            // This will match if position field contains the selected position either as a standalone value or as part of a combination
            query.pos = { $regex: position, $options: "i" };
        }
        if (minAge && maxAge) query.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge) };
        if (minOverall) query.overall_ratings = { $gte: parseInt(minOverall) };
        if (minPotential) query.potential_ratings = { $gte: parseInt(minPotential) };

        const players = await Player.find(query).skip(skip).limit(parseInt(limit));

        const total = await Player.countDocuments(query);
        res.status(200).json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            players
        });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});

router.get('/nations', async (req, res) => {
    try {
      const nations = await Player.distinct('nation');
      res.json(nations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
router.get('/positions', async (req, res) => {
    try {
      const positions = await Player.distinct('pos');
      res.json(positions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;