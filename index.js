var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io").listen(server);


app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
})



io.sockets.on('connection', function(socket){
	socket.on('send message', function(data){
		io.sockets.emit("new message", data);
	})
})












server.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server started on port 3000");
});