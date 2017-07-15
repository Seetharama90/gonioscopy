var AM = require('./account-manager');
var EM = require('./email-dispatcher');
var url=require('url');
var fs=require('fs');
//var images=require('node-images');
path = require('path');
var html=require('html');
var mongoose=require('mongoose');
var express = require('express');
var app=express();
var router = express.Router();
var exec=require('exec');
var shell=require('shelljs');
var engines = require('consolidate');
app.engine('html', engines.mustache);
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname+'/images'));
const bodyParser = require('body-parser');
var Session = require('express-session');
var Session= Session({
	secret:'secrettokenhere',
	saveUninitialized: true,
	resave: true,
	cookie:{maxAge:50000}
});
// requiring Helper file to run helper functions
const helper = require('./helper');

//app.set('view engine', 'html');
//var routes = require('./routes/imagefile');
module.exports = function(app) {

// main login page //
	/*app.get('/login', function(req, res){
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Gonioscopy Login' });
		}	else{
	// attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/record');
				}	else{
					res.render('login', { title: 'Please Login to Your Account' });
				}
			});
		}
	});

	app.post('/login', function(req, res){
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'true'){
					res.cookie('user', o.user, { maxAge: 500000 });
					res.cookie('pass', o.pass, { maxAge: 500000 });
				}
				res.status(200).send(o);
			}
		});
	});

app.get('/', function(req, res) {
		res.render('index');
	});
app.get('/sendotp', function(req, res){
		sessionInfo = req.session;
		const userID=req.body.id;
		const data={
			_id : userID
		}

		helper.sendOtp(data,function(result){
			console.log(result);
			var response={};
			if(result.process){
				sessionInfo.otpData={
					id : userID,
					otp : result.otp
				};
				response.otpCreated = true;
			}else{
				response.otpCreated = false;
				response.message = result.message;
			}
			response.message = result.message;

			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(JSON.stringify(response));			
		});
	});

	app.post('/verifyOtp', function(req, res){
		sessionInfo = req.session;

		const data={
			otp : req.body.otp,
			id : req.body.id
		}
		const otpData = sessionInfo.otpData;

		helper.verifyOtp(data,otpData,function(result){
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(JSON.stringify(result));			
		});
	});


// logged-in user homepage //
//mongoose.connect('mongodb://localhost:27017/node-login');

app.get('/logout', function(req, res){
		res.clearCookie('user');
		res.clearCookie('pass');
		req.session.destroy();
   		res.redirect('/');              
	});
	

	app.get('/techreg', function(req, res) {
		res.render('tech', {  title: 'Technician Registration'});
	});

app.post('/techreg', function(req, res){
		AM.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			number  : req.body['number']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

    // creating new accounts //
	
	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup'});
	});
	
	app.post('/signup', function(req, res){
		AM.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			number : req.body['number']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});


imageDir = __dirname + "/uploads/";
app.get('/images',(function (req, res) {
    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url,true).query;
        pic = query.image;

    if (typeof pic === 'undefined') {
        getImages(imageDir, function (err, files) {
            var imageLists = '<ul>';
            
            for (var i=0; i<files.length; i++) {

                imageLists += '<li><a href="images?image=' + files[i] + '">' + files[i] + '</li>';
           }
            imageLists += '</ul>';
		    res.writeHead(200, {'Content-type':'text/html'});
            res.end(imageLists);        
     
        });
    } 
    else {
        //read the image using fs and send the image content back in the response
        fs.readFile(imageDir + pic, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No Image");    
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type':'image/jpg'});
                res.end(content)
            }
        });
    }
}));

//get the list of jpg files in the image dir

function getImages(imageDir, callback) {
    var fileType = '.jpg',
        files = [], i;
        var arr=new Array;
    fs.readdir(imageDir, function (err, arr) {
        for(i=0; i<arr.length; i++) {
            if(path.extname(arr[i]) === fileType) {
                files.push(arr[i]); //store the file name into the array files
            }
        }
        callback(err, files);
    });
}

   app.post('/lost-password', function(req, res){
	// look up the user's account via their email //
		AM.getAccountByEmail(req.body['email'], function(o){
			if (o){
				EM.dispatchResetPasswordLink(o, function(e, m){
				// this callback takes a moment to return //
				// TODO add an ajax loader to give user feedback //
					if (!e){
						 res.status(200).send('ok');
					}	 else{
						 for (k in e) console.log('ERROR : ', k, e[k]);
						 res.status(400).send('unable to dispatch password reset');
					}
				});
			}	else{
				res.status(400).send('email-not-found');
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		var email = req.query["e"];
		var passH = req.query["p"];
		AM.validateResetLink(email, passH, function(e){
			if (e != 'ok'){
				res.redirect('/');
			} else{
	  // save the user's email in a session instead of sending to the client //
				req.session.reset = { email:email, passHash:passH };
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	app.post('/reset-password', function(req, res) {
		var nPass = req.body['pass'];
	// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
	// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(email, nPass, function(e, o){
			if (o)
			{
				res.status(200).send('ok');
			}	else{
				res.status(400).send('unable to update password');
			}
		})
	});
	

app.get('/profile', function(req, res) {
		res.sendfile("profile.html");
	});

var user1 = mongoose.model('files', Schema);

	app.get('/img', function(req, res) {

		if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
			res.redirect('/');
		}	else{
			 user1.find({},function (err, docs) {
        res.render('view1',{users:docs});
								
			});
		}

		});
app.get('/down',function(req,res){

res.render('download');

});

app.get('/do', function(req, res){
  res.send('<center><ul>'
    + '<li>Download <a href="/1.html">File.apk</a></li>'
    + '</ul>');
});	

app.get('/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/files/' + file;

  res.download(path);
});

app.get('/def',function(req,res)
{
   //var img=new Image();
   //img.src ="/uploads/eye1.jpg";
   shell.exec("g++ -Wall defish.cpp -o defish-ppm"); 
   shell.exec("djpeg -pnm images.jpg | ./defish-ppm | cjpeg > sri.JPG");
   fs.readFile('sri.JPG', function (err, data) {
   if (err) throw err;
   res.write(data);
   });
});	*/


var Schema = new mongoose.Schema({
	id1:String,
	name:String,
	age  :Number,
	email:String,
	address:String,
	gender:String,  
    _id:String,
	path:String
});
  
var user = mongoose.model('users1', Schema);
	
	app.get('/search', function(req, res) {
		 var id1=req.body.text1;
		 if(id1=="")
		{ 
             console.log('Empty field');   
		}
		else
		{
		 //console.log(id1);
		var id1 = document.getElementById("text1").value;
		if (req.session.user == null){
	        // if user is not logged-in redirect back to login page //
			res.redirect('/');
		}	else{
		}
			user.find({id1:id1},function (err, docs) {
        	res.render('record',{users:docs});								
			});
 }}
 );
};