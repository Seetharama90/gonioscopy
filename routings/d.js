var http = require('http'),
    url = require('url'),
    fs = require('fs');
 var express = require('express')
  , app = module.exports = express();
 var router=express.Router();
 
//create the http server listening on port 3333
router.get('/', function(req, res, next){
    var file = __dirname + '/files/Gonioscopy.apk';
  res.download(file);
});
 
module.exports=router;