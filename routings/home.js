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
const cookie=require('cookie-parser')
var Session = require('express-session');
app.use(Session({
	secret:'see',
	saveUninitialized: true,
	resave: true,
	cookie:{path:'/'}
}));
mongoose.connect('mongodb://localhost/gonioscopy');
   	var Schema = new mongoose.Schema({
	patient_id:String,
	name: String,
	age  : Number,
	email:String,
	contact:String,
	gender:String,  
});
    var user = mongoose.model('patients', Schema)
    router.get('/', function(req, res) {
		user.find({},function (err, docs) {
        res.render('record',{patients:docs});							
			});	
		//}
	});
   //var user = mongoose.model('user', Schema);	
		router.post('/', function(req, res) {
		 var id1=req.body.text1;
		 if(id1=="")
		{ 
             res.send(500,"Please Enter Patient ID");
		}
		else
		{	
		//if (req.session.user == null){
	        // if user is not logged-in redirect back to login page //
			//res.redirect('/');
		//}	else{
		//}
			user.find({patient_id:id1},function (err, docs) {
        	res.render('record',{patients:docs});								
			});
 }
});
	
module.exports = router;