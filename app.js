require("express-async-errors");
const express = require("express");
const config = require("./utils/config");
const app = express();
const mongoose = require("mongoose");



const albums = require("./routes/albums");


app.use(express.static("./public"));

app.use(express.json());

app.use("/api/albums", albums);


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });


module.exports = app;