var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io").listen(server),
	nicknames = [];


app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});



io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		if(nicknames.indexOf(data) != -1) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			updateNicknames();
		}
	});



	socket.on('send message', function(data){
		io.sockets.emit("new message", {msg: data, nick: socket.nickname});
		});

	socket.on("disconnect", function(data){
	if(!socket.nickname){
		return;
	} else {
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
	}
	});


function updateNicknames(){
	io.sockets.emit("usernames", nicknames);
}
});









server.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server started on port 3000");
});