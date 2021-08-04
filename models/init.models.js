const dbConfig = require("../config/db.config");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model");
db.url = dbConfig.url;

module.exports = db;