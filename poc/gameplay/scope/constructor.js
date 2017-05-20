function Circle(x,y,rad,color) {
    var _this = this;

    // constructor
    (function() {
        _this.x = x || null;
        _this.y = y || null;
        _this.radius = rad || null;
        _this.color = color || null;
    })();

    this.draw = function(ctx) {
        if(!_this.x || !_this.y || _this.radius || _this.color) {
            console.error('Circle requires an x, y, radius and color');
            return;
        }
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = _this.color;
        ctx.fill();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var circles = [];
var colors = ['#A6A938', '#789E35', '#8B2E5F', '#5A2971'];

var radius = 5;

var i = 0;
for(var y = 0; y < 10; y++) {
  for(var x = 0; x < 21; x++) {
    var c = new Circle(x*24, 10+y*21, radius, colors[i]);
    circles.push(c);
    i = (i == colors.length-1) ? 0 : i+1;
  }
}

// Circle object
function Circle(x,y,rad,color) {
    var _this = this;

    // constructor
    (function() {
        _this.x = x || null;
        _this.y = y || null;
        _this.radius = rad || null;
        _this.color = color || null;
    })();

   this.update = function() {
     _this.x += 0.5;
     _this.y += 0.5;
     if(_this.x > 496+_this.radius) _this.x = 0-_this.radius;
     if(_this.y > 200+_this.radius) _this.y = 0-_this.radius;
   }

    this.draw = function(ctx) {
        if(!_this.x || !_this.y || !_this.radius || !_this.color) {
            console.error('Circle requires an x, y, radius and color');
            return;
        }
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = _this.color;
        ctx.fill();
    };
}

// animation loop
function loop() {
  ctx.clearRect(0,0,500,200);
  for(var i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].draw(ctx);
  }
  requestAnimationFrame(loop);
}

// start the loop
loop();

//////////////////////////////////////////////////////////////////////////////////////////

CSS  JS  Result
Edit on
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var circles = [];
var colors = ['#A6A938', '#789E35', '#8B2E5F', '#5A2971'];
var centerX = canvas.width/2;
var centerY = canvas.height/2;
var innerRadius = 20;

var radius = 5;

for(var i = 0; i < 200; i++) {
  var p = Math.random();
  var x = centerX + innerRadius * Math.cos(2 * Math.PI * p);
  var y = centerY + innerRadius * Math.sin(2 * Math.PI * p);
  var circle = new Circle(x,y,radius,colors[Math.floor(i%4)]);
  var r = innerRadius+20+Math.random()*80;
  circle.innerX = x;
  circle.outerX = centerX + r * Math.cos(2 * Math.PI * p);
  circle.innerY = y;
  circle.outerY = centerY + r * Math.sin(2 * Math.PI * p);
  circles.push(circle);

}

// Circle object
function Circle(x,y,rad,color) {
    var _this = this;

    // constructor
    (function() {
        _this.x = x || null;
        _this.y = y || null;
        _this.radius = rad || null;
        _this.color = color || null;
    })();


    this.draw = function(ctx) {
        if(!_this.x || !_this.y || !_this.radius || !_this.color) {
            console.error('Circle requires an x, y, radius and color');
            return;
        }
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = _this.color;
        ctx.fill();
    };
}

// animation loop
function loop() {
  ctx.clearRect(0,0,500,200);
  for(var i = 0; i < circles.length; i++) {
    circles[i].draw(ctx);
  }
  requestAnimationFrame(loop);
}

// start the loop
loop();

// Tween the circles, I'm using GSAP TweenLite library here
for(var i = 0; i < circles.length; i++) {
  tweenCircle(circles[i]);
}

function tweenCircle(c) {
  TweenLite.to(c, 0.5+Math.random(), {x: c.outerX, y: c.outerY, ease: Cubic.easeInOut, onComplete: function() {
    TweenLite.to(c, 0.5+Math.random(), {x: c.innerX, y: c.innerY, ease: Cubic.easeInOut, onComplete: function() {
      tweenCircle(c);
    }
  })
  }});
}