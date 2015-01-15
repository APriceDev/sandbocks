var calculator = (function($){
"use strict"

var     currNum,
            lastNum = null,
            operator,
            operatorSet = false,
            equalSet =  false,
            frame,
            display,
            clearBtn;

    function init(){

        frame = document.getElementById("frame");
        display = document.getElementById("display");
        clearBtn = document.getElementById("clearBtn");
        clear();
        setUpEventListeners();
    };

        function setVal(val) {

            display.innerHTML = val;
        }

    function numberClick(n){

        if (operatorSet == true) {

            setVal(" ");
            operatorSet = false;
            console.log(currNum, operator, lastNum);

        }

            currNum = display.innerHTML += n.id;
            //display.innerHTML == "0" ?  (currNum = display.innerHTML += n.id) : (currNum = n.id );
            setVal(currNum);
            console.log(currNum, operator, lastNum);
    };

    function setOperator(n){

            if (n.id == "="){
                equalSet = true;
                calculate();
            }

            operatorSet = true;
            equalSet = false;
            operator = n.id;
             lastNum = currNum;
            console.log(currNum, operator, lastNum);
    };

    function router(e){

        var clicked = e.target;
        if (clicked.className == "btn num"){
           numberClick(clicked)
        }
        else if (clicked.className == "btn op"){
            setOperator(clicked);
        }
    };

    function add(x, y){

        console.log("add " + (x + y));
        return x + y;
    }

    function subtract(x, y){

        return x - y;
    }

    function multiply(x, y){

        return x * y;
    }

    function divide(x, y){

        return x / y;
    }

    function calculate(){
        var x = parseFloat(lastNum),
               y = parseFloat(currNum),
                    result = 0;
        switch(operator){
            case "+":
                result = add(x, y);
            break;
            case "-":
                result = subtract(x, y);
            break;
            case "*":
                result = multiply(x, y);
            break;
            case "/":
                result = divide(x, y);
            break;
        };
        console.log("result " + result + " operator " + operator);
         setVal(result);
         currNum = result;
    };

    function clear(){

        operatorSet = false;
        var el = document.getElementById("display").innerHTML = " ";
    };

    function setUpEventListeners(){

        frame.addEventListener("click", router);
        clearBtn.addEventListener("click", clear);
    };

    return {
                init : init
            }
}(jQuery));

(function(){
    calculator.init();
}());
