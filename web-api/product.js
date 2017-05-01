var mysql = require("mysql");
const isset = require('isset');
const moment = require('moment');

function PRODUCT_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

PRODUCT_ROUTER.prototype.handleRoutes = function (router, pool) {

 router.get("/products", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT * FROM product`;
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

    router.get("/product/user/:kode_spg/:bulan/:tahun", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT *, concat('Rp. ',format(ccm,0)) as jml_ccm,
                    concat('Rp. ',format(rm,0)) as jml_rm,
                    DATE_FORMAT(tanggal, '%d-%m-%Y') as tgl
                    FROM Daily_Product_Report WHERE kode_spg = ?
                    AND MONTH(tanggal) = ? AND YEAR(tanggal) = ?`;
        var table = [req.params.kode_spg, req.params.bulan, req.params.tahun];
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

    router.get("/product/daily/:depot/:tanggal", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (req.params.depot === "ADMIN") {
            var query = `SELECT *, concat('Rp. ',format(ccm,0)) as jml_ccm,
                        concat('Rp. ',format(rm,0)) as jml_rm,
                        DATE_FORMAT(tanggal, '%d-%m-%Y') as tgl
                        FROM Daily_Product_Report WHERE tanggal = ?`;
            var table = [req.params.tanggal];
        } else {
            var query = `SELECT *, concat('Rp. ',format(ccm,0)) as jml_ccm,
                        concat('Rp. ',format(rm,0)) as jml_rm,
                        DATE_FORMAT(tanggal, '%d-%m-%Y') as tgl
                        FROM Daily_Product_Report WHERE tanggal = ? AND depot = ?`;
            var table = [req.params.tanggal, req.params.depot];
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

    router.get("/product/monthly/:depot/:bulan/:tahun", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (req.params.depot === "ADMIN") {
            var query = `SELECT *, concat('Rp. ',format(ccm,0)) as jml_ccm,
                        concat('Rp. ',format(rm,0)) as jml_rm
                        FROM Monthly_Product_Report WHERE bulan = ? AND tahun = ?`;
            var table = [req.params.bulan, req.params.tahun];
        } else {
            var query = `SELECT *, concat('Rp. ',format(ccm,0)) as jml_ccm,
                        concat('Rp. ',format(rm,0)) as jml_rm
                        FROM Monthly_Product_Report WHERE bulan = ? AND tahun = ? AND depot = ?`;
            var table = [req.params.bulan, req.params.tahun, req.params.depot];
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
}

module.exports = PRODUCT_ROUTER;
