"use strict";

var keyAlpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

// vigenere table
var vigenereAlpha = [
	['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
	['b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a'],
	['c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b'],
	['d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c'],
	['e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d'],
	['f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e'],
	['g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f'],
	['h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g'],
	['i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h'],
	['j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i'],
	['k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j'],
	['l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k'],
	['m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l'],
	['n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m'],
	['o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n'],
	['p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o'],
	['q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'],
	['r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q'],
	['s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r'],
	['t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s'],
	['u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'],
	['v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u'],
	['w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v'],
	['x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w'],
	['y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x'],
	['z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'],
	['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
]

function getKey(str){ // generates key from random index of numbers, 0-25 based on length of the input string.
	
	var keyOut = document.getElementById("key-output"),
		min  = 0, 
		max = 25,
		keyStrLength = str.length,
		keyOutputStr ="",
		i;

	for (i=0; i<keyStrLength; i++){
			keyOutputStr += Math.floor(Math.random() * (max - min + 1) + min) + " ";
	}

	keyOut.innerHTML = keyOutputStr;
	return keyOutputStr;
}

function getCipher(str){ // generates cipher, binds to key

	var str = document.getElementById("msg").value.trim(),
	keyArray = getKey(str).split(" "),
	msgStrLen = str.length,
	msgCipher = document.getElementById("msg-output"),
	cipherOutputStr ="",
	i,j;

	for(i=0; i<msgStrLen; i++){
		var origStr = str.charAt(i).toLowerCase(),
		strIndex = keyAlpha.indexOf(origStr);

			for(j=0; j<26; j++){

				if(keyArray[i] == j){
					cipherOutputStr += vigenereAlpha[keyArray[i]][strIndex];
				}
			}
	}

	msgCipher.innerHTML = cipherOutputStr;
}

function deCipher(key,str){ // reverse logic to decipher
	var key = document.getElementById("key-input").value.trim(), // vertical value
	str = document.getElementById("cipher-input").value.trim(), // horizontal value, convert char to index to get horizontal value
	deKeyArray = key.split(" "),
	strLen = str.length,
	msgDeCipher = document.getElementById("demsg-output"),
	deCipherOutputStr ="",
	i,j;

	for(i=0; i<strLen; i++){
		var cipherStr = str.charAt(i).toLowerCase(),
			strIndex = vigenereAlpha[deKeyArray[i]].indexOf(cipherStr);

			//console.log(vigenereAlpha[0][strIndex]);
			deCipherOutputStr += vigenereAlpha[0][strIndex];
	}

	msgDeCipher.innerHTML = deCipherOutputStr;
}

var c = document.getElementById("cipherIt"),
	d = document.getElementById("deCipherIt");

c.addEventListener("click", getCipher, false);
d.addEventListener("click", deCipher, false);