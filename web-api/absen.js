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
            user: {},
            absen: []
        };

        var query = `SELECT a.kode_absen, 
	    			COALESCE(u.nama_spg, ' ') as nama_spg,
	    			COALESCE(u.nama_toko, ' ') as nama_toko,
	    			COALESCE(u.depot, ' ') as depot,
					DATE_FORMAT(a.tanggal, '%d-%m-%Y') as tanggal,
					CAST(COALESCE(a.jam_masuk, ' ') as CHAR) as jam_masuk,
					COALESCE(a.lokasi_masuk, ' ') as lokasi_masuk,
					CAST(COALESCE(a.jam_pulang, ' ') as CHAR) as jam_pulang,
					COALESCE(a.lokasi_pulang, ' ') as lokasi_pulang
					FROM absen a LEFT JOIN user u ON a.kode_spg = u.kode_spg
        			WHERE a.kode_spg = ? AND MONTH(tanggal) = ? AND YEAR(tanggal) = ?`;

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
                        data.user = {
                            kode_spg: rows[0].kode_spg,
                            nama_spg: rows[0].nama_spg,
                            nama_toko: rows[0].nama_toko,
                            depot: rows[0].depot
                        };

                        rows.forEach(function (absen) {
                            var abs = {
                                kode_absen: absen.kode_absen,
                                tanggal: absen.tanggal,
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
                        data["error_msg"] = 'No Absen Found..';
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
            var query = `SELECT a.kode_absen, 
	    			COALESCE(u.nama_spg, ' ') as nama_spg,
	    			COALESCE(u.nama_toko, ' ') as nama_toko,
	    			COALESCE(u.depot, ' ') as depot,
					DATE_FORMAT(a.tanggal, '%d-%m-%Y') as tanggal,
					CAST(COALESCE(a.jam_masuk, ' ') as CHAR) as jam_masuk,
					COALESCE(a.lokasi_masuk, ' ') as lokasi_masuk,
					CAST(COALESCE(a.jam_pulang, ' ') as CHAR) as jam_pulang,
					COALESCE(a.lokasi_pulang, ' ') as lokasi_pulang
					FROM absen a LEFT JOIN user u ON a.kode_spg = u.kode_spg WHERE tanggal = ?`;
            var table = [req.params.tanggal];
        } else {
            var query = `SELECT a.kode_absen, 
	    			COALESCE(u.nama_spg, ' ') as nama_spg,
	    			COALESCE(u.nama_toko, ' ') as nama_toko,
	    			COALESCE(u.depot, ' ') as depot,
					DATE_FORMAT(a.tanggal, '%d-%m-%Y') as tanggal,
					CAST(COALESCE(a.jam_masuk, ' ') as CHAR) as jam_masuk,
					COALESCE(a.lokasi_masuk, ' ') as lokasi_masuk,
					CAST(COALESCE(a.jam_pulang, ' ') as CHAR) as jam_pulang,
					COALESCE(a.lokasi_pulang, ' ') as lokasi_pulang
					FROM absen a LEFT JOIN user u ON a.kode_spg = u.kode_spg
	        		WHERE depot = ? AND tanggal = ?`;
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
                        data.absen = rows;
                        res.status(200);
                        res.json(data);
                    } else {
                        data["error_msg"] = 'No Absen Found..';
                        res.status(404);
                        res.json(data);
                    }
                }
            });
        });

    });
}

module.exports = ABSEN_ROUTER;
