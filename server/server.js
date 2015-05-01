// Copyright 2014 Carl Hewett

var fs = require("fs");
var app = require("express")();
var http = require("http").Server(app);

var mainDirectory = ""; // Added before requested files
var defaultPage = "demo.html";
var favicon = "server/favicon.ico";

var serverPort = 2000;

app.get('/*', function(req, res){
	var file = req.params[0]
	
	if(file)
	{
		if(file=="favicon.ico")
		{
			res.sendfile(favicon);
		} else
		{
			res.sendfile(mainDirectory + req.params[0]);
		}
	} else
	{
		res.sendfile(mainDirectory + defaultPage);
	}
});

http.listen(serverPort, function(){
	console.log("listening on port " + serverPort);
});