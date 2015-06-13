/**
 * Created by momchillgorchev on 21/05/15.
 */
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

// Set to size of browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width/2,
    centerY = canvas.height/2;

var circles = [],
    colors = ['242, 56, 90', '245, 165, 3', '74, 217, 217', '54, 177, 191'],
    totalSquares = randomNumber(290, 430);


for (var i = 0; i < totalSquares; i++) {

    var p = Math.random(),
        x = Math.random() * canvas.width,
        y = Math.random() * canvas.height;

    var square = new Circle(x,y,colors[Math.floor(i%colors.length)], randomNumber(1, 4), randomNumber(0.5, 1));

    square.innerX = x;
    square.innerY = y;

    circles.push(square);
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

var longestReturnDuration = 0,
    returnDuration = 0;

function tweenSquares(square) {

    returnDuration = 1.5 + Math.random();

    // Keep longest duration to use for delay
    if (returnDuration > longestReturnDuration) {
        longestReturnDuration = returnDuration;
    }

    TweenMax.to(square, 0.7 + Math.random(), {
        x: randomNumber(0, canvas.width),

        width: 20,
        delay:  .75,
        ease: Cubic.easeInOut,
        onComplete: function() {

            TweenMax.to(square, 0.7 + Math.random(), {
                //x: randomNumber(0, canvas.width),
                y: randomNumber(0, canvas.height),
                width: 5,
                ease: Cubic.easeInOut,
                onComplete: function() {
                    tweenSquares(square);
                }
            })
        }
    });
}

for (var i = 0; i < circles.length; i++) {
    tweenSquares(circles[i]);
}