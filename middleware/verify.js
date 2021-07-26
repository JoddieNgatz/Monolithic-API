const jwt = require('jsonwebtoken');
const auth = require('../config/auth.config');
const db = require('../models');
const user = db.user;
authToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }
  
    jwt.verify(token, auth.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

checkDuplicateUserOnSignUp = (req, res, next) => {
    user.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Email in use. Try another email" });
            return;
        }
        next();
    });
};

// const verif = {
//     checkDuplicateUserOnSignUp, authToken
// }
module.exports = checkDuplicateUserOnSignUp, authToken;