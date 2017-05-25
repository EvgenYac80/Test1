var express = require('express');
var url = require('url');
var fs=require('fs');
var base64Img = require('base64-img');
var bodyParser=require('body-parser');


var app = express();


app.get('/', function(req, res) {
  res.sendfile('index.html');
});
app.get('/angular-google-auth2.js', function(req, res) {
  res.sendfile('angular-google-auth2.js');
});
app.get('/html2canvas.js', function(req, res) {
  res.sendfile('html2canvas.js');
});

app.get('/oauth.js', function(req, res) {
  res.sendfile('oauth.js');
  });
  
  app.get('/module.js', function(req, res) {
  res.sendfile('module.js');
  });

app.get('/index.js', function(req, res) {
  res.sendfile('index.js');
  });
  
  app.get('/jquery.hotkeys.js', function(req, res) {
  res.sendfile('jquery.hotkeys.js');
  });
  
app.get('/api/comments', function(req, res) {
  res.sendfile('mock/UserComments.json');
  });


 app.post('/pic', function(req, res) {
	
	 var data = 'data:' + req.headers['content-type'] + ';base64,';
	    req.on('data', function(chunk) {
        data += chunk.toString();
	    });
    req.on('end', function() {
		base64Img.img(data,'mock','pic', function(err,filepath){} );
        res.write('hi');
        res.end();
    });
	
	
});
	

app.use(bodyParser.json());
app.post('/api/comments', function(req, res) {
	
	var arr;
  var text1;
	var data=fs.readFileSync('mock/UserComments.json');
		arr= JSON.parse(data.toString());
		arr.push(req.body);
		var text=JSON.stringify(arr);
		if(text){
		fs.writeFile('mock/UserComments.json',text,'utf-8',function(err,data){
		console.log(data);
		});
			}
		res.writeHead(200);
		res.end();
		
	
  });	
 


app.listen(8080);

console.log('Сервер стартовал!');