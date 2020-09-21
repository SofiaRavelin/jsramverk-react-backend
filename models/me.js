const db = require("../db/db.js");

const me = {
    getInfo: function(req, res) {
        let sql = 'SELECT content FROM presentation WHERE id = 1';

        db.get(sql, function(err, row) {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        source: "GET /me",
                        title: "Database error 500",
                        detail: err.message
                    }
                });
            }
            return res.status(200).json({
                data: row
            });
        });
    },
}

module.exports = me;
