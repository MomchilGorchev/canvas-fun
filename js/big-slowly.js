/**
 * Created by momchillgorchev on 21/05/15.
 */



var canvas = document.getElementById('scene'),
    ctx = canvas.getContext('2d');

// Set to size of browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'black';

var minRadius = canvas.width / 50;

var centerX = canvas.width/2,
    centerY = canvas.height/2;

var circles = [],
    colors = ['242, 56, 90', '245, 165, 3', '74, 217, 217', '54, 177, 191'],
    totalSquares = randomNumber(150, 170);
var longestReturnDuration = 0,
    returnDuration = 0;

function init(){
    createShapes();
    animateScene();
}

// Create shapes
function createShapes(){
    for (var i = 0; i < totalSquares; i++) {

        var p = Math.random(),
            x = Math.random() * canvas.width,
            y = randomNumber(centerY - 100, centerY + 100);

        var square = new Circle(x,y,colors[Math.floor(i%colors.length)], minRadius, randomNumber(0.3, 0.7));

        square.innerX = x;
        square.innerY = y;

        circles.push(square);
    }
}

// Draw circles
function Circle(x, y, color, radius, alpha) {

    var _this = this;

    _this.x = x || null;
    _this.y = y || null;
    _this.color = color || null;
    _this.radius = radius || null;
    _this.alpha = alpha || null;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = 'rgba('+_this.color+', '+_this.alpha+')';
        ctx.fill();
    }

}

function loop() {

    ctx.clearRect(0,0,canvas.width, canvas.height);

    for(var i = 0; i < circles.length; i++) {
        circles[i].draw(ctx);
    }

    requestAnimationFrame(loop);
}

loop();

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function tweenSquares(square) {

    returnDuration = 1.5 + Math.random();

    // Keep longest duration to use for delay
    if (returnDuration > longestReturnDuration) {
        longestReturnDuration = returnDuration;
    }

    TweenMax.to(square, 50, {
        x: randomNumber(0, canvas.width),
        y: randomNumber(centerY - 100, centerY + 100),
        delay:  Math.random() * 5,
        ease: Linear.easeNone,
        onComplete: function() {
            TweenMax.to(square, 50 + Math.random(), {
                x: randomNumber(0, canvas.width),
                y: randomNumber(centerY - 100, centerY + 100),
                ease: Linear.easeNone,
                onComplete: function() {
                    tweenSquares(square);
                }
            })
        }
    });
}

function animateScene(){
    for (var i = 0; i < circles.length; i++) {
        tweenSquares(circles[i]);
    }
}

init();