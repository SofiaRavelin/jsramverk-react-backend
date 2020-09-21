var express = require('express');
var router = express.Router();

const db = require("../db/db.js");
//const secrets = require("../config/secrets.js");
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.JWT_SECRET;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

const saltRounds = 10;

//const config = require('../config/config.json');

const auth = {

    register: function(req, res) {
            const email = req.body.email;
            const password = req.body.password;

            if (!email || !password) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: '/register',
                        detail: 'email or password missing in request.'
                    }
                });
            };

            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: '/register',
                            detail: 'bcrypt error.'
                        }
                    });

                };

                db.run("INSERT INTO users (email, password) VALUES (?, ?)",
                    email,
                    hash, (err) => {
                        if (err) {
                            return res.status(500).json({
                                errors: {
                                    status: 500,
                                    source: '/register',
                                    detail: err.message
                                }
                            });
                        };

                        return res.status(201).json({
                            data: {
                                msg: 'User is now registred!'
                            }
                        });
                    }
                );
            });
        },

    login: function(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        console.log(email, password);

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/login',
                    detail: 'email or password missing in request.'
                }
            });
        };

        db.get("SELECT * FROM users WHERE email = (?)",
            email,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: '/login',
                            detaile: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: '/login',
                            detail: 'user not found'
                        }
                    });
                }
                //const users = row;
                //hash = row.password;
                console.log(rows);
                console.log(secret);
                //console.log(secrets.jwtSecret);
                bcrypt.compare(password, rows.password, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: '/login',
                                detail: 'bcrypt error.'
                            }
                        });
                    }

                    if (result) {
                        //const secret = process.env.JWT_SECRET;
                        console.log(secret);
                        //let payload = { email: rows.email };
                        const token = jwt.sign({ email: rows.email }, secret, { expiresIn: '1h'});
                        console.log(token);
                        res.cookie('token', token, {maxAge: 9000000, httpOnly: true});

                        return res.json({
                            data: {
                                type: 'sucess',
                                message: 'user logged in',
                                user: rows.email,
                                token: token
                            }
                        });
                    }

                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: '/login',
                            detail: 'password is incorrect.'
                        }
                    })
                })
            }
        );
    },



    checkToken: function (req, res, next) {
    const token = req.headers['x-access-token'];
    //const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send("Invalid token")
        } else {
        req.email = decoded.email;
        next();
        }
    })
  }
}

module.exports = auth;
