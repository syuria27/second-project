var mysql = require("mysql");
const isset = require('isset');
const pad = require('pad-left');

function DAILY_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

DAILY_ROUTER.prototype.handleRoutes = function (router, pool) {

    router.post("/daily/insert", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.ccm) && isset(req.body.rm)) {
            var query = `SELECT kode_laporan FROM daily_report WHERE kode_spg = ? AND tanggal 
	        			= DATE(CONVERT_TZ(CURDATE(),@@session.time_zone,'+07:00'))`;
            var table = [req.body.kode_spg];
            query = mysql.format(query, table);
            pool.getConnection(function (err, connection) {
                connection.query(query, function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(500);
                        data.error_msg = "Error executing MySQL query";
                        res.json(data);
                    } else {
                        if (rows.length > 0) {
                            res.status(404);
                            data.error_msg = 'Report already submited..';
                            res.json(data);
                        } else {
                            var query = `INSERT INTO daily_report (kode_spg, tanggal, ccm, rm) 
									    VALUES(?, CONVERT_TZ(NOW(),@@session.time_zone,'+07:00'), ?, ?)`;
                            var table = [req.body.kode_spg, req.body.ccm, req.body.rm];
                            query = mysql.format(query, table);
                            pool.getConnection(function (err, connection) {
                                connection.query(query, function (err, results) {
                                    connection.release();
                                    if (err) {
                                        res.status(500);
                                        data.error_msg = "Error executing MySQL query";
                                        res.json(data);
                                    } else {
                                        var kode_report = 'LPD-' + (pad(results.insertId, 11, '0'));
                                        var query = `UPDATE daily_report SET kode_laporan = ? WHERE id = ?`;
                                        var table = [kode_report, results.insertId];
                                        query = mysql.format(query, table);
                                        pool.getConnection(function (err, connection) {
                                            connection.query(query, function (err) {
                                                connection.release();
                                                if (err) {
                                                    res.status(500);
                                                    data.error_msg = "Error executing MySQL query";
                                                    res.json(data);
                                                } else {
                                                    res.status(200);
                                                    data.error = false;
                                                    data.error_msg = 'Report succesfuly submited..';
                                                    res.json(data);
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    }
                });
            });
        } else {
            res.status(400);
            data.error_msg = 'Missing some params..';
            res.json(data);
        }
    });

    router.get("/daily/:kode_spg/:bulan/:tahun", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT kode_laporan,kode_spg,DATE_FORMAT(tanggal, '%d-%m-%Y') as tanggal,ccm,rm
        			FROM daily_report WHERE kode_spg = ? AND MONTH(tanggal) = ? AND YEAR(tanggal) = ?`;
        var table = [req.params.kode_spg, req.params.bulan, req.params.tahun];
        query = mysql.format(query, table);
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
                        data.history = rows;
                        res.json(data);
                    } else {
                        res.status(404);
                        data.error_msg = 'No History Found..';
                        res.json(data);
                    }
                }
            });
        });
    });

    router.put("/daily/update", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_laporan) && isset(req.body.ccm) && isset(req.body.rm)) {
            var query = `UPDATE daily_report SET ccm = ?, rm = ? WHERE kode_laporan = ?`;
            var table = [req.body.ccm, req.body.rm, req.body.kode_laporan];
            query = mysql.format(query, table);
            pool.getConnection(function (err, connection) {
                connection.query(query, function (err) {
                    connection.release();
                    if (err) {
                        res.status(500);
                        data.error_msg = "Error executing MySQL query";
                        res.json(data);
                    } else {
                        res.status(200);
                        data.error = false;
                        data.error_msg = 'Report succesfuly updated..';
                        res.json(data);
                    }
                });
            });
        } else {
            res.status(400);
            data.error_msg = 'Missing some params..';
            res.json(data);
        }
    });
}

module.exports = DAILY_ROUTER;
