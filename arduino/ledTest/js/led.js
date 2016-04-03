var five = require("johnny-five");
var board, led;

board = new five.Board();

board.on("ready", function() {
    console.log("Board ready");

    //led = new jfive.Led(10);

    led = new five.Led({
        pin : 10
    });

    led.strobe(1000);

    this.repl.inject({
      led: led
  });
});
console.log("Waiting for the device to connect...");
