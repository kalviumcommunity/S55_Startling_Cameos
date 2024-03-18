
const express = require('express');
const { getConnectionStatus } = require('./db'); 
const {DataModel} = require('./schema')
const router = express.Router();
router.use(express.json());


router.get('/', async (req, res, next) => {
    try {
        const finalStatus = await getConnectionStatus();
        res.send(finalStatus);
    } catch (error) {
        next(error); 
    }
});

router.get("/ping", (req, res) => {
    res.send('pong');
});

router.post("/post", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

router.put('/put', async (req, res, next) => {
    try {
        let finalStatus = await getConnectionStatus();
        finalStatus = "hey DB";
        res.send(finalStatus);
    } catch (error) {
        next(error);  
    }
});

router.delete('/delete', async (req, res) => {
    res.send('Data deleted successfully');
});

router.get('/cameo', async (req, res) => {
    try {
        console.log("hello")
        const data = await DataModel.find({});
        console.log(data)
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

