/**
 * Created by momchillgorchev on 03/06/15.
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
    shapes = [];
scene.style.backgroundColor = 'black';
var colors = ['242, 56, 90', '245, 165, 3', '74, 217, 217', '54, 177, 191'];

function CanvasScene(sides, animationSpeed, polygons){
    var constructor = this;
    constructor.sides = sides || 6;
    constructor.animationSpeed = animationSpeed || 2;
    constructor.polygons = polygons || 10;

    constructor.init = function(){
        constructor.createShapes(constructor.sides);
        constructor.reDraw();
        for(var k = 0; k < shapes.length; k++){
            constructor.animateShape(shapes[k], ((k+1) * 0.2) );
        }
    };
    constructor.Polygon = function(ctx, x, y, radius, sides, startAngle, anticlockwise, color, alpha){
        var _this = this;

        _this.x = x;
        _this.y = y;
        _this.radius = radius;
        _this.sides = sides;
        _this.startAngle = startAngle;
        _this.anticlockwise = anticlockwise;
        _this.color = color;
        _this.alpha = 1 - _this.radius * 0.005; //Bigger radius means lower opacity

        //console.log(_this.alpha);
        _this.draw = function(ctx){
            ctx.beginPath();
            ctx.strokeStyle = 'rgba('+ _this.color +', '+ _this.alpha + ')';
            ctx.lineWidth = 5;
            if (_this.sides < 3) return;
            var a = (Math.PI * 2)/_this.sides;
            a = _this.anticlockwise?-a:a;
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate(_this.startAngle);
            ctx.moveTo(_this.radius,0);
            for (var i = 1; i < _this.sides; i++) {
                ctx.lineTo(_this.radius*Math.cos(a*i),_this.radius*Math.sin(a*i));
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
        return this;
    };

    constructor.createShapes = function(sides){
        for (var i = 0; i < constructor.polygons; i++){
            var poly = new constructor.Polygon(
                ctx,                                    // Canvas context
                WIDTH / 2 ,                             // x value
                HEIGHT / 2,                             // y value
                (i+1) * 20,                             // radius
                sides,                                  // sides
                90,                                     // start angle
                -Math.PI /2,                            // anticlockwise
                colors[Math.floor(i%colors.length)],    // random color
                1                                       // alpha
            );
            //console.log('Polygon at index [' + i + '] have radius ' + poly.radius );
            shapes.push(poly);

        }
    };



    constructor.reDraw = function(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for(var k = 0; k < shapes.length; k++){
            shapes[k].draw(ctx);
        }

        requestAnimationFrame(constructor.reDraw);
    };


//console.log(shapes);

    constructor.animateShape = function(s, delay){
        //console.log(delay);
        var pos = {
            x: s.x,
            y: s.y,
            radius: s.radius
        };

        var newPos = {
            radius: pos.radius + 250,
            x: pos.x + 50,
            y: pos.y + 50,
            alpha: Math.random()
        };

        //console.log('The new x is ' + newPos.x );
        TweenMax.to(s, constructor.animationSpeed, {
            radius: pos.radius * 2,
            x: newPos.x * 3,
            autoAlpha: newPos.alpha,
            delay: delay,
            ease: Expo.easeInOut,
            onComplete: function(){
                TweenMax.to(s, constructor.animationSpeed, {
                    radius: pos.radius,
                    delay: delay,
                    autoAlpha: 1,
                    ease: Expo.easeInOut,
                    onComplete: function(){
                        constructor.animateShape(s);
                    }
                })
            }
        })
    };

    constructor.init();
}

var Scene = new CanvasScene(6, 2, 10);

//ctx.font="50px Verdana";
//// Create gradient
//var gradient=ctx.createLinearGradient(0,0,WIDTH,0);
//gradient.addColorStop("0","ivory");
//gradient.addColorStop("0.5","blue");
//gradient.addColorStop("1.0","ivory");
//// Fill with gradient
//ctx.strokeStyle=gradient;
//ctx.strokeText("Looks like 3D",WIDTH / 1.8,50);
////function
//var grd = ctx.createLinearGradient(0.687, 0.000, 102.313, 99.000);
//grd.addColorStop(0.239, 'rgba(255, 170, 86, 1.000)');
//grd.addColorStop(0.562, 'rgba(255, 255, 0, 1.000)');
//grd.addColorStop(1.000, 'rgba(255, 255, 255, 1.000)');
//ctx.beginPath();
//ctx.arc(0, 0, 100, 0, Math.PI * 2, true);
//ctx.closePath();
//ctx.fillStyle = grd;
//ctx.fill();//And you can use this method as
