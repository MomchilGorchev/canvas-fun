

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var canvas = document.getElementById('scene');
    var ctx = canvas.getContext('2d');
    var dots = [];
    var colors = ['242, 56, 90', '245, 165, 3', '74, 217, 217', '54, 177, 191'];

    var WIDTH = canvas.width = window.innerWidth;
    var HEIGHT = canvas.height = window.innerHeight;
    canvas.style.background = 'black';


    function createDots(amount){
        for(var i = 0; i < amount; i++){

            var x = canvas.width / 2,
                y = canvas.height / 2,
                radius = (Math.random() + 1) * 3,
                color = colors[Math.floor(i%colors.length)],
                alpha = randomNumber(0.3, 1);
            var dot = new Dot(x, y, radius, color, alpha);

            dots.push(dot);
        }

    }

    createDots(1000);

    function Dot(x, y, radius, color, alpha){

        var _this = this;
        _this.x = x;
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

    function reseDot(dot){
        
    }

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

            var timing = Math.random() * dot.radius * 0.52;


            TweenMax.to(dot, timing, {
                x: newPos.x,
                y: newPos.y,
//                alpha: 0.8,
                delay: Math.random() * 3,
                ease: Linear.easeNone,
                onComplete: function() {

                    
                    //dot.y = canvas.height + 20;
                    TweenMax.to(dot, 0, {

//                        bezier:{
//                            type:"soft",
//                            values:[
//                                {x:(Math.random() + 1) * ((WIDTH / 2) + 30) - ((WIDTH / 2) - 30) % WIDTH , y: 400},
//                                {x:WIDTH / 2 , y: 600},
//                                {x:WIDTH / 2 + 50, y: 800},
//                                {x:Math.random() * WIDTH , y: HEIGHT + 10}
//                            ],
//                            autoRotate:["x","y","rotation", 0, true]
//                        },
//                        alpha: 0.2,
                        x: canvas.width / 2,
                        y: canvas.height / 2,
                        delay: Math.random() * 3,
                        ease: Linear.easeNone,
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
