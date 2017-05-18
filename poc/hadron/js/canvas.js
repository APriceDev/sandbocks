const hadron = {};

// init module pattern
hadron.createCanvas = (function(width = 800, height = 600){
    const canvas = document.querySelector('#cern');
    const ctx = canvas.getContext('2d');

    // ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.width = width;
    canvas.height = height;

    return {
        canvas : canvas,
        ctx : ctx
    }
}());