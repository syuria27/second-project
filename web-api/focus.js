var mysql = require("mysql");
const isset = require('isset');
const moment = require('moment');

function FOCUS_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

FOCUS_ROUTER.prototype.handleRoutes = function (router, pool) {

 router.get("/focuses", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT * FROM focus`;
        query = mysql.format(query);
        pool.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    res.status(500);
                    data.error_msg = "Error executing MySQL query";
                    res.json(data);
                } else {
                    if (rows.length != 0) {
                        res.status(200);
                        data.error = false;
                        data.error_msg = 'Success..';
                        data.focuses = rows;
                        res.json(data);
                    } else {
                        res.status(404);
                        data.error_msg = 'No focus Found..';
                        res.json(data);
                    }
                }
            });
        });
    });

    router.get("/focus/user/:kode_spg", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT f.kode_focus, nama_focus, 
                    coalesce(date_format(tanggal, '%d-%m-%Y'), '') as tanggal,
                    (case when (tanggal is not null) then 'SUDAH MASUK' else 'BELUM MASUK' end) as status
                    FROM focus f left join focus_report fr 
                    on f.kode_focus = fr.kode_focus AND kode_spg = ?`;
        var table = [req.params.kode_spg];
        query = mysql.format(query,table);
        pool.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    res.status(500);
                    data.error_msg = "Error executing MySQL query";
                    res.json(data);
                } else {
                    if (rows.length != 0) {
                        res.status(200);
                        data.error = false;
                        data.error_msg = 'Success..';
                        data.focuses = rows;
                        res.json(data);
                    } else {
                        res.status(404);
                        data.error_msg = 'No focus Found..';
                        res.json(data);
                    }
                }
            });
        });
    });

    router.get("/focus/depot/:depot", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (req.params.depot === "ADMIN") {
            var query = `SELECT * FROM Focus_Report`;
            var table = [req.params.depot];
        } else {
            var query = `SELECT * FROM Focus_Report WHERE depot = ?`;
            var table = [req.params.depot];
        }
        query = mysql.format(query,table);
        pool.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500);
                    data.error_msg = "Error executing MySQL query";
                    res.json(data);
                } else {
                    if (rows.length != 0) {
                        res.status(200);
                        data.error = false;
                        data.error_msg = 'Success..';
                        data.focuses = rows;
                        res.json(data);
                    } else {
                        res.status(404);
                        data.error_msg = 'No focus Found..';
                        res.json(data);
                    }
                }
            });
        });
    });
}

module.exports = FOCUS_ROUTER;
