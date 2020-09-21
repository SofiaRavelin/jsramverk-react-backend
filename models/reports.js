const db = require("../db/db.js");

const reports = {
    getAll: function(req, res) {
        let sql = 'SELECT week FROM reports';

        db.all(sql, function(err, rows) {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        source: "GET /reports",
                        title: "Database error 500",
                        detail: err.message
                    }
                });
            }
            return res.json(rows);
        });
    },

    add: function(req, res) {
        let report = [req.body.week, req.body.content];
        let sql = 'INSERT INTO reports (week, content) VALUES (?, ?)';

        db.run(sql, report, function(err) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "POST reports/create",
                        detail: err.message
                    }
                })
            }
            return res.status(201).send()
        })
    },

    update: function(req, res) {
        const week = req.body.week;
        const content = req.body.content;
        console.log(week, content);
        let sql = 'UPDATE reports SET content = ? WHERE week = ?';

        db.run(sql, content, week, function(err) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "POST reports/create",
                        detail: err.message
                    }
                })
            }
            return res.status(200).send()
        })
    },

    get: function(res, body) {
        let sql = "SELECT * FROM reports WHERE week IS (?)";

        db.get(sql, body.week, function (err, rows) {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        source: "GET /eports",
                        title: "Database error 500",
                        detail: err.message
                    }
                });
            }
            return res.json({
                week: rows.week,
                content: rows.content
            })
        })
    }
}

module.exports = reports;
