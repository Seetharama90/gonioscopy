var AM = require('./account-manager');
var EM = require('./email-dispatcher');
var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
var Schema = new mongoose.Schema({
	id1:String,
	name:String,
	age  :Number,
	email:String,
	address:String,
	gender:String,  
    _id:String,
	path:String
});
  
var user = mongoose.model('user', Schema);	
	router.post('/', function(req, res) {
		 var id1=req.body.text1;
		 if(id1=="")
		{ 
             console.log('Empty field');   
		}
		else
		{
		 console.log(id1);
	
		//if (req.session.user == null){
	        // if user is not logged-in redirect back to login page //
			//res.redirect('/');
		//}	else{
		//}
			patients.find({id1:id1},function (err, docs) {
        	res.render('record',{patients:docs});								
			});
 }
});

module.exports=router;