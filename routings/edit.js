var AM = require('./account-manager');
var EM = require('./email-dispatcher');
var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
router.get('/', function(req, res) {
		res.render('profile', {  title: 'Edit an Account'});
	});
	router.post('/', function(req, res){
		AM.UpdateAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});


module.exports=router;