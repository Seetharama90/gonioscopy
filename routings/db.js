"use strict";
/*requiring mongodb node modules */
const  mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const assert = require('assert');
const MongoUrl='mongodb://localhost:27017/node-login';
var mongoose=require('mongoose');
module.exports.onConnect = function(callback){	
	MongoClient.connect(MongoUrl, function(err, db) {
		assert.equal(null, err);
		callback(db,ObjectID);
	});

}

 	var Schema = new mongoose.Schema({
	id1:String,
	name: String,
	age  : Number,
	email:String,
	address:String,
	gender:String,  
    _id:String,
	path:String
});
