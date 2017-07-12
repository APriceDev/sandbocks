const fs = require('fs');

let file = 'data/' + process.argv[2];

fs.readFile(file, 'utf8', function(err, data){

    // removes trailing comma JSON.parse() does not allow trailing commas
    const trim = data.replace(/[\s,]+$/g, '');
   //console.log(trim);

   // trimmed items into array
   const arr = trim.split(",").map(item => item.trim());
    //console.log(arr);

    // format items,  ready for JSON
    const format = arr.map(item => `{"temp" : ${item.split(" ")[0]}, "time" : ${item.split(" ")[1]}}`);
    //console.log(format);

    // JSON parse
    const dataArray = [];
    const result = format.forEach(item => dataArray.push(JSON.parse(item)));
    //console.log(dataArray);

    // then pass on the data where needed
    const final = dataArray.forEach(item => {
        const date = new Date(item.time)
        console.log(item.temp, date);
    });
});