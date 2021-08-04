const auth = require('../config/auth.config');
const model = require("../models/init.models");
const usr = model.usr;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    const body = req.body.email;
    if (body.includes('@')) { //checks if email is valid
        if (!body) {
            res.status(404).json({ message: "Kindly fill in details username, email and password" });
        }
        else {
            const nUser = new usr({
                "username": req.body.username, //will use for userId
                "email": req.body.email,
                "password": bcrypt.hashSync(req.body.password, 3),
            });
            nUser.save((err) => {
                if (err) {
                    res.status(500).json({ err: err });
                    return;
                } else {
                    res.status(201).json({ message: "User registered Successfully!" });
                }
            });
        }
    } else { res.status(400).json({ message: "Not an email" });
        
    }

};

exports.signIn = (req, res) => {
    let email = req.body.email;
    if (email.includes('@')) { //checks if email is valid   
        usr.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500), json({ message: err });
                return;
            }
            if (!user) {
                res.status(404).json({ message: "User Not Found. Register" })
            }

            var passwordValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordValid) {
                res.status(401).json({
                    message: 'Invalid Passowrd'
                });
            } else {
        
                res.status(200).json({
                    message: "Logged In",
                    name: user.username,
                    email: user.email,
                });
            }
        });
    } else {
        res.status(400).json({ message: "Not an email" });
    }
};