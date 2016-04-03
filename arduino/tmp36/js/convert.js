
var fs = require("fs");

var file = "../data/" + process.argv[2];
var outputFile = fs.openSync("../data/" + process.argv[2] + ".json", "w");

fs.readFile(file, "utf8", function(err, data){
    //console.log(data);

    var arr = data.split(/\r?\n/);

    arr.pop();
    //console.log(arr);

    fs.writeSync(outputFile, "{ \"data\" : [");
    fs.writeSync(outputFile, arr);

    // for(i in arr){
    //         //console.log(JSON.stringify(arr[i]).replace(/\\/g,""));
    //         //var output = JSON.stringify(arr[i]).replace(/\\/g,"");
    //         var output = arr[i];
    //         fs.writeSync(outputFile, output + "," + "\r\n");
    //     }

         fs.writeSync(outputFile, "]}");
    });