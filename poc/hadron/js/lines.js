// subsequent module pattern
// random lines on canvas test
hadron.lines = (function(module){
    const canvas = module.canvas;
    const ctx = module.ctx;

    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i <= 100; i++){
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    };

    return {
        canvas : canvas,
        ctx : ctx
    }
}(hadron.createCanvas));