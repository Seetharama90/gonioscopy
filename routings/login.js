'use strict';

const router = require('express').Router();
const config = require('../config/config');
const mongoose = require("mongoose");
const fs = require("fs");

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

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

conn.once("open", () => {
    gfs = Grid(conn.db);
    router.get('/', (req, res) => {
      res.render('index');
    });
	
	
    router.post('/register', (req, res) => {
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
		});
    });
	
	
    router.post('/valid', (req, res) => {
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
	
	 router.post('/technician', (req, res) => {
		 
		 var Email = req.body.t_email;
	var Password = req.body.t_password;

	var register1 = new tloginModel();
	register1.email = Email;
	register1.password = Password;
	
	//register1.save(function(err, savedObject){
	//		if (err) {
	//			console.log(err);
	//			res.status(500).send();
	//		} else{
	//			res.send(savedObject);
	//		}
	//	})
	
	 tloginModel.findOne({email:Email, password:Password}, function(err, foundData){
	 			if (err) {
					console.log(err);
	 				res.status(500).send();
	 			}
	 			if (foundData) {
	 				res.send("valid");
	 			} else{
					res.send("Invalid");
	 			}
				
	 	});
        
    });
	
})


module.exports = router;
