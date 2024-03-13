
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 
const router = require('./routes');
const {startDatabase} = require('./db'); 
const port = 4000;


app.use(router);



app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/', async (req, res) => {
    try {
        await mongoose.connect(URI) 
        res.send(connectionStatus);
    } catch (err) {
        console.error("Failed to get database connection status:", err);
    }
});

app.listen(port, () => {
    startDatabase();
    console.log(`Listening on port ${port}`);
});

module.exports = app;
