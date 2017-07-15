var AM = require('./account-manager');
//var EM = require('./email-dispatcher');
var express=require('express');
var mongoose=require('mongoose');
var app=express();
const cookie=require('cookie-parser')
var Session = require('express-session');
app.use(Session({
	secret:'see',
	saveUninitialized: true,
	resave: true,
	cookie:{path:'/'}
}));
var router=express.Router();
	router.get('/', function(req, res){
	// check if the user's credentials are saved in a cookie //
					
			res.render('login', { title: 'Gonioscopy Login' });
	});

	router.post('/', function(req, res){
       
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
                
                //console.log(req.Session);
 				if (!o)
 				{
				res.status(400).send(e);
			}	else
			{
				
				res.status(200).send(o);

			}
		});
	});

module.exports= router;