    var nb2 = (function($){
        "use strict"

        var audioCtx,
        destination,
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
        oscTwoCtrl,
        oscTwoToggle = "stop";

 // jQuery UI   *******************************************************
        $(function($) {

            masterVol = $("#masterVol");

            oscOneVol = $("#oscOneVol");
            oscOneFrq = $("#oscOneFrq");

            oscTwoVol = $("#oscTwoVol");
            oscTwoFrq = $("#oscTwoFrq");

            masterVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: masterVolLevel,
                slide: function(e, ui){
                    updateMasterGain(ui.value, this, masterVolumeState);
                },
                change: function(e, ui){
                    updateMasterGain(ui.value, this, masterVolumeState);
                }
            });

            oscOneVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscOneVolLevel,
                slide: function(e, ui){
                    updateOscOneGain(ui.value, this, oscOneVolumeState);
                },
                change: function(e, ui){
                    updateOscOneGain(ui.value, this, oscOneVolumeState);
                }
            });

            oscOneFrq.slider({
                //orientation: "vertical",
                min: 10,
                max: 3000,
                step: 1,
                value: oscOneFrqLevel,
                slide: function(e, ui){
                    updateOscOneFrq(ui.value, this, oscOneFrqState);
                },
                change: function(e, ui){
                    updateOscOneFrq(ui.value, this, oscOneFrqState);
                }
            });

            oscTwoVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscTwoVolLevel,
                slide: function(e, ui){
                    updateOscTwoGain(ui.value, this, oscTwoVolumeState);
                },
                change: function(e, ui){
                    updateOscTwoGain(ui.value, this, oscTwoVolumeState);
                }
            });

            oscTwoFrq.slider({
                //orientation: "vertical",
                min: 10,
                max: 3000,
                step: 1,
                value: oscTwoFrqLevel,
                slide: function(e, ui){
                    updateOscTwoFrq(ui.value, this, oscTwoFrqState);
                },
                change: function(e, ui){
                    updateOscTwoFrq(ui.value, this, oscTwoFrqState);
                }
            });
        });

// oscillator one  *******************************************************

            var playOscOne = function(){

                // create params
                oscOne = audioCtx.createOscillator();
                oscOneGain = audioCtx.createGain();

                // assign values
                oscOne.type = oscOneWaveType;
                oscOne.frequency.value = oscOneFrqLevel;

                // update values
                updateOscOneGain();
                updateOscOneFrq();

                // buss
                masterGain.connect(destination);
                oscOneGain.connect(masterGain);
                oscOne.connect(oscOneGain);

                // let 'er rip!
                oscOne.start(0);
                oscOneToggle = "start";
            };

            var stopOscOne = function(){
             oscOne.stop(0);
             oscOneToggle = "stop";
         };

        var updateOscOneGain = function(value, el, htmlObject){

            value === undefined ? oscOneVolLevel : oscOneVolLevel = value;

            if(oscOneGain){
                    oscOneGain.gain.value = oscOneVolLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = " " + (parseInt(value * 100)) + "%";
            }
        };

         var updateOscOneFrq = function(value, el, htmlObject){

            value === undefined ? oscOneFrqLevel : oscOneFrqLevel = value;

            if(oscOne){
                    oscOne.frequency.value = oscOneFrqLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = " " + value + " hz";
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

                // assign values
                oscTwo.type = oscTwoWaveType;
                oscTwo.frequency.value = oscTwoFrqLevel;

                // update values
                updateOscTwoGain();
                updateOscTwoFrq();

                // buss
                masterGain.connect(destination);
                oscTwoGain.connect(masterGain);
                oscTwo.connect(oscTwoGain);

                //let 'er rip!
                oscTwo.start(0);
                oscTwoToggle = "start";
            };

            var stopOscTwo= function(){
             oscTwo.stop(0);
             oscTwoToggle = "stop";
         };

        var updateOscTwoGain = function(value, el, htmlObject){

            value === undefined ? oscTwoVolLevel : oscTwoVolLevel = value;

            if(oscTwoGain){
                    oscTwoGain.gain.value = oscTwoVolLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = " " + (parseInt(value * 100)) + "%";
            }
        };

         var updateOscTwoFrq = function(value, el, htmlObject){

            value === undefined ? oscTwoFrqLevel : oscTwoFrqLevel = value;

            if(oscTwo){
                    oscTwo.frequency.value = oscTwoFrqLevel;
            }

            if(el !== undefined){
                htmlObject.firstChild.nodeValue = " " + value + " hz";
            }
        };

        var oscTwoWaveUpdate = function(e){

            e === undefined ? oscTwoWaveType : oscTwoWaveType = e.target.title;
            if(oscTwo){
                oscTwo.type = oscTwoWaveType;
            };
        };

 // utilities  *******************************************************

        var updateMasterGain = function(value, el, htmlObject){

            value === undefined ? masterVolLevel : masterVolLevel = value;

            if(masterGain){
                    masterGain.gain.value = masterVolLevel;
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

            oscOneWaveState.addEventListener("click", oscOneWaveUpdate);

            oscTwoWaveState.addEventListener("click", oscTwoWaveUpdate);
        };

        var init = function(){

            masterVolumeState = document.getElementById("masterVolumeState");
            masterVolumeState.innerHTML = " 25%";

            oscOneCtrl = document.getElementById("oscOneCtrl");
            oscOneVolumeState = document.getElementById("oscOneVolumeState");
            oscOneVolumeState.innerHTML = " 25%";
            oscOneFrqState = document.getElementById("oscOneFrqState");
            oscOneFrqState.innerHTML = " 440 hz";
            oscOneWaveState = document.getElementById("oscOneWaveState");

            oscTwoCtrl = document.getElementById("oscTwoCtrl");
            oscTwoVolumeState = document.getElementById("oscTwoVolumeState");
            oscTwoVolumeState.innerHTML = " 25%";
            oscTwoFrqState = document.getElementById("oscTwoFrqState");
            oscTwoFrqState.innerHTML = " 330 hz";
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