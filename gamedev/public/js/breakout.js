;(function(global){

    const Context = {
        canvas : null,
        context : null,
        create : function(canvas_id){
            this.canvas = document.getElementById(canvas_id);
            this.context = this.canvas.getContext('2d');
            return this.context;
        }
    };

    return global.Breakout = Context;
}(this));

;{
    const canvas = Breakout.create('breakoutCanvas').canvas;
    const context = Breakout.context;

    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;
    let ballRadius = 10;

    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width-paddleWidth) / 2;
    let rigthPressed = false;
    let leftPressed = false;

    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let bricks = [];

    for(let c = 0; c < brickColumnCount; c++){
        bricks[c] = [];
        for(let r = 0; r < brickRowCount; r++){
            bricks[c][r] = {x : 0, y : 0; status : 1};
        };
    };

    function drawBall(){
        context.beginPath();
        context.arc(x, y, ballRadius, 0, Math.PI*2);
        context.fillStyle = '#0095DD' ;
        context.fill();
        context.closePath();
    };

    function drawPaddle(){
        context.beginPath();
        context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        context.fillStyle = '#0095DD';
        context.fill();
        context.closePath();
    };

    function drawBricks(){
        for(let c = 0; c < brickColumnCount; c++){
            for(let r = 0; r < brickRowCount; r++){
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = '#0095DD';
                context.fill();
                context.closePath();
            }
        }
    };

    function draw(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();

        if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){dx = -dx};
        if(y + dy < ballRadius){
            dy = -dy;
        }else if(y + dy > canvas.height - ballRadius){
            if(x > paddleX && x < paddleX + paddleWidth){
                dy = -dy;
            }else{
                console.log('game over, man!');
                // document.location.reload();
            }
        };

        x += dx;
        y += dy

        if(rigthPressed && paddleX < canvas.width-paddleWidth){
            paddleX += 7;
        }else if(leftPressed && paddleX > 0){
            paddleX -= 7;
        }
    };

    function keyDownHandler(e){
        if(e.keyCode == 39){
            rigthPressed = true;
        }else if(e.keyCode == 37){
            leftPressed = true;
        }
    };

    function keyUpHandler(e){
        if(e.keyCode == 39){
            rigthPressed = false;
        }else if(e.keyCode == 37){
            leftPressed = false;
        }
    };

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    setInterval(draw, 10);
};