var mysql = require("mysql");
const isset = require('isset');
const moment = require('moment');

function PRODUCT_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

PRODUCT_ROUTER.prototype.handleRoutes = function (router, pool) {

    router.get("/product/:kode_spg", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT * FROM product WHERE kode_product NOT IN
        			(SELECT kode_product FROM product_report where kode_spg = ?
        			 AND tanggal = DATE(CONVERT_TZ(CURDATE(),@@session.time_zone,'+07:00')))`;
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
                    if (rows.length != 0) {
                        res.status(200);
                        data.error = false;
                        data.error_msg = 'Success..';
                        data.products = rows;
                        res.json(data);
                    } else {
                        res.status(404);
                        data.error_msg = 'No product Found..';
                        res.json(data);
                    }
                }
            });
        });
    });

    router.post("/product/report", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.products)) {
            var prods = req.body.products;
            var tanggal = moment().format('YYYY-MM-DD');

            var jsonObj = JSON.parse(prods);
            var jsonArr = jsonObj['products'];
            var inserts = [];

            for (var i in jsonArr) {
                var kode_product = jsonArr[i]['kode_product'];
                var volume = jsonArr[i]['volume'];
                inserts.push([req.body.kode_spg, tanggal, kode_product, volume]);
            }

            var query = `INSERT INTO product_report 
	        			(kode_spg, tanggal, kode_product, volume) 
						VALUES ?`;
            var table = [inserts];
            query = mysql.format(query, table);
            pool.getConnection(function (err, connection) {
                connection.query(query, function (err) {
                    connection.release();
                    if (err) {
                        console.log(err);
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
        } else {
            res.status(404);
            data.error_msg = 'Missing some params..';
            res.json(data);
        }
    });

    router.put("/product/update", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.id) && isset(req.body.volume)) {
            var query = `UPDATE product_report SET volume = ? WHERE id = ?`;
            var table = [req.body.volume, req.body.id];
            query = mysql.format(query, table);
            pool.getConnection(function (err, connection) {
                connection.query(query, function (err) {
                    connection.release();
                    if (err) {
                        console.log(err);
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
            res.status(400)
            data.error_msg = 'Missing some params..';
            res.json(data);
        }
    });

    router.get("/product/:kode_spg/:tanggal", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT pr.id,pr.kode_spg,DATE_FORMAT(pr.tanggal, '%d-%m-%Y') as tanggal,p.nama_product,pr.volume
        			FROM product_report pr 
        			LEFT JOIN product p ON pr.kode_product = p.kode_product  
        			WHERE pr.kode_spg = ? AND pr.tanggal = ?`;
        var table = [req.params.kode_spg, req.params.tanggal];
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
}

module.exports = PRODUCT_ROUTER;
