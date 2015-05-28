

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var canvas = document.getElementById('scene');
    var ctx = canvas.getContext('2d');
    var dots = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createDots(amount){
        for(var i = 0; i < amount; i++){

            var x = Math.random() * canvas.width,
                y = Math.random() * canvas.height,
                radius = Math.random() * 3;
            var dot = new Dot(x, y, radius);

            dots.push(dot);
        }

    }

    createDots(1000);

    function Dot(x, y, radius, color, alpha){

        var _this = this;
        _this.x = x || canvas.width / 2;
        _this.y = y || canvas.height / 2;
        _this.radius = radius || 2;
        _this.color = color || 'green';
        _this.alpha = alpha || Math.random();

        this.draw = function(ctx){
            ctx.beginPath();
            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = _this.color;
            ctx.fill();
        };

        //console.log(this);
    }

    function loop(){

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var j = 0; j < dots.length; j++){
            dots[j].draw(ctx);

        }

        window.requestAnimationFrame(loop);
    }

    loop();

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function moveAround(dot){

        TweenMax.to(dot, 0.7 + Math.random(), {
            x: randomNumber(0, canvas.width),
            y: randomNumber(0, canvas.height),
            ease: Cubic.easeInOut,
            onComplete: function() {

                TweenMax.to(dot, 0.7 + Math.random(), {
                    x: randomNumber(0, canvas.width),
                    y: randomNumber(0, canvas.height),
                    ease: Cubic.easeInOut,
                    onComplete: function() {
                        moveAround(dot);
                    }
                })
            }
        });
    }

    for(var k = 0; k < dots.length; k++){
        moveAround(dots[k]);
    }
