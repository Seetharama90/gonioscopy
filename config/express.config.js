"use strict";

const logger           = require('morgan'),
      busboyBodyParser = require('busboy-body-parser'),
	  bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(logger('dev'));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use(busboyBodyParser({ limit: '10mb' }));  
	app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

    //[*]Routes Configuration
    let main = require('../routings/routing.js');
    app.use('/api', main);
	
	var login = require('../routings/login.js');
var otp = require('../routings/otp.js');
var index = require('../routings/index');
var users = require('../routings/users');
var log = require('../routings/login1');
var login2 = require('../routings/login2');
var login3=require('../routings/login3');
var admin=require('../routings/admin');
var change=require('../routings/change');
var edit=require('../routings/edit');
var def=require('../routings/defish');
var image=require('../routings/image');
var record = require('../routings/home');
var record1 = require('../routings/home1');
var signup=require('../routings/signup');
var stitch=require('../routings/imagestitch');
var search = require('../routings/home');
var download = require('../routings/downlaod');
//var index=require('./routes/index'); 
var tech = require('../routings/techreg');
var forgot=require('../routings/forgot');
//var img=require('../routings/img');
var profile = require('../routings/edit');
var download1=require('../routings/d');
var logout=require('../routings/logout');
//var stitch=require('./routes/imagestitch.js');
app.use('/login', login);
app.use('/otp', otp);
app.use('/', index);
app.use('/users', users);
app.use('/log', log);
app.use('/download', login2);
app.use('/admin', login3);
app.use('/admin',admin)
app.use('/change',change);
app.use('/signup1',signup);
app.use('/record',record);
app.use('/record1',record1);
app.use('/def',def);
app.use('/search',search);
app.use('/download',download);
//app.use('/images',img);
app.use('/image',image);
app.use('/profile',edit);
app.use('/stitch',stitch);
app.use('/tech',tech);
app.use('/signup',tech);
app.use('/forgot',forgot);
app.use('/profile',profile);
app.use('/download1',download1);
app.use('/logout',logout);
};