module.exports = {
    removeComma : (data) => {
        return data.replace(/[\s,]+$/g, '');
    },
    itemsToArray : (data) => {
        return data.split(",").map(item => item.trim());
    },
    format : (data) => {
        return data.map(item => `{"temp" : ${item.split(" ")[0]}, "time" : ${item.split(" ")[1]}}`);
    },
    parsed : (data) => {
        const dataArray = [];
        data.forEach(item => dataArray.push(JSON.parse(item)));
        return dataArray;
    },
};

