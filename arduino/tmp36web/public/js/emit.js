var socket = io();
var temperature = document.querySelector('.temperature');
var timestamp = document.querySelector('.timestamp');

socket.on('temp reading', function(message){
    temperature.innerHTML = parseInt(message) +'ºF';
    var hue = 200 - (parseInt(message) * 5);
    document.body.style.backgroundColor = 'hsl(' + hue + ', 30%, 25%)';
});

socket.on('timestamp', function(message){
    timestamp.innerHTML = message;
});