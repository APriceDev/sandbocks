
var fs = require("fs");

var file = "../data/" + process.argv[2];

fs.readFile(file, "utf8", function(err, data){
    //console.log(data);

    var arr = data.split(/\r?\n/);

    for(i in arr){
        console.log(JSON.stringify(arr[i]));
    }

});