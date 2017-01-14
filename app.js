var express = require('express');
var app = express();
var server = require('http').Server(app);

server.listen(3000,function(){
	console.log("server started");
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/client/index.html');
})

app.use('/', express.static(__dirname + '/client'));