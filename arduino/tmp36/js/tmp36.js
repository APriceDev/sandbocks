var five = require("johnny-five");
var board = new five.Board();
var moment = require("moment");
var title = moment().format("YYYYMMDD-HHmmss");
var fs = require("fs");
//var outputFile = fs.openSync("data/" + title + ".txt", "w");
var outputFile = fs.openSync("../data/" + title + ".txt", "w");

board.on("ready", function() {
  console.log("Board ready");

  var tmp36 = new five.Thermometer({
    controller: "TMP36",
    pin: "A0",
    freq: 5000
  });

  board.repl.inject({
    tmp36 : tmp36
  })

  tmp36.on("data", function() {

    var f = this.F.toFixed(2);
    var timeStamp = moment().format("MMDDHHmmss");
    //var output = timeStamp + " " + f + " °F";
    var output = "{\'time\' : " + timeStamp + ", \'temp\' : " + f + "}";
    fs.writeSync(outputFile, output + "\r\n");
    console.log(output);
  });

});
console.log("Waiting for device to connect...");