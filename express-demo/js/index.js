var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var path = require("path");

//console.log(__dirname);

server.listen(8000, function(){
    console.log("app running on localhost:8000");
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/../index.html"));
});

//app.use("/js", express.static("../js"));
//app.use("/js", express.static(path.join(__dirname + "/../js")));

// create a virtual path prefix for files that are served by the express.static function
// specify a mount path for the static directory
app.use("/static", express.static("public"));

io.on("connection", function(socket){
    console.log("socket connected");

    socket.emit("outbound", {message : "index.js"});

    socket.on("inbound", function(data){
        console.log(data);
    });

    socket.on("disconnect", function(){
        console.log("socket disconnected");
    });
});