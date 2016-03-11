var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");
var moment = require("moment");
var five = require("johnny-five");
var board = new five.Board();
var socket;
var connected = false;

app.get("/", function(req, res){
  //res.sendFile(__dirname + "/index.html");
  res.sendFile(path.join(__dirname, "../index.html"));
});

//app.use("/css", express.static("css"));
app.use("/css", express.static("../css"));
app.use("/js", express.static("../js"));

io.on("connection", function(s){
 console.log("User connected");
   // tracking connection
   connected = true;
   // saving this for the board on ready callback function
   socket = s;
 });

board.on("ready", function() {
 console.log("Board ready");

 var tempSensor = new five.Thermometer({
  controller : "TMP36",
  pin : "A0",
  freq :  5000
});

 tempSensor.on("data", function() {
  // send the temperature when the browser is connected.
  if(connected) socket.emit("temperature reading", this.fahrenheit);
  if(connected) socket.emit("timestamp", moment().format("MMMM Do YYYY, h:mm a"));
  });
});

http.listen(3000, function(){
 console.log("listening on *:3000");
});

console.log("Waiting for device to connect...");