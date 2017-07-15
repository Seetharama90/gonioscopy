var express=require('express');
var app=express();
var sys=require('sys');
var shelljs=require('shelljs')
var router=express.Router();
//var exec=require('child-process').exec
router.get('/',function(req,res){

shell.exec("g++ -Wall defish.cpp -o defish-ppm");
shell.exec("djpeg -pnm images.cpp | ./defish-ppm | cjpeg > sri.jpg");
});

module.exports=router;