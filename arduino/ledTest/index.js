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

    // Injecting object into the REPL allow access while the program is running.
    // Now you can interact directly with the led by typing in commands at the node REPL.
    // Type in led.stop() to stop the strobing, led.toggle() to toggle the led on and off, or led.strobe(500) to start the strobing again.

});
console.log("Waiting for the device to connect...");
