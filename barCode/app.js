var barCodeGen= (function(){

    var w = window.innerWidth/2;

    var init = function(){

        for(var i = 0; i < w; i++){
            var r = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            var s = document.createElement("span");
            if(r > 50){
                s.style.backgroundColor = "rgba(" + [41,45,48,1].join(',') + ")";
            };

            document.getElementById("container").appendChild(s);
        };
    };

    return {
        init : init
    };

}());

(function(){
    barCodeGen.init();
}());