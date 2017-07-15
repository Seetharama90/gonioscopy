var AM = require('./account-manager3');
var express=require('express');
var mongoose=require('mongoose');
var app=express();
var Session = require('express-session');
var Session= Session({
	secret:'see',
	saveUninitialized: true,
	resave: true,
	cookie:{maxAge:50000}
});
var router=express.Router();
	router.get('/', function(req, res){
	// check if the user's credentials are saved in a cookie //
					
			res.render('admin', { title: 'Admin Login' });
		
	});

	router.post('/', function(req, res){
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
 				if (!o)
 				{
				res.status(400).send(e);
			   }	
				else
				{	
					res.status(200).send(o);
				}
		});
	});

module.exports= router;