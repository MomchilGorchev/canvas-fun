

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var canvas = document.getElementById('scene');
    var ctx = canvas.getContext('2d');
    var dots = [];
    var colors = ['242, 56, 90', '245, 165, 3', '74, 217, 217', '54, 177, 191'];

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 50;

    function createDots(amount){
        for(var i = 0; i < amount; i++){

            var x = Math.random() * canvas.width,
                y = Math.random() * canvas.height,
                radius = Math.random() * 10,
                color = colors[Math.floor(i%colors.length)],
                alpha = randomNumber(0.3, 1);
            var dot = new Dot(x, y, radius, color, alpha);

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
            ctx.fillStyle = 'rgba('+_this.color+', '+_this.alpha+')';
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

        var pos = {
            x: dot.x,
            y: dot.y
        };
        var newPos = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };

        TweenMax.to(dot, 4 , {
            x: newPos.x,
            y: newPos.y,
            ease: SlowMo.ease.config(0.7, 0.7, false),
            onComplete: function() {

                dot.x = newPos.x;
                dot.y = newPos.y;

                TweenMax.to(dot, 4, {
                    x: pos.x,
                    y: pos.y,
                    ease: SlowMo.ease.config(0.7, 0.7, false),
                    onComplete: function() {

                        dot.x = pos.x;
                        dot.y = pos.y;
                        moveAround(dot);
                    }
                })
            }
        });
    }

    for(var k = 0; k < dots.length; k++){
        moveAround(dots[k]);
    }
