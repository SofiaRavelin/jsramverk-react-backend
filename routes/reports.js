//Express things
var express = require('express');
var router = express.Router();

const db = require("../db/db.js");

const jwt = require('jsonwebtoken');
const reports = require('../models/reports.js');
const auth = require('../models/auth.js');


// Beautiful sqlite database



router.get('/', function(req, res) {
    reports.getAll(req,res);
});

//router.get("/week/:week", (req, res) => {
//    reports.getThis(req, res);
//});

router.get("/week/:week", function(req, res, next) {
    db.get("SELECT * FROM reports WHERE week = " + req.params.week,
    function(err, row) {
        const data = {
            data: row
        }
        res.json(data);
    });
})

router.post("/update/:week", function(req, res, next) {
    //console.log(req.body.week, req.body.content);
    auth.checkToken(req, res, next);
    reports.update(req, res);
});

//router.post("/update/:week",
//    (req, res, next) => auth.checkToken(req, res, next),
//    (req, res) => reports.update(req, res)
//);

router.post("/",
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => reports.add(req, res)
);




module.exports = router;
