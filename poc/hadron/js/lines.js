// random lines on canvas test module pattern
(function(module){
    const canvas = module.canvas;
    const ctx = module.ctx;

    for(let i = 0; i <=100; i++){
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    };
})(createCanvas);