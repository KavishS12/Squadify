const fs = require('fs');
const mongoose = require('mongoose');
const Player = require('../models/Player');
require('dotenv').config({path: '../.env' });

dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
    .then((result) => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

const batchSize = 500;

async function insertData() {
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        await Player.insertMany(batch);
        console.log(`Inserted batch ${i / batchSize + 1}`);
    }
    console.log('All data inserted');
    mongoose.connection.close();
}

insertData();
