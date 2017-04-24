const canvas = document.querySelector('#range');
//const calibrate = document.querySelector('input[type="range"');
const calibrate = document.querySelector('#calibrate');
const cycle= document.querySelector('#cycle');
const ctx = canvas.getContext('2d');

let posX = 0;
let posY = 200;
let rate = 1;


    ctx.fillStyle ='rgba(0, 50, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

window.requestAnimationFrame(draw);

function draw(){
    //console.log(posX);

    ctx.fillStyle ='rgba(0, 50, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 175, 0, 0.65)';
    ctx.fillRect(posX, posY , 10, 10);

    posX += rate;
    if(posX >= canvas.width){ posX = 0}

    window.requestAnimationFrame(draw);
}

function yChange(){
    posY = this.value;
    //console.log(this.value);
}

function xChange(){
    rate = parseInt(this.value);
    console.log(this.value);
}

function logEvent(e){
    console.log(this.value);
}

calibrate.addEventListener('input', yChange);
cycle.addEventListener('input', xChange);