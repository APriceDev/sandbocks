//http://javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/
module.exports = {
    datum : "",
    // removes \r\n + trailing comma JSON.parse() does not allow trailing commas
    removeGunk : function(data){
        this.datum  = data.replace(/\r?\n|\r/g, '').replace(/[\s,]+$/g, '');
        return this;
    },
    // trim items into array
    itemsToArray : function(){
        if(this.datum){
            this.datum = this.datum.split(",").map(item => item.trim());
        }
        return this;
    },
    // format items,  ready for JSON
    formatData : function() {
        if(this.datum){
            this.datum = this.datum.map(item => `{"temp" : ${item.split(" ")[0]}, "time" : ${item.split(" ")[1]}}`);
        }
        return this;
    },
    // JSON parse
    parseData : function(){
        if(this.datum){
            const dataArray = [];
            this.datum.forEach(item => dataArray.push(JSON.parse(item)));
            this.datum = dataArray;
        }
        return this;
    },
    // display the data in format as needed
    // displayData : function(data){
    //     data.forEach(item => {
    //         const date = new Date(item.time)
    //         console.log(item.temp, date);
    //     });
    // }
    displayDatum : function(){
        console.log(this.datum);
    }
};