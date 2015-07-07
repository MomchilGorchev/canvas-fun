/**
 * Created by momchillgorchev on 14/05/15.
 */

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf, running = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 1,
    radius: 35,
    color: '#F87E7B',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function clear(){
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    clear();
    ball.draw();
    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function(e){
    if (!running) {
        clear();
        ball.x = e.clientX;
        ball.y = e.clientY;
        ball.draw();
    }
});

canvas.addEventListener('click', function(e){
    if(!running){
        raf = window.requestAnimationFrame(draw);
        running = true;
    }
});

canvas.addEventListener('mouseout', function(e){
    window.cancelAnimationFrame(raf);
    running = false;
});

ball.draw();
