const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    artist: {
        type: String, 
        required: [true, " A artist must be provided"]},
    title: {
        type: String, 
    },
  
    year: {
        type: Number, 
        min: 1900,
        max: 2023,
        required: [true, " A year must be provided"]},
    genre: String,
    tracks: {
        type: Number,
        min: 0, 
        required: [true, " A tracks must be provided"]}
});

module.exports = mongoose.model("Album", albumSchema);
