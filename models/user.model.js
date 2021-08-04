const mongoose = require("mongoose");
var Schema = mongoose.schema;

var UserSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        lowercase: true
},  
    password: String
});


var User = mongoose.model('User', UserSchema);
module.exports = { User };