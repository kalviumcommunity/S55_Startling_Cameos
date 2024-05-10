const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 

const mongoose = require('mongoose');

let connectionStatus = 'Disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URI);
        connectionStatus = 'Connected';
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err); 
        connectionStatus = 'Failed';
    }
};

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/', async (req, res) => {
    
    try {
        await mongoose.connect(con) 
        res.send(connectionStatus);
    } catch (err) {
        console.error("Failed to get database connection status:", err);
    }
});

app.listen(4000, () => {
    startDatabase();
    console.log('Listening on port 4000');
});

module.exports = app;
