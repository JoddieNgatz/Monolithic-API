const mongoose = require("mongoose");

const user = mongoose.model(
    "User", new mongoose.Schema({
        email: String,
        password: String,
        name: String,
        //permission: Number
    })

);

module.exports = user;