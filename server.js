/*var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data
//var session       = require('express-session');
//app.use(express.cookieParser());
app.use(express.session({secret: 'secret'}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());


require("./public/assignment/server/app.js")(app);

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
*/


var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');
var upload          = multer();
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var passport        = require('passport');
var mongoose        = require('mongoose');
var LocalStrategy   = require('passport-local').Strategy;

// default to a 'localhost' configuration:
var connection_string = 'mongodb://127.0.0.1:27017/cs5610spring2016';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connection_string);


app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app,mongoose,db);