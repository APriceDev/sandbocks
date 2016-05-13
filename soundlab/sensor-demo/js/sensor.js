var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var five = require('johnny-five');
var board = new five.Board();
var socket;
var connected = false;

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../index.html'));
});

app.use('/static', express.static('public'));

io.on('connection', function(s){
    console.log('device connected');
    connected = true;
    socket = s;
});

board.on('ready', function(){
    console.log('board ready');
    var sensor01 = new five.Sensor({
        pin : 'A0',
        freq : 250
    });

    sensor01.scale(0,100).on('change', function(){
        if(connected){
            var output = parseInt(this.value);
            socket.emit('sensor01', output);
        };
    });
    var sensor02 = new five.Sensor({
        pin : 'A2',
        freq : 250
    });

    sensor02.scale(0,100).on('change', function(){
        if(connected){
            var output = parseInt(this.value);
            socket.emit('sensor02', output);
        };
    });
});

server.listen(8000, function(){
    console.log('server listening on *:8000');
});

console.log('waiting for device to connect...');