const gravityBomb = {};

gravityBomb.createCanvas = (function(width = 800, height = 600){
    const canvas = document.querySelector('#range');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    return {canvas : canvas, ctx : ctx};

}());

gravityBomb.renderGame = (function(module){

    const canvas = module.canvas;
    const ctx = module.ctx;
    let centerY = canvas.height - 10;
    let centerX = canvas.width - (canvas.width * 0.4);
    offset = 150;
    let speed = 0.005;
    let angle = 0;

    render();

    function render(){

        let x = centerX + Math.sin(angle) * offset;

        ctx.fillStyle = 'rgba(0, 10, 200, 1.0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(34, 34, 34, 1.0)';
        ctx.fillRect(x, centerY ,100, 10)

        angle += speed;
        requestAnimationFrame(render);
    }

}(gravityBomb.createCanvas));