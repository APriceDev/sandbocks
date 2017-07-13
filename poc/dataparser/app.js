
const fs = require('fs');
const utilities = require('./modules/utilities');

let file = 'data/' + process.argv[2];

fs.readFile(file, 'utf8', function(err, data){

    if(err) return  console.log(err);

   let trim = utilities.removeComma(data);
   //console.log(trim);

    let arr = utilities.itemsToArray(trim);
    //console.log(arr);

    let format = utilities.formatData(arr);
    //console.log(format);

    let parsed = utilities.parseData(format);
    //console.log(parsed);

    // then display the data as needed
    const final = parsed.forEach(item => {
        const date = new Date(item.time)
        console.log(item.temp, date);
    });
});