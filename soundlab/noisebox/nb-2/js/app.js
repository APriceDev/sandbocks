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

                    updateMasterGain(ui.value, this);
                },

                change: function(e, ui){

                    updateMasterGain(ui.value, this);
                }
            });

            oscOneVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscOneVolLevel,
                slide: function(e, ui){

                    updateOscOneGain(ui.value, this);
                },

                change: function(e, ui){

                    updateOscOneGain(ui.value, this);
                }
            });

            oscTwoVol.slider({
                //orientation: "vertical",
                min: 0,
                max: 1.01,
                step: 0.01,
                value: oscTwoVolLevel,
                slide: function(e, ui){

                    updateOscTwoGain(ui.value, this);
                },

                change: function(e, ui){

                    updateOscTwoGain(ui.value, this);
                }
            });

        });


        /******
            oscillator one
            ******/
            var playOscOne = function(){

                oscOne = audioCtx.createOscillator();
                oscOneGain = audioCtx.createGain();

                updateMasterGain();
                updateOscOneGain();

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

         var updateOscOneGain = function(value, el){
            value === undefined ? oscOneVolLevel : oscOneVolLevel = value;
            if (oscOneGain){
             oscOneGain.gain.value = oscOneVolLevel;
         }

         if (el !== undefined){
            oscOneVolumeState.innerHTML = " " + (parseInt(value*100)) + "%";
        }

    };

    var toggleOscOne = function(){

        oscOneToggle !== "start" ? (playOscOne(), oscOneCtrl.className = "toggle toggleOn") : (stopOscOne(), oscOneCtrl.className =  "toggle");
    };

        /*****
            oscillator two
            ******/
            var playOscTwo = function(){

                oscTwo = audioCtx.createOscillator();
                oscTwo.frequency.value = 330;
                oscTwoGain = audioCtx.createGain();

                updateMasterGain();
                updateOscTwoGain();

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

         var updateOscTwoGain = function(value, el){
            value === undefined ? oscTwoVolLevel : oscTwoVolLevel = value;
            if (oscTwoGain){
             oscTwoGain.gain.value = oscTwoVolLevel;
         }

         if (el !== undefined){
            oscTwoVolumeState.innerHTML = " " + (parseInt(value*100)) + "%";
        }
    };

    var toggleOscTwo = function(){

        oscTwoToggle !== "start" ? (playOscTwo(), oscTwoCtrl.className = "toggle toggleOn") : (stopOscTwo(), oscTwoCtrl.className =  "toggle");
    };


    var updateMasterGain = function(value, el){

        value === undefined ? masterVolLevel: masterVolLevel = value;
        if (masterGain){
         masterGain.gain.value = masterVolLevel;
     }

     if (el !== undefined){
        masterVolumeState.innerHTML = " " + (parseInt(value*100)) + "%";
    }


};

var setupEventListeners = function(){
    oscOneCtrl.addEventListener("click", toggleOscOne);
    oscTwoCtrl.addEventListener("click", toggleOscTwo);
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