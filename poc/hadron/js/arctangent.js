hadron.arctangent = (function(module){
    const {canvas, ctx, width, height} = module;

    let arrowX = width / 2
        ,arrowY= height / 2
        ,dx
        ,dy
        ,angle = 0;

        render();

        function render(){
            ctx.clearRect(0, 0, width, height);

            ctx.save();
            ctx.translate(arrowX, arrowY);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(20, 0);
            ctx.lineTo(-20, 0);
            ctx.moveTo(20, 0);
            ctx.lineTo(10, -10);
            ctx.moveTo(20, 0);
            ctx.lineTo(10, 10);
            ctx.stroke();

            ctx.restore();

            requestAnimationFrame(render);
        }

        document.body.addEventListener('mousemove', function(){
            dx = event.clientX - arrowX;
            dy = event.clientY - arrowY;
            angle = Math.atan2(dy ,dx);
        });

}(hadron.createCanvas));