const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 
const router = require('./routes');
const {startDatabase , getConnectionStatus} = require('./db'); 
const port = 5175;
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/db', async (req, res) => {
    try {
        let smthg = getConnectionStatus();
        res.send(smthg);
    } catch (err) {
        console.error("Failed to get database connection status:", err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/',(req, res) => {
    res.send("Home");
});

app.use(router);

app.use((err, req, res, next) => {
    console.error('An unhandled error occurred:', err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    startDatabase();
    console.log(`Listening on port ${port}`);
});

module.exports = app;
