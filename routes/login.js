var express = require('express');
var router = express.Router();

const auth = require('../models/auth');

//router.get('/', function(req, res, next) {
//    //res.send('GET handler for /reports/weeks/1');
//    const data = {
////            msg: "GET handler for /login"
//    }
//    };

//    res.json(data);
//});

router.post('/', (req, res) => {
    //console.log("Login route reached for enpoint '/' using POST method. email: ", req.body.email, " and password: ", req.body.password);
    auth.login(req, res)
});

module.exports = router;
