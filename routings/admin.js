var AM = require('./account-manager');

var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
	router.get('/', function(req, res) {
		res.render('admin', {  title: 'Admin Login'});
	});
module.exports= router;