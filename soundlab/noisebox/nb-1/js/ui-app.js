
var nb1 = (function($) {
"use strict";
        var vol,
        fil,
        fq,
        rd;

    $(function($) {

                fq = $("#filterQ"),
                vol = $("#volume"),
                fil = $("#filter");
                rd = $("#radio");


                rd.buttonset({

                });

                fq.slider({
                    //orientation: "vertical",
                    min: 0,
                    max: 10,
                    step: 0.5,
                    value: 0,
                    slide: function(e, ui){

                    updateFilterQ(ui.value, this);
                    },

                    change: function(e, ui){

                    updateFilterQ(ui.value, this);
                    }
                });

                   vol.knob({

                        angleOffset : -125,
                        angleArc : 250,
                        fgColor : "rgba(41,45,48,1)",
                        width: 100,

                        change : function (value) {
                            getVolume(value);
                        },

                        draw : function () {
                            // "tron" case
                            if(this.$.data('skin') == 'tron') {
                                this.cursorExt = 0.3;
                                var a = this.arc(this.cv)  // Arc
                                    , pa                   // Previous arc
                                    , r = 1;
                                this.g.lineWidth = this.lineWidth;
                                if (this.o.displayPrevious) {
                                    pa = this.arc(this.v);
                                    this.g.beginPath();
                                    this.g.strokeStyle = this.pColor;
                                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                                    this.g.stroke();
                                }
                                this.g.beginPath();
                                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                                this.g.stroke();
                                this.g.lineWidth = 1;
                                this.g.beginPath();
                                this.g.strokeStyle = this.o.fgColor;
                                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                                this.g.stroke();
                                return false;
                            }
                        }
                    });

                   fil.knob({

                        angleOffset : -125,
                        angleArc : 250,
                        fgColor : "rgba(41,45,48,1)",
                        width: 100,

                        change : function (value) {
                            getFilter(value);
                        },
                        draw : function () {
                            // "tron" case
                            if(this.$.data('skin') == 'tron') {
                                this.cursorExt = 0.3;
                                var a = this.arc(this.cv)  // Arc
                                    , pa                   // Previous arc
                                    , r = 1;
                                this.g.lineWidth = this.lineWidth;
                                if (this.o.displayPrevious) {
                                    pa = this.arc(this.v);
                                    this.g.beginPath();
                                    this.g.strokeStyle = this.pColor;
                                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                                    this.g.stroke();
                                }
                                this.g.beginPath();
                                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                                this.g.stroke();
                                this.g.lineWidth = 1;
                                this.g.beginPath();
                                this.g.strokeStyle = this.o.fgColor;
                                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                                this.g.stroke();
                                return false;
                            }
                        }
                    });
    });

    function init(){
        vol = document.getElementById("volume");
        setupEventListeners();
    };

    function getFilter(value){
        console.log("filter " + parseInt(value)/100);
    };

    function getVolume(value){
        console.log("volume " + parseInt(value)/100);
    };

    function updateFilterQ(value){
        console.log("filterQ " + value);
    };

    function setupEventListeners(){

       // vol.addEventListener("mousedown", getVolume);
    };

    return  {
        init : init
    };

}(jQuery));

(function(){
    nb1.init();
}());




/*
    $(function($) {
                    $(".knob").knob({
                        change : function (value) {
                            //console.log("change : " + parseInt(value)/100);
                            getVolume(value);
                        },
                        release : function (value) {
                            //console.log(this.$.attr('value'));
                            //console.log("release : " + value);
                        },
                        cancel : function () {
                            console.log("cancel : ", this);
                        },
                        //format : function (value) {
                        //   return value + '%';
                        //},
                        draw : function () {
                            // "tron" case
                            if(this.$.data('skin') == 'tron') {
                                this.cursorExt = 0.3;
                                var a = this.arc(this.cv)  // Arc
                                    , pa                   // Previous arc
                                    , r = 1;
                                this.g.lineWidth = this.lineWidth;
                                if (this.o.displayPrevious) {
                                    pa = this.arc(this.v);
                                    this.g.beginPath();
                                    this.g.strokeStyle = this.pColor;
                                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                                    this.g.stroke();
                                }
                                this.g.beginPath();
                                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                                this.g.stroke();
                                this.g.lineWidth = 1;
                                this.g.beginPath();
                                this.g.strokeStyle = this.o.fgColor;
                                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                                this.g.stroke();
                                return false;
                            }
                        }
                    });
    });


*/