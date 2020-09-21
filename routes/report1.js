var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //res.send('GET handler for /reports/weeks/1');
    const data = {
        data: {
            msg: "GET handler for /reports/weeks/1"
        }
    };

    res.json(data);
});

module.exports = router;
