var mysql = require("mysql");
const isset = require('isset');
const md5 = require("md5");

function LOGIN_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

LOGIN_ROUTER.prototype.handleRoutes = function (router, pool) {

    router.post("/login", function (req, res) {
        var data = {
            error: true,
            error_msg: "",
        };

        if (isset(req.body.username) && isset(req.body.password)) {
            var query = `SELECT u.kode_spg,nama_spg,nama_toko,depot,password FROM user u
	         			LEFT JOIN login l ON u.kode_spg = l.kode_spg 
	         			WHERE u.kode_spg = ? AND u.status = 1 AND l.hak_akses > 1`;
            var table = [req.body.username];
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
                            if (rows[0].password == md5(req.body.password)) {
                                data.error = false;
                                data.error_msg = 'Success..';
                                data.user = {
                                    kode_spg: rows[0].username,
                                    nama_spg: rows[0].nama_spg,
                                    nama_toko: rows[0].nama_toko,
                                    depot: rows[0].depot
                                };
                                res.json(data);
                            } else {
                                data.error_msg = 'Login fail check password..';
                                res.status(403);
                                res.json(data);
                            }
                        } else {
                            data.error_msg = 'No users Found..';
                            res.status(404);
                            res.json(data);
                        }
                    }
                });
            });
        } else {
            data.error_msg = 'Missing some params..';
            res.status(400);
            res.json(data);
        }
    });
}

module.exports = LOGIN_ROUTER;
