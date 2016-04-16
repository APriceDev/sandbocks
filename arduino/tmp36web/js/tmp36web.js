var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var five = require('johnny-five');
var board = new five.Board();
var moment = require('moment');
var socket;
var connected  = false;


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use('/static', express.static('public'));

io.on('connection',function(s){
    console.log('connected');
    // tracking connection
    connected = true;
    socket = s;
});

board.on('ready', function(){
    console.log('board ready');

    var tmpSensor = new five.Thermometer({
        controller : 'TMP36',
        pin : 'A0',
        freq : 5000
    });

    tmpSensor.on('data', function(){
        if (connected) {
            socket.emit("temp reading", this.fahrenheit);
            socket.emit('timestamp', moment().format('MMMM Do YYYY, h:mm a'));
        };
    });

});

server.listen(8000, function(){
    console.log('server listening on *:8000');
});

console.log('waiting for device to connect...');