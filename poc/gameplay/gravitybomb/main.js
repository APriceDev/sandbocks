const canvas = document.querySelector('#range');
const ctx = canvas.getContext('2d');
//const calibrate = document.querySelector('input[type="range"]');
const calibrate = document.querySelector('#calibrate');
const cycle = document.querySelector('#cycle');

// convert dashboard props to blip constructor
const dashboard = {
    posX : 0,
    posY : 200,
    rate : 1
}
let {posX, posY, rate} = dashboard;

ctx.fillStyle ='rgba(0, 50, 0, 1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

window.requestAnimationFrame(draw);

function draw(){
    ctx.fillStyle ='rgba(0, 50, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // convert to blip constructor
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
    //console.log(this.value);
}

// function logEvent(e){
//     console.log(e);
// }

calibrate.addEventListener('input', yChange);
cycle.addEventListener('input', xChange);