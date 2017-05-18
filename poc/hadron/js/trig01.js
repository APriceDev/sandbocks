hadron.trig01 = (function(module){
    const canvas = module.canvas;
    const ctx = module.ctx;

    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(0, canvas.height/2)
    ctx.scale(1, -1);

    for(let angle = 0; angle < Math.PI * 2; angle+= .01){
        let x = angle * 100;
        let y = Math.sin(angle) * 100;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y, 2, 2);
    };

    return {
        canvas : canvas,
        ctx : ctx
    }
}(hadron.createCanvas));