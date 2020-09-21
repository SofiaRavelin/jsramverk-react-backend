var express = require('express');
var router = express.Router();

const db = require("../db/db.js");

const jwt = require('jsonwebtoken');
const auth = require('../models/reports.js');
const auth = require('../models/auth.js');

router.get("/", req, res => {
    reports.getAll(req, res);
});

router.get("/week/:id", req, res => {
    reports.get(res, req.params);
});

router.post("/", auth.checkToken, (req, res) => {
    reports.add(res, req.body);
});

router.put("/", auth.checkToken, (req, res) => {
    reports.edit(res, req.body);
});

module.exports = router;
