var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/', function(req, res, next) {
    var options = {
        root: path.join(__dirname)
    };

    var fileName = 'reporttwo.js';

    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent: ', fileName);
            next();
        }
    });
});

router.get('/', function(req, res, next) {
    console.log('File Sent')
    res.send();
});

module.exports = router;
