
const express = require('express');
const { getConnectionStatus } = require('./db'); 
const {DataModel} = require('./schema')
const {UserModel} = require('./signupSchema')
const router = express.Router();
router.use(express.json());
const Joi = require("joi")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateSchema = Joi.object({
    "actor_name": Joi.string().required(),
    "movie_name": Joi.string().required(),
    "character_name": Joi.string().required(),
    "duration": Joi.string().required(),
    "img": Joi.string().required(),
});

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

router.post('/add', async(req,res)=>{
    try{
        const{value,error} = validateSchema.validate(req.body)

        if(error){
            res.send(error.details)
        }
        const data = await DataModel.create(value)
        res.status(200).json(data)
    
    }

        catch(err){
        console.error(err)
    }
})

router.get('/getEntity/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const entity = await DataModel.findById({_id:id});
        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        console.log(entity);
        res.json(entity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updateEntity/:id', async(req,res)=>{

    try{
        const{value,error} = validateSchema.validate(req.body)
        if(error){
            res.send(error.details)
        }
        const id = req.params.id
        const data = await DataModel.findByIdAndUpdate({_id:id},{
            actor_name: req.body.actor_name,
            movie_name: req.body.movie_name,
            character_name: req.body.character_name,
            duration: req.body.duration,
            img: req.body.img,
        })
        res.status(200).json(data)
    }catch(err){
        console.error(err)
    }
})

router.delete('/deleteEntity/:id', (req, res) => {
    const id = req.params.id;
    DataModel.findByIdAndDelete(id)
        .then(deletedEntity => {
            res.json(deletedEntity);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ user });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')

    res.status(200).json({message:'Logout succesful'})
})


router.get('/users', async (req, res) => {
    try {
        const data = await UserModel.find({});
        console.log(data)
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/signup',async(req,res)=>{
    try{
        const user = await UserModel.create({
            username:req.body.username,
            password:req.body.password
        })
        res.send(user)
    }catch(err){
        console.error(err)
    }
  
})

router.post('/auth',async(req,res)=>{
    try{
        const user = {
            username:req.body.username,
            password : req.body.password
        }
        const token = jwt.sign(user,process.env.ACCESS_TOKEN)
        res.cookie('token',token,{maxAge:365*24*60*60*1000})
        res.status(200).json(token)

    }catch(err){
        console.log(err)
    }
})


module.exports = router;

