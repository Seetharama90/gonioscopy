var concat = require('concat-image');
var fs     = require('fs');
concat({
  images: [
	fs.readFileSync('./1.jpg')
	fs.readFileSync('./2.jpg')
	fs.readFileSync('./3.jpg')
}
  margin: 10 
}, function(err, canvas) {
  
fs.writeFileSync('./123.jpg', canvas.toBuffer());
}
