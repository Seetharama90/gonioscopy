var express = require('express');
var router = express.Router();
/*mongodb connection*/	
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/gonioscopy');
router.get('/', function(req, res) {
  res.render('download', { title: 'GonioScopy' });
});	


module.exports=router;
