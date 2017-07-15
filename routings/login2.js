var AM = require('./account-manager1');
var express=require('express');
var mongoose=require('mongoose');
var app=express();

var router=express.Router();
router.post('/', function(req, res){
		AM.manualLogin(req.body['password'], function(e, o){
                
			if (!o)
			{
				res.status(400).send(e);
			}	
			else
			{
				//req.session.user = o;
			}
				
				res.status(200).send(o);
			
		});
	});


module.exports= router;