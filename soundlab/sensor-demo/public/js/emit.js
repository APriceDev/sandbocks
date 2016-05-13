var socket = io();
var sensor01 = document.querySelector('.sensor01');
var sensor02 = document.querySelector('.sensor02');

socket.on('sensor01', function(message){
    sensor01.innerHTML = parseInt(message);
    //var hue = 200 - (parseInt(message) * 5);
    //document.body.style.backgroundColor = 'hsl(' + hue + ', 30%, 25%)';
});

socket.on('sensor02', function(message){
    sensor02.innerHTML = parseInt(message);
});