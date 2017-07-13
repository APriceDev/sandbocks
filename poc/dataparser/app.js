const fs = require('fs');
const utilities = require('./modules/utilities');

let pathToFile = process.argv[2];

function getData(callback){
    let trim, arr, format, parsed;
    fs.readFile(pathToFile, 'utf8', function(err, data){
        if(err) throw err;
        trim = utilities.removeComma(data);
        arr = utilities.itemsToArray(trim);
        format = utilities.formatData(arr);
        parsed = utilities.parseData(format);
        callback(parsed);
    });
};

// display the data in format as needed
function displayData(data){
    data.forEach(item => {
        const date = new Date(item.time)
        console.log(item.temp, date);
    });
};

getData(displayData);