const fs = require('fs');
const utilities = require('./modules/utilities');

let pathToFile = process.argv[2];

function getData(callback){
    fs.readFile(pathToFile, 'utf8', function(err, data){
        if(err) throw err;
        callback(data);
    });
};

function parseData(data){
    let trim, arr, format, parsed;

    trim = utilities.removeComma(data);
    arr = utilities.itemsToArray(trim);
    format = utilities.formatData(arr);
    parsed = utilities.parseData(format);
    utilities.displayData(parsed);
};

getData(parseData);