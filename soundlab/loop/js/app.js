// qnd ambience loop work around

(function(){

var ctx = new AudioContext(),
	source1,
	source2,
	play = document.getElementById("output"),
	stop = document.getElementById("input");

function getSound(source, url, loop) {

  var request = new XMLHttpRequest();
  request.open('GET', url , true);
  request.responseType = 'arraybuffer';

  request.onload = function() {

    var audioData = request.response;
    ctx.decodeAudioData(audioData, function(buffer) {

        source.buffer = buffer;
        source.loopStart = 0;
        source.loopEnd = 18;
        source.connect(ctx.destination);
        source.loop = loop;
      });
  }

  request.send();
}

function loadSound() {

  source1 = ctx.createBufferSource();
  source2 = ctx.createBufferSource();
  getSound(source1, "data/dayLoop.wav", true);
  //getSound(source2, "data/dayLoopB.wav", true);

  source1.start(0);
  source2.start(0);
}

function stopSound() {
   source1.stop(0);
   source2.stop(0);
 }

play.addEventListener('click', loadSound);
stop.addEventListener('click', stopSound);

}());