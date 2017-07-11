const five = require('johnny-five');
const board = new five.Board();
//var moment = require('moment');
//var title = moment().format('YYYYMMDD-HHmmss');
const fs = require('fs');
const outputFile = fs.openSync('data/'  + Date.now() + '.txt', 'w');

board.on('ready', function(){
    console.log('board ready');

    const tmp36 = new five.Thermometer({
        controller : 'TMP36',
        pin : 'A0',
        freq : 5000
    });

    // may not need the repl but good to have around
    board.repl.inject({
        tmp36 : tmp36
    });

    tmp36.on('data', function(){
        //let f = this.F.toFixed(2);
        //let timestamp = Date.now();
        let output = `${this.F.toFixed(2)} ${Date.now()},`;
        fs.writeSync(outputFile, output + '\r\n');
        console.log(output);
    });
});
console.log('waiting to connect...');