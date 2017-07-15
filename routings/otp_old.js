'use strict';

const router = require('express').Router();
const config = require('../config/config');
const mongoose = require("mongoose");
const fs = require("fs");
var rn = require('random-number');
//var client = require('twilio')('AC97daaa0327e0054b4dac8d80f6dfd9bd', '62265ea4f73d33616ef5f063092b31e5');

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db);
    router.get('/', (req, res) => {
      res.send('OTP Verfication By NitinAgarwal !');
    });
	
    router.post('/', (req, res) => {
       var mob = req.body.mobile;
			
			var options = { min: 1000, max: 100000, integer: true}
			var ok = rn(options)
			console.log(ok);
			var trial = ok.toString();
			res.status(200).send(trial);
			
    });
	
    router.post('/img', (req, res) => {
       
    });
})


module.exports = router;
