var http=require("http");

http.createServer(function(request,response){
console.log('Server listen');
response.writeHead(200);

}).listen(8080);
