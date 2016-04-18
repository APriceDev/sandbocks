var five  = require('johnny-five');
var board = new five.Board();

board.on('ready', function(){
    console.log('board ready');

    var proximity = new five.Proximity({
        controller : "HCSR04",
        pin: 7,
        freq : 1000
    });

    proximity.on('data', function(){
        console.log('Proximity: ');
        console.log(' cm : ' + this.cm);
        console.log(' in : ' + this.in);
        if(this.in < 3){
            console.log("***** WARNING *****");
        }
        console.log('----------');
    });

    proximity.on('change', function(){
        console.log('+++ change +++');
    });

});
console.log('waiting for the device to connect...');