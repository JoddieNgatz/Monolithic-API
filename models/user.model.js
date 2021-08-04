var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
    username: { type: String, unique: true, required: true }, //will use for userId
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: { type: String, required: true },
});

module.exports = mongoose.model('users', userschema);