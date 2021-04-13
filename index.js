// require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var cors = require('cors');
var dbConfig = require(`./config/config.js`);
const expressValidator = require('express-validator');

//routes:
var indexRoute = require('./routes/index.js');
var userRoute = require('./routes/account/user.js');

var app = express();
var http = require('http').createServer(app);


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use("/", indexRoute);
app.use("/account", userRoute);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err)
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'dev' ? err : {};
    console.log("ERROR", err)
    // render the error page
    res.status(err.status || 500);
    res.send({
        'error': err
    });
});

// start server requests.
http.listen(process.env.PORT || 3000, function () {
    console.log('Server listening on port: ' + http.address().port + " with config: " + process.env.NODE_ENV)
    console.log('db : ' + JSON.stringify(dbConfig.db[process.env.ORG]));
});