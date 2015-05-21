/**
 * Created by momchillgorchev on 17/05/15.
 */

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
var WIDTH = canvas.width;
canvas.height = window.innerHeight;
var HEIGHT = canvas.height;

var particles = [],
    colors = ['242, 56, 90', '245, 165, 3', '74, 217, 217', '54, 177, 191'],
    totalParticles = randomNumber(150, 300);


for(var i = 0; i < totalParticles; i++){
    var x = Math.random() * WIDTH;
    var y = Math.random() * HEIGHT;

    var atom = new Particle(x, y, colors[Math.floor(i%colors.length)], randomNumber(1, 6), randomNumber(0.3, 1));

    atom.posX = x;
    atom.posY = y;

    particles.push(atom);
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function Particle(x, y, color, radius, alpha){
    var _this = this;

    _this.x = x || null;
    _this.y = y || null;
    _this.radius = radius || null;
    _this.color = color || null;
    _this.alpha = alpha || null;
    _this.draw = function(){
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = 'rgba('+_this.color+', '+_this.alpha+')';
        ctx.fill();
    }
}

function drawCanvas(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for(var j = 0; j < particles.length; i++){
        particles[j].draw(ctx);
    }

    requestAnimationFrame(drawCanvas);
}

drawCanvas();

var tweenDuration = 0, tweenDelay = 0;

function moveParticle(atom){
    tweenDelay = 1.5 * Math.random();

    if(tweenDelay > tweenDuration){
        tweenDuration = tweenDelay;
    }

    TweenMax.to(atom, 0.5 + Math.random(), {
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        delay: tweenDuration + 0.5,
        ease: Cubic.easeInOut,
        onComplete: function(){

            TweenMax.to(atom, 0.5 + Math.random(), {
                x: Math.random() * WIDTH,
                y: Math.random() * HEIGHT,
                delay: tweenDuration + 0.5,
                ease: Cubic.easeInOut,
                onComplete: function(){
                    moveParticle(atom);
                }
            });
        }
    });
}

for(var k = 0; k < particles.length; k++){
    moveParticle(particles[k]);
}