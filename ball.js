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

var particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx : 5,
    vy: 1,
    radius: 2,
    color: 'black',
    draw:function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
    }
};

function clear(){
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function shiftPoint(point){
    var x = point.x;
    var y = point.y;

    var newX = Math.random() * canvas.width;
    var newY = Math.random() * canvas.height;

    TweenLite.to(point, Math.random() * 2, {x: x + newX, y: y + newY, onComplete: function(){console.log('ya!')}});
}

function draw(){
    clear();
    ball.draw();
    for(var i = 0; i < 100; i++) {
        particle.x =  Math.random() * canvas.width;
        particle.y =  Math.random() * canvas.height;
        particle.draw();
        shiftPoint(particle);
    }

    ball.x += 2*ball.vx;
    ball.y += 2*ball.vy;

    if(particle.x + particle.vx == ball.x){
        particle.vx = -particle.vx
    }

    if(ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0){
        ball.vy = -ball.vy;
    }

    if(ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0){
        ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function(e){
    if (!running) {
        clear();
        ball.x = e.clientX;
        ball.y = e.clientY;
        ball.draw();
        for(var i = 0; i < 100; i++) {
            particle.x =  Math.random() * canvas.width;
            particle.y =  Math.random() * canvas.height;
            particle.draw();
            shiftPoint(particle);
        }
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
particle.draw();

//function drawParticles(){
//    var amount = 1000;
//    for(var i = 0; i < amount; i++){
//
//        var newX = Math.random() * canvas.width;
//        var newY = Math.random() * canvas.height;
//        var radius = 2;
//        ctx.beginPath();
//        ctx.arc(newX, newY, radius, 0, Math.PI*2, true);
//        ctx.closePath();
//        ctx.fillStyle = 'black';
//        ctx.fill();
//    }
//}
//
//drawParticles();