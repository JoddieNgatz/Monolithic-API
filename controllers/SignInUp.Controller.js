const auth = require('../config/auth.config');
const db = require("../models");
const user = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    const User = new user({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    });
    User.save((err) => {
        if (err) {
            res.status(500).json().send({ message: err });
            return;
        }
        
        res.status(200).json().send({ message: "User registered Successfully!" });
    })

};

exports.signIn = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, User) => {
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
        var token = jwt.sign({ id: user.id }, auth.secret, {
            expiresIn: 12400 //reandom number of time
        });
        
        res.status(200).json().send({
            name: User.name,
            email: User.email,
            accessToken: token
        });
    });


};