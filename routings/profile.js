var AM = require('./account-manager');
var EM = require('./email-dispatcher');
var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
router.get('/', function(req, res) {
		res.render('profile');
	});
module.exports = router;