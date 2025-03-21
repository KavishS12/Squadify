const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoute');   

dotenv.config();
const dbURI = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://squadify-haxophone.netlify.app",
      ],
      credentials: true,
    })
  );
  

//Test route
app.get('/',(req,res) => {
    res.send('Hello world!')
});

app.use('/players', playerRoutes);

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
