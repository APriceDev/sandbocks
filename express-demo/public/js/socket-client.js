var socket = io.connect();

socket.on("outbound", function(data){
    console.log(data);

    socket.emit("inbound", "socket-client.js");
});