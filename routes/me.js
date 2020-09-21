var express = require('express');
var router = express.Router();

const me = require('../models/me.js');

router.get('/', function(req, res) {
    res.json(info)
});

const info = `<p> Denna sida är en del utav kursen JSRamverk.</p>`

module.exports = router;
