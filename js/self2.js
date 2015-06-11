/**
 * Created by momchillgorchev on 02/06/15.
 */

window.requestAnimationFrame =
    window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

var scene = document.getElementById('scene'),
    ctx = scene.getContext('2d'),
    WIDTH = scene.width = window.innerWidth,
    HEIGHT = scene.height = window.innerHeight,
    dots = [];
scene.style.backgroundColor = 'black';


function createDots(amount){
    for (var i = 0; i < amount; i++){
        var x = Math.random() * WIDTH,
            y = -10,
            radius = 2,
            color = '71, 109, 171',
            alpha = 0;
        var dot = new Dot(x, y, radius, color, alpha);

        dots.push(dot);
    }
}

createDots(2000);

function Dot(x, y, radius, color, alpha){
    var _this = this;

    _this.x = x || Math.random() * WIDTH;
    _this.y = y || 0;
    _this.dy = 0;
    _this.dx = 0;
    _this.radius = radius || 2;
    _this.color = color || 'white';
    _this.alpha = 0;

    _this.draw = function(ctx){
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = 'rgba('+ _this.color +', '+ _this.alpha +')';
        ctx.fill();
    }
}

function reDraw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (var j = 0; j < dots.length; j++) {
        dots[j].draw(ctx);
    }
    requestAnimationFrame(reDraw);
}
reDraw();

function animateDot(d){

    if(d.y <= 0){
        d.alpha = Math.random();
    }
    if(d.x <= 0){
        d.alpha = Math.random();
    }
    var newDy = HEIGHT;
    var newXy = Math.random() * WIDTH;
    var delay = Math.random() * 5;
        //(d.dy + Math.random() * 5) > HEIGHT ? 0 : d.dy + Math.random() * 5;

    //newDy > HEIGHT ?
    //console.log(newDy);

    TweenMax.to(d, 2, {
        y: newDy,
        x:  + newXy,
        delay: delay,
        ease: Power0.easeNone,
        onComplete: function(){
            d.dy = d.y = newDy;
            d.xy = d.x = newXy;
            if(d.y >= HEIGHT){
                d.alpha = 0;
                d.y = -10;
            }
            if(d.x >= WIDTH){
                d.alpha = 0;
                d.x = -10;
            }
            animateDot(d);
        }
    });
}

for(var k = 0; k < dots.length; k++){
    animateDot(dots[k]);
}