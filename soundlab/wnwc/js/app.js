// white noise and white caps
// version: "0.9",

var wnwc = (function($) {
"use strict";

	var 	ctx,
		oscToggle,
		oscOne,
		oscTwo,
		lfo1,
		lfo1Gain,
		lfo2,
		lfo2Gain,
		lpf1,
		lpf2,
		panOne,
		panTwo,
		ms,
		destination;

	function init(){

		ms = document.getElementById("masterSwitch");

		ctx = new AudioContext();
		setupEventListeners();
	};

	function whiteNoise(source){
		var bufferSize = 5 * ctx.sampleRate,
		buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
		data = buffer.getChannelData(0);

		for (var i = 0; i < bufferSize; i++) {
			data[i] = Math.random();
		}
		source.buffer = buffer;
		source.loop = true;
	};

	function startOsc(){

		oscToggle = "start";
		destination = ctx.destination;

		oscOne = ctx.createBufferSource();
		whiteNoise(oscOne);
		//oscOneGain = oscOne.gain;

		oscTwo = ctx.createBufferSource();
		whiteNoise(oscTwo);

		lfo1 = ctx.createOscillator();
		lfo1.type = "sine";
		lfo1.frequency.value = 0.05;

		lfo1Gain = ctx.createGain();
		lfo1Gain.gain.value = 250;

		lfo2 = ctx.createOscillator();
		lfo2.type = "sine";
		lfo2.frequency.value = 0.07;

		lfo2Gain = ctx.createGain();
		lfo2Gain.gain.value = 300;

		panOne = ctx.createPanner(),
		panOne.panningModel = "equalpower";
		// masterPan.panningModel = "HRTF"; // default
		panOne.setPosition(0.5,0,0.5);

		panTwo = ctx.createPanner(),
		panTwo.panningModel = "equalpower";
		panTwo.setPosition(-0.6,0,0.5);


		lpf1 = ctx.createBiquadFilter();
		lpf1.type = "lowpass";
		//lpf1.frequency.value = 1000;

		lpf2 = ctx.createBiquadFilter();
		lpf2.type = "lowpass";

		// hpf = ctx.createBiquadFilter();
		// hpf.type = "highpass";

		lfo1.connect(lfo1Gain);
		lfo1Gain.connect(lpf1.frequency);

		lfo2.connect(lfo2Gain);
		lfo2Gain.connect(lpf2.frequency);

		oscOne.connect(panOne);
		panOne.connect(lpf1);

		oscTwo.connect(panTwo);
		panTwo.connect(lpf2);

		lpf1.connect(destination);
		lpf2.connect(destination);

		oscOne.start(0);
		oscTwo.start(0);
		lfo1.start(0);
		lfo2.start(0);
	};

	function stopOsc(){

		oscToggle = "stop";
		oscOne.stop(0);
		oscTwo.stop(0);
		lfo1.stop(0);
		lfo2.stop(0);
	};

	function toggleOsc(){

		oscToggle !== "start" ? startOsc() : stopOsc()
	};

	function setupEventListeners(){

		ms.addEventListener("click", toggleOsc);
	};

	return 	{
		init : init
	};

}(jQuery));

(function(){
	wnwc.init();
}());