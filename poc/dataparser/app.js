const fs = require('fs');
const utilities = require('./modules/utilities');
const pathToFile = process.argv[2];

getData(parseData);

function getData(callback){
    fs.readFile(pathToFile, 'utf8', function(err, data){
        if(err) throw err;
        callback(data);
    });
};

function parseData(data){
    utilities.removeGunk(data)
        .itemsToArray()
        .formatData()
        .parseData()
        .displayDatum();
};