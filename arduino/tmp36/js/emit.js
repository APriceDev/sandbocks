   var socket = io(),
   temperature = document.querySelector(".temperature"),
   timestamp = document.querySelector(".timestamp");

   socket.on('temperature reading', function(message) {
      // Rounding down the decimal values and adding ºF
      temperature.innerHTML = parseInt(message) + "ºF";

      // Calculating the hue for the background color and changing it
      var hue = 200 - (parseInt(message) * 5);
      document.body.style.backgroundColor = "hsl(" + hue + ", 30%, 25%)";
    });

   socket.on('timestamp', function(message) {
    timestamp.innerHTML = message;
  });