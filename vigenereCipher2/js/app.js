var vigenere = (function(){
    "use strict";

    var alpha = ["z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", ],
    zeta = [],
    counter = 0;

    var alphaBuilder = function(a){

        if(counter === a.length){

            console.log("done");
            return;
        } else{

            var x = a.shift();
            a.push(x);

            // makes shallow copy of init array
            var y = a.slice();
            zeta.push(y);

            counter++;
            console.log(a);
            return alphaBuilder(a);
        }
    };

// ********************************

    var init = function(){
        alphaBuilder(alpha);
    };



    return {
        init : init
    };

}());

(function(){

    vigenere.init();
}());