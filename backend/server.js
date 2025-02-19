const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  }));

//Test route
app.get('/',(req,res) => {
    res.send('Hello world!')
});

// app.use('/player', playerRoutes);

//start server
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});

mongoose.connect(dbURI)
    .then((result) => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
