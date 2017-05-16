
// (function(){
//     const canvas = document.querySelector('#hadron');
//     const ctx = canvas.getContext('2d');

//     let width = canvas.width = window.innerWidth;
//     let height = canvas.height = window.innerHeight;

//     for(let i = 0; i <=100; i++){
//         ctx.beginPath();
//         ctx.moveTo(Math.random() * width, Math.random() * height);
//         ctx.lineTo(Math.random() * width, Math.random() * height);
//         ctx.stroke();
//     }
// }());

(function(){
    const canvas = document.querySelector('#hadron');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = 800;
    let height = canvas.height = 600;

    for(let i = 0; i <=100; i++){
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    }

    console.log(width);
    console.log(canvas.height);
}());