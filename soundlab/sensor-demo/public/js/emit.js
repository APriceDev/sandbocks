var socket = io();
var sensor01 = document.querySelector('.sensor01');
var sensor02 = document.querySelector('.sensor02');

socket.on('sensor01', function(message){
    sensor01.innerHTML = parseInt(message);
});

socket.on('sensor02', function(message){
    sensor02.innerHTML = parseInt(message);
});