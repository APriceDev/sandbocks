var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function(){
    console.log('board ready');
    var sensor= new five.Sensor({
        pin : 'A0',
        freq : 250
    });

    sensor.scale(0, 100).on('change', function(){
        var output = parseInt(this.value);
        console.log(output);

        // if(output >= 50){
        //     console.log('f00');
        // } else{
        //     console.log('bar');
        // }
    });
});

console.log('waitng for board to connect...');