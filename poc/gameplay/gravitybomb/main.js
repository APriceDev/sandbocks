const canvas = document.querySelector('#range');
const ctx = canvas.getContext('2d');
//const calibrate = document.querySelector('input[type="range"]');
const calibrate = document.querySelector('#calibrate');
const cycle = document.querySelector('#cycle');

function Blip(x = 0, y = 0, rate = 0){
    this.posX = x;
    this.posY = y;
    this.rate = rate;
    this.update = function(){this.posX += this.rate};
}
Blip.prototype.fillStyle = function(color){return ctx.fillStyle = color};
Blip.prototype.fillRect = function(width, height){return ctx.fillRect(this.posX, this.posY, width, height)};

const dash = new Blip(0, 200);
function yPosition(){dash.posY = parseInt(this.value)};
function xPosition(){dash.rate = parseInt(this.value)};

ctx.fillStyle ='rgba(0, 50, 0, 1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function draw(){
    ctx.fillStyle ='rgba(0, 50, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dash.fillStyle('rgba(0, 175, 0, 0.65)');
    dash.fillRect(10, 10);
    dash.update();
    if(dash.posX >= canvas.width){ dash.posX = 0};

    requestAnimationFrame(draw);
}

draw();

calibrate.addEventListener('input', yPosition);
cycle.addEventListener('input',  xPosition);