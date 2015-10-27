    var nb2 = (function($){
        "use strict"

        var audioCtx,
        destination,
        masterGain,
        masterVol,
        masterVolLevel = 0.25,
        masterVolumeState,

        oscOne,
        oscOneGain,
        oscOneVol,
        oscOneVolLevel = 0.25,
        oscOneVolumeState,
        oscOneCtrl,
        oscOneToggle = "stop",

        oscTwo,
        oscTwoGain,
        oscTwoVol,
        oscTwoVolLevel = 0.25,
        oscTwoVolumeState,
        oscTwoCtrl,
        oscTwoToggle = "stop";

 // jQuery UI   *******************************************************
        $(function($) {

            masterVol = $("#masterVol");
            oscOneVol = $("#oscOneVol");
            oscTwoVol = $("#oscTwoVol");

            masterVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: masterVolLevel,
                slide: function(e, ui){
                    updateGain(ui.value, this, masterVolLevel, masterGain, masterVolumeState);
                },
                change: function(e, ui){
                    updateGain(ui.value, this, masterVolLevel, masterGain, masterVolumeState);
                }
            });

            oscOneVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscOneVolLevel,
                slide: function(e, ui){
                    updateGain(ui.value, this, oscOneVolLevel, oscOneGain, oscOneVolumeState);
                },
                change: function(e, ui){
                    updateGain(ui.value, this, oscOneVolLevel, oscOneGain, oscOneVolumeState);
                }
            });

            oscTwoVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscTwoVolLevel,
                slide: function(e, ui){
                    updateGain(ui.value, this, oscTwoVolLevel, oscTwoGain, oscTwoVolumeState);
                },
                change: function(e, ui){
                    updateGain(ui.value, this, oscTwoVolLevel, oscTwoGain, oscTwoVolumeState);
                }
            });

        });

// oscillator one  *******************************************************

            var playOscOne = function(){

                oscOne = audioCtx.createOscillator();
                oscOneGain = audioCtx.createGain();

                updateGain();

                masterGain.connect(destination);
                oscOneGain.connect(masterGain);
                oscOne.connect(oscOneGain);

                oscOne.start(0);

                oscOneToggle = "start";
            };

            var stopOscOne = function(){
             oscOne.stop(0);
             oscOneToggle = "stop";
         };

 // oscillator two  *******************************************************

            var playOscTwo = function(){

                oscTwo = audioCtx.createOscillator();
                oscTwo.frequency.value = 330;
                oscTwoGain = audioCtx.createGain();

                updateGain();

                masterGain.connect(destination);
                oscTwoGain.connect(masterGain);
                oscTwo.connect(oscTwoGain);
                oscTwo.start(0);

                oscTwoToggle = "start";
            };

            var stopOscTwo= function(){
             oscTwo.stop(0);
             oscTwoToggle = "stop";
         };

        var updateGain = function(value, el, level, gainObject, htmlObject){

            value === undefined ? level : level = value;

            if(gainObject){
                gainObject.gain.value = level;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = " " + (parseInt(value * 100)) + "%";
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
        };

        var init = function(){

            masterVolumeState = document.getElementById("masterVolumeState");
            masterVolumeState.innerHTML = " 25%";

            oscOneCtrl = document.getElementById("oscOneCtrl");
            oscOneVolumeState = document.getElementById("oscOneVolumeState");
            oscOneVolumeState.innerHTML = " 25%";

            oscTwoCtrl = document.getElementById("oscTwoCtrl");
            oscTwoVolumeState = document.getElementById("oscTwoVolumeState");
            oscTwoVolumeState.innerHTML = " 25%";

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