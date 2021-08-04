const auth = require('../config/auth.config');
const db = require("../models/init.models");
const User = db.User;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    console.log(req.body.username);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });

    user.save((err) => {
        if (err) {
            res.status(500).json().send({ message: err });
            return;
        } else {
            res.status(200).json().send({ message: "User registered Successfully!" });
        }
    });

};

exports.signIn = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500), json().send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).json().send({ message: "User Not Found. Register" })
        }

        var passwordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordValid) {
            return res.status(401).json().send({
                accessToken: null,
                message: 'Invalid Passowrd'
            });
        }
        
        res.status(200).json().send({
            name: user.name,
            email: user.email,
            accessToken: token
        });
    });


};