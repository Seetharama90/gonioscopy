var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
//app.use(express.static(__dirname+'/files'));
router.get('/', function(req, res){
  res.send('<center><ul>'
    + '<li>Download <a href="/Gonioscopy.apk">File.apk</a></li>'
    + '</ul>');
});	
router.get('/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/files/' + file;

  res.download(path);
});

module.exports= router;