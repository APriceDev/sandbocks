const fs = require('fs');
const utilities = require('./modules/utilities');

//utilities.foo();

let file = 'data/' + process.argv[2];

fs.readFile(file, 'utf8', function(err, data){

    // removes trailing comma JSON.parse() does not allow trailing commas
   let trim = utilities.removeComma(data);
   //console.log(trim);

    // trimmed items into array
    let arr = utilities.itemsToArray(trim);
    //console.log(arr);

    // format items,  ready for JSON
    let format = utilities.format(arr);
    //console.log(format);

    // JSON parse
    let parsed = utilities.parsed(format);
    //console.log(parsed);

    // then display the data as needed
    const final = parsed.forEach(item => {
        const date = new Date(item.time)
        console.log(item.temp, date);
    });
});