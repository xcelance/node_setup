var express = require('express');
var router = express.Router();
const config = require('../config/config');
const moment = require('moment');
const middleware = require('./filter')

router.get('/ping', function (req, res) {

    res.send("server is working");
});

router.get('/test', function (req, res) {


    var date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    console.log(date, "- now in UTC");
    res.send("server is working");
});

router.get('/version', function (req, res) {

    res.send("v1.128 - vcalc  is sent ");
});

router.get('/ping/db', middleware.validateSuperKey, function (req, res) {

    res.send(config);
});

router.get('/currentConfig', function (req, res) {

    res.send({
        org: process.env.ORG, port: process.env.PORT, env: process.env.NODE_ENV,
        config: config.db[process.env.ORG]
    });
});

module.exports = router;