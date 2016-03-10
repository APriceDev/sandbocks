var five = require("johnny-five");
var board, led;

board = new five.Board();

board.on("ready", function() {
  console.log("Board ready");

    // example one utilizing built in led (pin 13)
    /*
    led = new five.Led({
        pin : 13
    });

    led.strobe(1000);

    this.repl.inject({
      led: led
    });
    */

    // example two digital write wired led (pwm pin 9)
    /*
    var led = 9;

    this.pinMode(led, five.Pin.OUTPUT);

    this.digitalWrite(led, 1);

    this.repl.inject({
      x : this
    });
    */

    // example three digital write wired led w loop (pwm pin 9)
    /*
    var led = 9;
    var state = 0;
    var ms = 1500;

    this.pinMode(led, five.Pin.OUTPUT);

    this.loop(ms, function(){
      this.digitalWrite(led, (state ^=1));
    });

    this.repl.inject({
      x : this
    });
    */

    // example four analog write fade in/out wired led w loop (pwm pin 9)
    led = new five.Led({
      pin : 9
    });

    this.loop(1000, function(){

      led.fadeIn(500);

      this.wait(100, function(){
        led.fadeOut(500);
      });
    });

  });
console.log("Waiting for the device to connect...");
