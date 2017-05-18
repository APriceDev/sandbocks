hadron.trig02 = (function(module){
    const canvas = module.canvas;
    const ctx = module.ctx;

    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let centerY = canvas.height * 0.5;
    let centerX = canvas.width * 0.5;
    let baseRadius = 100;
    let offset = 50;
    let speed = 0.1;
    let angle = 0;

    render();

    function render(){
        let radius = baseRadius + Math.sin(angle) * offset;

        ctx.clearRect(0, 0,  canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.fill();

        angle += speed;
        requestAnimationFrame(render);
    }


    return {
        canvas : canvas,
        ctx : ctx
    }
}(hadron.createCanvas));