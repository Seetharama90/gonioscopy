var express = require('express');
var router = express.Router();
/*mongodb connection*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gonioscopy');

var mySchema = mongoose.Schema({
	patient_id: String,
	name: String,
	gender: String,
	age: Number,
	email: String,
	contact: String

});

var loginModel = mongoose.model('patient' ,mySchema);

var mySchema2 = mongoose.Schema({
	email: String,
	password: String,
	
});

var tloginModel = mongoose.model('technician' ,mySchema2);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'GonioScopy' });
});



router.post('/', function(req, res){
	var patient_id = req.body.patient_id;
	var name = req.body.name;
	var gender = req.body.gender;
	var age = req.body.age;
	var email = req.body.email;
	var contact = req.body.contact;
	
	
	var register = new loginModel();
	register.patient_id = patient_id;
	register.name = name;
	register.gender = gender;
	register.age = age;
	register.email = email;
	register.contact = contact;
	register.save(function(err, savedObject){
			if (err) {
				console.log(err);
				res.status(500).send();
			} else{
				res.send(savedObject);
			}
		})

});

router.post('/valid', function(req, res){
	var id = req.body.patient_id;

	

		loginModel.findOne({patient_id: id}, function(err, foundData){
				if (err) {
					console.log(err);
					res.status(500).send();
				}
				if (foundData) {
					res.send("Valid");
				} else{
					res.send("Invalid");
				}
				
		});
});

router.post('/technician', function(req, res){
	var Email = req.body.t_email;
	var Password = req.body.t_password;

	var register1 = new tloginModel();
	register1.email = Email;
	register1.password = Password;
	
	register1.save(function(err, savedObject){
			if (err) {
				console.log(err);
				res.status(500).send();
			} else{
				res.send(savedObject);
			}
		})
	
	// tloginModel.findOne({email:Email, password:Password}, function(err, foundData){
	// 			if (err) {
	// 				console.log(err);
	// 				res.status(500).send();
	// 			}
	// 			if (foundData) {
	// 				res.send("valid");
	// 			} else{
	// 				res.send("Invalid");
	// 			}
				
	// 	});


});


module.exports = router;
