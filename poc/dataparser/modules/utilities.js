module.exports = {
    // removes trailing comma JSON.parse() does not allow trailing commas
    removeComma : (data) => {
        return data.replace(/[\s,]+$/g, '');
    },
    // trimmed items into array
    itemsToArray : (data) => {
        return data.split(",").map(item => item.trim());
    },
    // format items,  ready for JSON
    formatData : (data) => {
        return data.map(item => `{"temp" : ${item.split(" ")[0]}, "time" : ${item.split(" ")[1]}}`);
    },
    // JSON parse
    parseData : (data) => {
        const dataArray = [];
        data.forEach(item => dataArray.push(JSON.parse(item)));
        return dataArray;
    },
    // display the data in format as needed
    displayData : (data) => {
        data.forEach(item => {
            const date = new Date(item.time)
            console.log(item.temp, date);
        });
    }
};