var express= require('express');
var router=express.Router();
var Session = require('express-session');
var Session= Session({
	secret:'see',
	saveUninitialized: true,
	resave: true,
	cookie:{maxAge:50000}
});
router.get('/', function(req, res){
		res.clearCookie('user');
		res.clearCookie('pass');
   		res.redirect('/log');              
	});

module.exports= router;
	