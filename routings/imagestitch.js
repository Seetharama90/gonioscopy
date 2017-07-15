var express=require('express');
var app=express();
var shell=require('shelljs');
var router=express.Router();
var fs=require('fs');
//var opencv=require('opencv');
var shelljs=require('shelljs');
var mongoose=require('mongoose');
router.get('/',function(req,res)
{
    shell.exec("g++ images.cpp");
});

module.exports=router;
