// init module pattern
const createCanvas = function(width = 800, height = 600){
    const canvas = document.querySelector('#hadron');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    return {
        canvas : canvas,
        ctx : ctx
    }
}();

// subsequent module pattern
// (function(module){
//     const canvas = module.canvas;
//     const ctx = module.ctx;

//     for(let i = 0; i <=100; i++){
//         ctx.beginPath();
//         ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
//         ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
//         ctx.stroke();
//     };
// })(createCanvas);