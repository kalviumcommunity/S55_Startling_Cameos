const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    ranking: { type: Number }, 
    actor_name: { type: String, required: true },
    movie_name: { type: String, required: true },
    character_name: { type: String, required: true },
    duration: { type: String, required: true },
    img: {type: String, required: true},
    created_by: {type: String, required: true}
});

const DataModel = mongoose.model("Startling_cameo", dataSchema);

module.exports = {DataModel};
