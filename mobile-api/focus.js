var mysql = require("mysql");
const isset = require('isset');
const moment = require('moment');

function FOCUS_ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

FOCUS_ROUTER.prototype.handleRoutes = function (router, pool) {

    router.get("/focus/:kode_spg", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT * FROM focus WHERE kode_focus NOT IN
        			(SELECT kode_focus FROM focus_report WHERE kode_spg = ?)`;
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
                        data.focuses = rows;
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

    router.post("/focus/report", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        if (isset(req.body.kode_spg) && isset(req.body.focuses)) {
            var prods = req.body.focuses;
            var tanggal = moment().format('YYYY-MM-DD');

            var jsonObj = JSON.parse(prods);
            var jsonArr = jsonObj['focuses'];
            var inserts = [];

            for (var i in jsonArr) {
                var kode_focus = jsonArr[i]['kode_product'];
                inserts.push([req.body.kode_spg, kode_focus, tanggal]);
            }

            var query = `INSERT INTO focus_report (kode_spg, kode_focus, tanggal) VALUES ?`;
            var table = [inserts];
            query = mysql.format(query, table);
            console.log(query);
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
            res.status(400);
            data.error_msg = 'Missing some params..';
            res.json(data);
        }
    });

	/*router.put("/focus/update",function(req,res){
    	var data = {"error":true,
			    	"error_msg":""};
		
		if (isset(req.body.id) && isset(req.body.volume)) {
	        var query = `UPDATE product_report SET volume = ? WHERE id = ?`;
			var table = [req.body.volume,req.body.id];
			query = mysql.format(query,table);
			connection.query(query,function(err){
			    if(err) {
			    	console.log(err);
			        res.json({"error" : true, "error_msg" : "Error executing MySQL query"});
			    } else {
			        data["error"] = false;
					data["error_msg"] = 'Report succesfuly updated..';
					res.json(data);
				}
			});
		}else{
			data["error_msg"] = 'Missing some params..';
	        res.json(data);
		}
	});*/

    router.get("/focus/history/:kode_spg/", function (req, res) {
        var data = {
            error: true,
            error_msg: ""
        };

        var query = `SELECT pr.id,pr.kode_spg,DATE_FORMAT(pr.tanggal, '%d-%m-%Y') as tanggal,p.nama_product
        			FROM focus_report pr 
        			LEFT JOIN product_focus p ON pr.kode_focus = p.kode_focus  
        			WHERE pr.kode_spg = ?`;
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
                        res.status(200)
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

module.exports = FOCUS_ROUTER;
