var AM = require('./account-manager');
var EM = require('./email-dispatcher');
var url=require('url');
var fs=require('fs');
//var images=require('node-images');
path = require('path');
var html=require('html');
var mongoose=require('mongoose');
var express = require('express');
var app=express();
var router=express.Router();
var exec=require('exec');
var shell=require('shelljs');
var engines = require('consolidate');
app.engine('html', engines.mustache);
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname +'/images'));
const bodyParser = require('body-parser');
var Session = require('express-session');
var Session= Session({
	secret:'see',
	saveUninitialized: true,
	resave: true,
	cookie:{maxAge:50000}
});
mongoose.connect('mongodb://localhost/gonioscopy');
  	var Schema = new mongoose.Schema({
	filename:String
});
   router.get('/', function(req, res) {
              
   var user = mongoose.model('fs.files', Schema);
			user.find({},function (err, docs) {
        res.render('record1',{fsfiles:docs});
							
			});

		//}
	});
module.exports = router;