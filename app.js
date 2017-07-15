'use strict';
const app = require('express')(),
      config = require('./config/config');


require('./config/express.config')(app);

//Express conf !
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var session = require('express-session');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
//var app = express();
var mongoose=require('mongoose');
app.locals.pretty = true;
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
//var stitch=require('./routes/imagestitch.js');
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Mongoose Conf !
require('./config/mongoose.config')(config);
//app.use('/defish',profile);
//app.use('/do',profile);
// catch 404 and forward to error handler


app.listen(config.dev.port, () => {
  console.log("Listening ..");
});
