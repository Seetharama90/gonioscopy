var express = require('express');
var router = express.Router();
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('change');
});

router.post('/', function(req, res, next) {
  var new1=req.body.new;
  var new2=req.body.renew;
  var mongoClient = require('mongodb').MongoClient;
 
var url = 'mongodb://localhost:27017/gonioscopy';
 
mongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Sorry unable to connect to MongoDB Error:', err);
    } else {
 
        var collection = db.collection('admin');
        if(new1==new2)
        {
        collection.updateOne({
            "user": "admin"
        }, {
            $set: {
                "pass": new1
            }
        }, function(err, results) {
            res.render('signup');
        });
 }
 else
 {
 	res.render('error');
        db.close();
 }
    }
});

});

module.exports = router;
