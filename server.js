var express = require("express");
var cors = require("cors");
var mysql = require("mysql");
var bodyParser = require("body-parser");

const login = require("./login.js");
const user = require("./user.js");
const daily = require("./daily.js");
const product = require("./product.js");
const absen = require("./absen.js");
const manage = require("./manage.js");

var app = express();

function REST() {
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function () {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit: 50,
        waitForConnection: true,
        host: '192.168.1.10',
        user: 'syuria',
        password: '20juli95',
        database: 'npspg',
        debug: false
    });
    self.configureExpress(pool);
}

REST.prototype.configureExpress = function (pool) {
    var self = this;
    app.use(cors());
    app.use(bodyParser.urlencoded({ limit: "50mb",extended: true }));
    app.use(bodyParser.json({limit: "50mb"}));
    var router = express.Router();
    app.use('/api', router);
    var login_router = new login(router, pool);
    var manage_router = new manage(router, pool);
    var user_router = new user(router, pool);
    var daily_router = new daily(router,pool);
    var product_router = new product(router,pool);
    var absen_router = new absen(router, pool);
    // Handle 404 - Keep this as a last route
    app.use(function (req, res, next) {
        res.status(400);
        res.json({ "error": true, "error_msg": "Method Not Found" });
    });
    self.startServer();
}

REST.prototype.startServer = function () {
    app.listen(3000, function () {
        console.log("All right ! I am alive at Port 3000.");
    });
}

REST.prototype.stop = function (err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();