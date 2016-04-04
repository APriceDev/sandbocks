var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function(){
    console.log("board ready");
    var sensor = new five.Sensor({
        pin : "A0",
        freq : 250
    });

    sensor.scale(0, 100).on("change", function(){

        var adc = parseInt(this.value);
        console.log(adc);

        if (adc >= 50) {
            console.log("foo");
        } else{
            console.log("bar");
        }
    });
});
console.log("Waiting for board to connect...");