var express = require('express');
var router = express.Router();

const db = require("../db/db.js");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const auth = require('../models/auth.js');


router.post("/", (req, res) => {
    //console.log("Register route reached for enpoint '/' using POST method. email: ", req.body.email, " and password: ", req.body.password);
    auth.register(req, res)
});

router.get("/", (req, res) => {
  //console.log("Register route reached for enpoint '/' using GET method.");
    auth.register(req, res);
});

//router.post("/", (req, res) => {
//    const email = req.body.email;
////
//    if (!email || !password) {
//        return res.status(401).json({
//            errors: {
//                status: 401,
////                detail: 'email or password missing in request.'
//            }
//        });
//    }

//    bcrypt.hash(password, saltRounds, function(err, hash) {
//        if (err) {
//            return res.status(500).json({
/////                source: '/register',
//                detail: 'bcrypt error.'
//                }
//            });

//        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
//            email,
//            hash, (err) => {
//                if (err) {
//                    return res.status(500).json({
//                        errors: {
//                            status: 500,
//                            source: '/register',
//                            detail: err.message
//                        }
//                    });
//                }

//                return res.status(201).json({
//                    data: {
//                        msg: 'User is now registred!'
//                    }
////            });
//        }
//    });
//});


module.exports = router;
