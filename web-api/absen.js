var mysql = require("mysql");
const moment = require('moment');
const isset = require('isset');
const fs = require('fs');
const pad = require('pad-left');

function ABSEN_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

ABSEN_ROUTER.prototype.handleRoutes = function (router, pool) {

    router.get("/absen/user/:kode_spg/:bulan/:tahun", function (req, res) {
        var data = {
            error: true,
            error_msg: "",
            absen: []
        };

        var query = `SELECT *, DATE_FORMAT(tanggal, '%d-%m-%Y') as tgl
                    FROM Absen_Report WHERE kode_spg = ? AND MONTH(tanggal) = ? AND YEAR(tanggal) = ?`;
        var table = [req.params.kode_spg, req.params.bulan, req.params.tahun];
        query = mysql.format(query, table);
        pool.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500);
                    data.error_msg = "Error executing MySQL query";
                    res.json(data);
                } else {
                    if (rows.length > 0) {
                        data.error = false;
                        data.error_msg = 'Success..';
                        rows.forEach(function (absen) {
                            var abs = {
                                kode_absen: absen.kode_absen,
                                tanggal: absen.tgl,
                                jam_masuk: absen.jam_masuk,
                                lokasi_masuk: absen.lokasi_masuk,
                                jam_pulang: absen.jam_pulang,
                                lokasi_pulang: absen.lokasi_pulang
                            }
                            data.absen.push(abs);
                        });
                        res.status(200);
                        res.json(data);
                    } else {
                        data.error_msg = 'No Absen Found..';
                        res.status(404);
                        res.json(data);
                    }
                }
            });
        });

    });

    router.get("/absen/depot/:depot/:tanggal", function (req, res) {
        var data = {
            error: true,
            error_msg: "",
            absen: []
        };

        if (req.params.depot === "ADMIN") {
            var query = `SELECT *, DATE_FORMAT(tanggal, '%d-%m-%Y') as tgl 
                        FROM Absen_Report WHERE tanggal = ?`;
            var table = [req.params.tanggal];
        } else {
            var query = `SELECT *, DATE_FORMAT(tanggal, '%d-%m-%Y') as tgl 
                        FROM Absen_Report WHERE depot = ? AND tanggal = ?`;
            var table = [req.params.depot, req.params.tanggal];
        }

        query = mysql.format(query, table);
        pool.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500);
                    data.error_msg = "Error executing MySQL query";
                    res.json(data);
                } else {
                    if (rows.length > 0) {
                        data.error = false;
                        data.error_msg = 'Success..';
                        rows.forEach(function (absen) {
                            var abs = {
                                kode_absen: absen.kode_absen,
                                nama_spg: absen.nama_spg,
                                nama_toko: absen.nama_toko,
                                depot: absen.depot,
                                tanggal: absen.tgl,
                                jam_masuk: absen.jam_masuk,
                                lokasi_masuk: absen.lokasi_masuk,
                                jam_pulang: absen.jam_pulang,
                                lokasi_pulang: absen.lokasi_pulang
                            }
                            data.absen.push(abs);
                        });res.status(200);
                        res.json(data);
                    } else {
                        data.error_msg = 'No Absen Found..';
                        res.status(404);
                        res.json(data);
                    }
                }
            });
        });

    });
}

module.exports = ABSEN_ROUTER;
