
var fs = require("fs");

var file = "../data/" + process.argv[2];

fs.readFile(file, "utf8", function(err, data){
    //console.log(data);

    var arr = data.split(/\r?\n/);

    // var arr = data.split(/\r?\n/).reduce(function(m,i){
    //     var s = i.split(':');
    //     m[s.shift()] = s.join(':');
    //     return m;
    // }, {});

    for(i in arr){
        if(arr[i] != ""){
            console.log(JSON.stringify(arr[i]).replace(/\\/g,""));
        }
    }

});