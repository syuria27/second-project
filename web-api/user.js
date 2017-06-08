var mysql = require("mysql");
const isset = require('isset');
const pad = require('pad-left');
const md5 = require("md5");

function USER_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

USER_ROUTER.prototype.handleRoutes = function (router, pool) {

    router.post("/user/create", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.nama_spg) && isset(req.body.nama_toko)
            && isset(req.body.depot) && isset(req.body.zona) && isset(req.body.hak_akses)) {

            var query = `INSERT INTO user (nama_spg, nama_toko, depot, zona) 
                        VALUES (UPPER(?), UPPER(?), UPPER(TRIM(?)), ?)`;
            var table = [req.body.nama_spg, req.body.nama_toko, req.body.depot, req.body.zona];
            query = mysql.format(query, table);
            pool.getConnection(function (err, connection) {
                if (err) console.log(err);
                connection.query(query, function (err, results) {
                    connection.release();
                    if (err) {
                        res.status(500);
                        data.error_msg = "Error executing MySQL query";
                        res.json(data);
                    } else {
                        var kode_spg = 'SPG-' + (pad(results.insertId, 4, '0'));
                        var query = `UPDATE user SET kode_spg = ? WHERE id = ?`;
                        var table = [kode_spg, results.insertId];
                        query = mysql.format(query, table);
                        pool.getConnection(function (err, connection) {
                            connection.query(query, function (err) {
                                connection.release();
                                if (err) {
                                    res.status(500);
                                    data.error_msg = "Error executing MySQL query";
                                    res.json(data);
                                } else {
                                    var query = `INSERT INTO login (kode_spg, password, hak_akses) VALUES (?, ?, ?)`;
                                    var table = [kode_spg, md5(req.body.nama_spg.toUpperCase()), req.body.hak_akses];
                                    query = mysql.format(query, table);
                                    pool.getConnection(function (err, connection) {
                                        connection.query(query, function (err, rows) {
                                            connection.release();
                                            if (err) {
                                                res.status(500);
                                                data.error_msg = "Error executing MySQL query";
                                                res.json(data);
                                            } else {
                                                res.status(200);
                                                data.error = false;
                                                data.error_msg = 'User succesfuly created.. Username '+kode_spg;
                                                res.json(data);
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
            });

        } else {
            res.status(400);
            data.error_msg = "Missing some params..";
            res.json(data);
        }
    });

    router.put("/user/update", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.nama_spg) && isset(req.body.nama_toko)
            && isset(req.body.depot) && isset(req.body.zona)) {
            var query = `UPDATE user SET nama_spg = UPPER(?), nama_toko = UPPER(?),
                        depot = UPPER(TRIM(?)), zona = ? WHERE kode_spg = ?`;
            var table = [req.body.nama_spg, req.body.nama_toko, req.body.depot, 
                        req.body.zona, req.body.kode_spg];
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
                        data.error_msg = 'User succesfuly updated..';
                        res.json(data);
                    }
                });
            });
        } else {
            res.status(400);
            data.error_msg = "Missing some params..";
            res.json(data);
        }
    });

    router.put("/user/password", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.password)) {
            var query = `UPDATE login SET password = ? WHERE kode_spg = ?`;
            var table = [md5(req.body.password), req.body.kode_spg];
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
                        data.error_msg = 'Password succesfuly updated..';
                        res.json(data);
                    }
                });
            });
        } else {
            res.status(400);
            data.error_msg = "Missing some params..";
            res.json(data);
        }
    });

    router.put("/user/status", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.status)) {
            var query = `UPDATE user SET status = ? WHERE kode_spg = ?`;
            var table = [req.body.status, req.body.kode_spg];
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
                        data.error_msg = 'Status succesfuly updated..';
                        res.json(data);
                    }
                });
            });
        } else {
            res.status(400);
            data.error_msg = "Missing some params..";
            res.json(data);
        }
    });

    router.get("/users", function (req, res) {
        var data = {
            error: true,
            error_msg: "",
            users: []
        };

        var query = `SELECT u.kode_spg, nama_spg, nama_toko, depot, zona, status, hak_akses
                     FROM user u LEFT JOIN login l ON u.kode_spg = l.kode_spg WHERE hak_akses < 3`;
        query = mysql.format(query);
        pool.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    res.status(500);
                    data.error_msg = "Error executing MySQL query";
                    res.json(data);
                } else {
                    if (rows.length > 0) {
                        data.error = false;
                        data.error_msg = 'Success..';
                        data.users = rows;
                        res.status(200);
                        res.json(data);
                    } else {
                        data["error_msg"] = 'No users Found..';
                        res.status(404);
                        res.json(data);
                    }
                }
            });
        });

    });

    router.get("/user/:kode_spg", function (req, res) {
        var data = {
            error: true,
            error_msg: "",
            user: []
        };

        var query = `SELECT u.kode_spg, nama_spg, nama_toko, depot, zona, status, hak_akses
                     FROM user u LEFT JOIN login l ON u.kode_spg = l.kode_spg
                     WHERE u.kode_spg = ?`;
        var table = [req.params.kode_spg];
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
                        data.error = false;
                        data.error_msg = 'Success..';
                        data.user = rows[0];
                        res.status(200);
                        res.json(data);
                    } else {
                        data["error_msg"] = 'No users Found..';
                        res.status(404);
                        res.json(data);
                    }
                }
            });
        });

    });

}

module.exports = USER_ROUTER;
