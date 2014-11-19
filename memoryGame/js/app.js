// jQuery wrapper in case I decide use it
$(function(){

	//var gameState = {};
	var total = document.getElementById("total"),
		match = document.getElementById("match"),
		attempts = document.getElementById("attempts");

	// randomize background color on page load just because
	function getRandomColor() {

	    var hex = "0123456789ABCDEF".split(""),
	    i,
	    color = "#";

	    for (i = 0; i<6; i++) {
	        color += hex[Math.round(Math.random() * 15)];
	    }
	    return color;
	}

	// initialize game on reset/page load
	function reset(){

		sessionStorage.clear();
		total.innerHTML = attempts.innerHTML = match.innerHTML = "";

		var arr = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"],
		arrLength = arr.length,
		i,t,x,
		el = document.getElementsByTagName("body")[0],
		randomColor = getRandomColor();

		el.style.backgroundColor = randomColor;

  		while (arrLength) { // while there remain letters to shuffle

    		i = Math.floor(Math.random() * arrLength--); // pick a remaining element

    		// and swap it with the current element
    		t = arr[arrLength];
    		arr[arrLength] = arr[i];
    		arr[i] = t;
  		}
  		
  		for(x=0; x < arr.length; x++){ // insert shuffled letters into game board

  			var tile = document.getElementById("tile-"+x);
  			tile.className="game-style tile";
			tile.innerHTML = arr[x];
  		}
	}

	//calls reset on page load
	reset();

	// reset button to initialize game
	var btn = document.getElementById("btn-reset");
		btn.addEventListener("click", reset, false);

	// tile constructor
	function Tile(id,str){

		this.id = id;
		this.str = str;
		this.flip = flip;

		var el = document.getElementById(this.id);

		function flip(){
			el.className = el.className + " show";
		}
		// add event listener to constructor
	}

// Tile.prototype.flip = function(){
//	alert(this.val);
//}

	function clickTile(e){

	    var target = e.target;

	    if (target.id !== "game-board"){
	    	var x = target.id,
	    	y = target.innerHTML,
	    	z = new Tile(x,y);
			
			z.flip(x,y);

			if(!sessionStorage.getItem("id")){ // first click

				sessionStorage.setItem("id",x);
				sessionStorage.setItem("val",y);
			}
			else{								// second click
				if (x !== sessionStorage.getItem("id")){
					//console.log(x,sessionStorage.getItem("id"));
					if(y === sessionStorage.getItem("val")) { //match

						var el1 = document.getElementById(x),
						el2 = document.getElementById(sessionStorage.getItem("id"));

						//match css class
						el1.className = el2.className = el2.className + " win";
						
						var timeoutMatch = window.setTimeout(matchOut, 1000);
						sessionStorage.matchCount = sessionStorage.matchCount ? Number(sessionStorage.matchCount)+1 : 1;

						function matchOut(){

							el1.className = el2.className += " match";

							sessionStorage.removeItem("id");
							sessionStorage.removeItem("val");
						}
					}
					else{ // no match

						var el1 = document.getElementById(x),
						el2 = document.getElementById(sessionStorage.getItem("id"));

						//no match css class
						el1.className = el2.className += " fail";

						var timeoutNoMatch = window.setTimeout(noMatchOut, 1000);
						
						function noMatchOut(){

							el1.className = el2.className = "game-style tile";

							sessionStorage.removeItem("id");
							sessionStorage.removeItem("val");
						}
					} 
						sessionStorage.clickCount = sessionStorage.clickCount ? Number(sessionStorage.clickCount)+1 : 1;
						sessionStorage.total = ((sessionStorage.matchCount/sessionStorage.clickCount)*100).toFixed(2);

						//post score and stats
						match.innerHTML  = (sessionStorage.matchCount === undefined) ? 0 : sessionStorage.matchCount;
						attempts.innerHTML = sessionStorage.clickCount;
						total.innerHTML =  !isNaN(sessionStorage.total) ? sessionStorage.total+"%" : "00.00%";
				}
			}
		}
	}

	var g = document.getElementById("game-board");
		g.addEventListener("click", clickTile, false);
});//end wrapper