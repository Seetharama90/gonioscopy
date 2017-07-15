var express= require('express');
var url=require('url');
var fs=require('fs');
var router=express.Router();
imageDir = __dirname + "/uploads/";
router.get('/',(function (req, res) {
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

module.exports= router;