    // https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
    //http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

    var nb2 = (function($){
        "use strict"

        var audioCtx,
        destination,
        percent = " %",
        hertz = " hz",
        masterGain,
        masterVol,
        masterVolLevel = 0.25,
        masterVolumeState,

        oscOne,
        oscOneWaveType = "sine",
        oscOneGain,
        oscOneVol,
        oscOneVolLevel = 0.25,
        oscOneVolumeState,
        oscOneFrq,
        oscOneFrqLevel = 440,
        oscOneFrqState,
        oscOneWaveState,
        oscOneLpf,
        oscOneLpfFreqLevel = 10000,
        oscOneLpfFreq,
        oscOneLpfFreqState,
        oscOneCtrl,
        oscOneToggle = "stop",

        oscTwo,
        oscTwoWaveType = "sine",
        oscTwoGain,
        oscTwoVol,
        oscTwoVolLevel = 0.25,
        oscTwoVolumeState,
        oscTwoFrq,
        oscTwoFrqLevel = 330,
        oscTwoFrqState,
        oscTwoWaveState,
        oscTwoDistortion,
        oscTwoCtrl,
        oscTwoToggle = "stop";

 // jQuery UI   *******************************************************
        $(function($) {

            masterVol = $("#masterVol");

            oscOneVol = $("#oscOneVol");
            oscOneFrq = $("#oscOneFrq");
            oscOneLpfFreq = $("#oscOneLpfFreq");

            oscTwoVol = $("#oscTwoVol");
            oscTwoFrq = $("#oscTwoFrq");

            masterVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: masterVolLevel,
                slide: function(e, ui){
                    updateMasterGain(ui.value, this, masterVolumeState, percent);
                },
                change: function(e, ui){
                    updateMasterGain(ui.value, this, masterVolumeState, percent);
                }
            });

            //osc one
            oscOneVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscOneVolLevel,
                slide: function(e, ui){
                    updateOscOneGain(ui.value, this, oscOneVolumeState, percent);
                },
                change: function(e, ui){
                    updateOscOneGain(ui.value, this, oscOneVolumeState, percent);
                }
            });

            oscOneFrq.slider({
                //orientation: "vertical",
                min: 0,
                max: 5000,
                step: 1,
                value: oscOneFrqLevel,
                slide: function(e, ui){
                    updateOscOneFrq(ui.value, this, oscOneFrqState, hertz);
                },
                change: function(e, ui){
                    updateOscOneFrq(ui.value, this, oscOneFrqState, hertz);
                }
            });

            oscOneLpfFreq.slider({
                //orientation: "vertical",
                min: 0,
                max: 10000,
                step: 1,
                value: oscOneLpfFreqLevel,
                slide: function(e, ui){
                    updateOscOneLpfFreq(ui.value, this, oscOneLpfFreqState, hertz);
                },
                change: function(e, ui){
                    updateOscOneLpfFreq(ui.value, this, oscOneLpfFreqState, hertz);
                }
            });

            // osc two
            oscTwoVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscTwoVolLevel,
                slide: function(e, ui){
                    updateOscTwoGain(ui.value, this, oscTwoVolumeState, percent);
                },
                change: function(e, ui){
                    updateOscTwoGain(ui.value, this, oscTwoVolumeState, percent);
                }
            });

            oscTwoFrq.slider({
                //orientation: "vertical",
                min: 0,
                max: 5000,
                step: 1,
                value: oscTwoFrqLevel,
                slide: function(e, ui){
                    updateOscTwoFrq(ui.value, this, oscTwoFrqState, hertz);
                },
                change: function(e, ui){
                    updateOscTwoFrq(ui.value, this, oscTwoFrqState, hertz);
                }
            });
        });

// waveshaper for oscillator two  *******************************************************

    // function from MDN docs
    var makeDistortionCurve = function (amount) {
        var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;

        for ( ; i < n_samples; ++i ) {
            x = i * 2 / n_samples - 1;
            curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        };

       //console.log(curve);
        return curve;
    };

// oscillator one  *******************************************************
            var playOscOne = function(){

                // create params
                oscOne = audioCtx.createOscillator();
                oscOneGain = audioCtx.createGain();

                // assign values
                oscOne.type = oscOneWaveType;
                oscOne.frequency.value = oscOneFrqLevel;
                oscOneLpf = audioCtx.createBiquadFilter();
                oscOneLpf.type = "lowpass";
                console.log();

                // update values
                updateOscOneGain();
                updateOscOneFrq();
                updateOscOneLpfFreq();

                // buss
                masterGain.connect(destination);
                oscOneGain.connect(masterGain);
                oscOneLpf.connect(oscOneGain);
                oscOne.connect(oscOneLpf);

                // let 'er rip!
                oscOne.start(0);
                oscOneToggle = "start";

                //console.log(audioCtx.currentTime);
            };

            var stopOscOne = function(){
             oscOne.stop(0);
             oscOneToggle = "stop";
         };

        var updateOscOneGain = function(value, el, htmlObject, str){

            value === undefined ? oscOneVolLevel : oscOneVolLevel = value;

            if(oscOneGain){
                    oscOneGain.gain.value = oscOneVolLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = (parseInt(value * 100)) + str;
            }
        };

         var updateOscOneFrq = function(value, el, htmlObject, str){

            value === undefined ? oscOneFrqLevel : oscOneFrqLevel = value;

            if(oscOne){
                    oscOne.frequency.value = oscOneFrqLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = value + str;
            }
        };

         var updateOscOneLpfFreq = function(value, el, htmlObject, str){

            value === undefined ? oscOneLpfFreqLevel : oscOneLpfFreqLevel = value;

            if(oscOneLpf){
                    oscOneLpf.frequency.value = oscOneLpfFreqLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = value + str;
            }
        };

        var oscOneWaveUpdate = function(e){

            e === undefined ? oscOneWaveType : oscOneWaveType = e.target.title;
            if(oscOne){
                oscOne.type = oscOneWaveType;
            };
        };
 // oscillator two  *******************************************************
            var playOscTwo = function(){

                // create params
                oscTwo = audioCtx.createOscillator();
                oscTwoGain = audioCtx.createGain();
                oscTwoDistortion = audioCtx.createWaveShaper();

                // assign values
                oscTwo.type = oscTwoWaveType;
                oscTwo.frequency.value = oscTwoFrqLevel;
                oscTwoDistortion.curve = makeDistortionCurve(400);
                oscTwoDistortion.oversample = '4x';

                // update values
                updateOscTwoGain();
                updateOscTwoFrq();

                // buss
                masterGain.connect(destination);
                oscTwoGain.connect(masterGain);

                oscTwoDistortion.connect(oscTwoGain);
                oscTwo.connect(oscTwoDistortion);

                //oscTwo.connect(oscTwoGain);

                //let 'er rip!
                oscTwo.start(0);
                oscTwoToggle = "start";
            };

            var stopOscTwo= function(){
             oscTwo.stop(0);
             oscTwoToggle = "stop";
         };

        var updateOscTwoGain = function(value, el, htmlObject, str){

            value === undefined ? oscTwoVolLevel : oscTwoVolLevel = value;

            if(oscTwoGain){
                    oscTwoGain.gain.value = oscTwoVolLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = (parseInt(value * 100)) + str;
            }
        };

         var updateOscTwoFrq = function(value, el, htmlObject, str){

            value === undefined ? oscTwoFrqLevel : oscTwoFrqLevel = value;

            if(oscTwo){
                    oscTwo.frequency.value = oscTwoFrqLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = value + str;
            }
        };

        var oscTwoWaveUpdate = function(e){

            e === undefined ? oscTwoWaveType : oscTwoWaveType = e.target.title;
            if(oscTwo){
                oscTwo.type = oscTwoWaveType;
            };
        };

 // utilities  *******************************************************
        var updateMasterGain = function(value, el, htmlObject, str){

            value === undefined ? masterVolLevel : masterVolLevel = value;

            if(masterGain){
                    masterGain.gain.value = masterVolLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = (parseInt(value * 100)) + str;
            }
        };

         var toggleOsc = function(toggle, startFunc, cntrl, stopFunc){
            toggle !== "start" ? (startFunc(), cntrl.className = "toggle toggleOn") : (stopFunc(), cntrl.className =  "toggle");
        };

        var setupEventListeners = function(){

            oscOneCtrl.addEventListener("click", function(){
                toggleOsc(oscOneToggle, playOscOne, oscOneCtrl, stopOscOne);
            }, false);

            oscTwoCtrl.addEventListener("click", function(){
                toggleOsc(oscTwoToggle, playOscTwo, oscTwoCtrl, stopOscTwo);
            }, false);

            oscOneWaveState.addEventListener("click", oscOneWaveUpdate);

            oscTwoWaveState.addEventListener("click", oscTwoWaveUpdate);
        };

        var init = function(){

            masterVolumeState = document.getElementById("masterVolumeState");
            masterVolumeState.innerHTML = (parseInt(masterVolLevel * 100)) + percent;

            oscOneCtrl = document.getElementById("oscOneCtrl");
            oscOneVolumeState = document.getElementById("oscOneVolumeState");
            oscOneVolumeState.innerHTML = (parseInt(oscOneVolLevel * 100)) + percent;
            oscOneFrqState = document.getElementById("oscOneFrqState");
            oscOneFrqState.innerHTML = oscOneFrqLevel + hertz;
            oscOneWaveState = document.getElementById("oscOneWaveState");
            oscOneLpfFreqState = document.getElementById("oscOneLpfFreqState");
            oscOneLpfFreqState.innerHTML = oscOneLpfFreqLevel + hertz;

            oscTwoCtrl = document.getElementById("oscTwoCtrl");
            oscTwoVolumeState = document.getElementById("oscTwoVolumeState");
            oscTwoVolumeState.innerHTML = (parseInt(oscTwoVolLevel * 100)) + percent;
            oscTwoFrqState = document.getElementById("oscTwoFrqState");
            oscTwoFrqState.innerHTML = oscTwoFrqLevel + hertz;
            oscTwoWaveState = document.getElementById("oscTwoWaveState");

            audioCtx = new AudioContext();
            destination  = audioCtx.destination;
            masterGain = audioCtx.createGain();

            setupEventListeners();

            console.log("NoiseBox NB-2 ready ...");
        };

        return {
            init : init
        };

    }(jQuery));

    (function(){

       nb2.init();
   }());