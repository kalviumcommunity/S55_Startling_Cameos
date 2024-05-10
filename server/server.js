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

const router = require('./routes');
const {startDatabase , getConnectionStatus} = require('./db'); 
const port = 5175;
const cors = require('cors')

app.use(express.json());
app.use(cors());

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
})

app.get('/db', async (req, res) => {
    try {
        let smthg = getConnectionStatus();
        res.send(smthg);
    } catch (err) {
        console.error("Failed to get database connection status:", err);
        res.status(500).send('Internal Server Error');
    }
});

 

app.listen(port, () => {
    startDatabase();
    console.log(`Listening on port ${port}`);

});

module.exports = app;
