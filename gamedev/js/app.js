const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const port = 8000;

server.listen(port, function(){
    console.log(`${process.argv[1]} running on localhost: ${port}`);
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../breakout.html'));
});

app.use('/static', express.static('public'));