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

    router.get("/absen/pulang/:kode_spg/:bulan/:tahun", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT kode_absen,kode_spg,DATE_FORMAT(tanggal, '%d-%m-%Y') as tanggal,jam_pulang,lokasi_pulang
        			FROM absen WHERE kode_spg = ? AND MONTH(tanggal) = ? AND YEAR(tanggal) = ?`;
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

    router.get("/absen/masuk/:kode_spg/:bulan/:tahun", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT kode_absen,kode_spg,DATE_FORMAT(tanggal, '%d-%m-%Y') as tanggal,jam_masuk,lokasi_masuk
        			FROM absen WHERE kode_spg = ? AND MONTH(tanggal) = ? AND YEAR(tanggal) = ?`;
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

    router.post("/absen/masuk", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.zona) && isset(req.body.lokasi) && isset(req.body.photo)) {
            var a = moment().format('H:m:s');
            if (req.body.zona == 3) {
                var b = "06:30:00";
            } else if (req.body.zona == 2) {
                var b = "07:30:00";
            } else {
                var b = "08:30:00";
            }

            var aa1 = a.split(":");
            var aa2 = b.split(":");

            var d1 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa1[0], 10), parseInt(aa1[1], 10), parseInt(aa1[2], 10));
            var d2 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa2[0], 10), parseInt(aa2[1], 10), parseInt(aa2[2], 10));
            var dd1 = d1.valueOf();
            var dd2 = d2.valueOf();

            if (dd1 > dd2) {
                res.status(400);
                data.error_msg = 'Lewat waktu absen';
                res.json(data);
            } else {
                if (req.body.zona == 3) {
                    var query = `SELECT kode_absen FROM absen WHERE kode_spg = ? AND tanggal 
	        				= DATE(CONVERT_TZ(NOW(),@@session.time_zone,'+09:00'))`;
                } else if (req.body.zona == 2) {
                    var query = `SELECT kode_absen FROM absen WHERE kode_spg = ? AND tanggal 
	        				= DATE(CONVERT_TZ(NOW(),@@session.time_zone,'+08:00'))`;
                } else {
                    var query = `SELECT kode_absen FROM absen WHERE kode_spg = ? AND tanggal 
	        				= DATE(CONVERT_TZ(NOW(),@@session.time_zone,'+07:00'))`;
                }

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
                                res.status(400);
                                data.error = true;
                                data.error_msg = 'Already absen';
                                res.json(data);
                            } else {
                                if (req.body.zona == 3) {
                                    var query = `INSERT INTO absen (kode_spg, tanggal, jam_masuk, lokasi_masuk) 
                                                VALUES(?, CONVERT_TZ(NOW(),@@session.time_zone,'+09:00'),
                                                CONVERT_TZ(NOW(),@@session.time_zone,'+09:00'), ?)`;
                                } else if (req.body.zona == 2) {
                                    var query = `INSERT INTO absen (kode_spg, tanggal, jam_masuk, lokasi_masuk) 
                                                VALUES(?, CONVERT_TZ(NOW(),@@session.time_zone,'+08:00'),
                                                CONVERT_TZ(NOW(),@@session.time_zone,'+08:00'), ?)`;
                                } else {
                                    var query = `INSERT INTO absen (kode_spg, tanggal, jam_masuk, lokasi_masuk) 
                                                VALUES(?, CONVERT_TZ(NOW(),@@session.time_zone,'+07:00'),
                                                CONVERT_TZ(NOW(),@@session.time_zone,'+07:00'), ?)`;
                                }
                                var table = [req.body.kode_spg, req.body.lokasi];
                                query = mysql.format(query, table);
                                pool.getConnection(function (err, connection) {
                                    connection.query(query, function (err, results) {
                                        connection.release();
                                        if (err) {
                                            console.log(err);
                                            res.status(500);
                                            data.error_msg = "Error executing MySQL query";
                                            res.json(data);
                                        } else {
                                            var kode_absen = 'ABS-' + (pad(results.insertId, 11, '0'));
                                            var query = `UPDATE absen SET kode_absen = ? WHERE id = ?`;
                                            var table = [kode_absen, results.insertId];
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
                                                        fs.writeFile('./upload/' + kode_absen + '-M.jpeg', req.body.photo, 'base64', function (err) {
                                                        });
                                                        res.status(200);
                                                        data.error = false;
                                                        data.error_msg = 'Absen succesfuly submited';
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
            }
        } else {
            res.status(400);
            data.error_msg = "Missing some params..";
            res.json(data);
        }
    });

    router.post("/absen/pulang", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.zona) && isset(req.body.lokasi) && isset(req.body.photo)) {
            var a = moment().format('H:m:s');
            if (req.body.zona == 3) {
                var b = "14:30:00";
            } else if (req.body.zona == 2) {
                var b = "15:30:00";
            } else {
                var b = "16:30:00";
            }

            var aa1 = a.split(":");
            var aa2 = b.split(":");

            var d1 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa1[0], 10), parseInt(aa1[1], 10), parseInt(aa1[2], 10));
            var d2 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa2[0], 10), parseInt(aa2[1], 10), parseInt(aa2[2], 10));
            var dd1 = d1.valueOf();
            var dd2 = d2.valueOf();

            if (dd1 < dd2) {
                res.status(400);
                data.error_msg = 'Belum masuk waktu absen';
                res.json(data);
            } else {
                if (req.body.zona == 3) {
                    var query = `SELECT kode_absen FROM absen WHERE kode_spg = ? AND tanggal 
	        				= DATE(CONVERT_TZ(NOW(),@@session.time_zone,'+09:00'))`;
                } else if (req.body.zona == 2) {
                    var query = `SELECT kode_absen FROM absen WHERE kode_spg = ? AND tanggal 
	        				= DATE(CONVERT_TZ(NOW(),@@session.time_zone,'+08:00'))`;
                } else {
                    var query = `SELECT kode_absen FROM absen WHERE kode_spg = ? AND tanggal 
	        				= DATE(CONVERT_TZ(NOW(),@@session.time_zone,'+07:00'))`;
                }
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
                            if (rows.length == 0) {
                                res.status(400);
                                data.error = true;
                                data.error_msg = 'anda sudah telat hari ini';
                                res.json(data);
                            } else {
                                var query = `SELECT kode_absen,jam_pulang FROM absen 
						    				WHERE kode_absen = ?`;
                                var table = [rows[0].kode_absen];
                                query = mysql.format(query, table);
                                pool.getConnection(function (err, connection) {
                                    connection.query(query, function (err, rows) {
                                        connection.release();
                                        if (err) {
                                            res.status(500);
                                            data.error_msg = "Error executing MySQL query";
                                            res.json(data);
                                        } else {
                                            if (rows[0].jam_pulang !== null) {
                                                res.status(400);
                                                data.error = true;
                                                data.error_msg = 'Anda sudah absen';
                                                res.json(data);
                                            } else {
                                                var kode_absen = rows[0].kode_absen;
                                                if (req.body.zona == 3) {
                                                    var query = `UPDATE absen SET jam_pulang = CONVERT_TZ(NOW(),@@session.time_zone,'+09:00'),
										    				 lokasi_pulang = ? WHERE kode_absen = ?`;
                                                } else if (req.body.zona == 2) {
                                                    var query = `UPDATE absen SET jam_pulang = CONVERT_TZ(NOW(),@@session.time_zone,'+08:00'),
										    				 lokasi_pulang = ? WHERE kode_absen = ?`;
                                                } else {
                                                    var query = `UPDATE absen SET jam_pulang = CONVERT_TZ(NOW(),@@session.time_zone,'+07:00'),
										    				 lokasi_pulang = ? WHERE kode_absen = ?`;
                                                }

                                                var table = [req.body.lokasi, kode_absen];
                                                query = mysql.format(query, table);
                                                pool.getConnection(function (err, connection) {
                                                    connection.query(query, function (err, results) {
                                                        connection.release();
                                                        if (err) {
                                                            console.log(err);
                                                            res.status(500);
                                                            data.error_msg = "Error executing MySQL query";
                                                            res.json(data);
                                                        } else {
                                                            fs.writeFile('./upload/' + kode_absen + '-P.jpeg', req.body.photo, 'base64', function (err) {
                                                            });
                                                            res.status(200);
                                                            data.error = false;
                                                            data.error_msg = 'Absen succesfuly submited';
                                                            res.json(data);
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            }
        } else {
            res.status(400);
            data.error_msg = "Missing some params..";
            res.json(data);
        }
    });

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
