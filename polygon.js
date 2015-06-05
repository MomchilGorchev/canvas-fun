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
var colors = ['#C7FCD7', '#D9D5A7', '#D9AB91', '#E6867A', '#ED4A6A'];

function Polygon(ctx, x, y, radius, sides, startAngle, anticlockwise, color){
    var _this = this;

    _this.x = x;
    _this.y = y;
    _this.radius = radius;
    _this.sides = sides;
    _this.startAngle = startAngle;
    _this.anticlockwise = anticlockwise;
    _this.color = color;

    _this.draw = function(ctx){
        ctx.beginPath();
        ctx.strokeStyle = _this.color;
        ctx.lineWidth = 10;
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
    return _this;
}

(function createShapes(){
    for (var i = 0; i < 20; i++){
        var poly = new Polygon(ctx, WIDTH / 2 , HEIGHT / 2, (i+1) * 20, 12, 90, -Math.PI /2, colors[Math.floor(i%colors.length)]);
        //console.log('Polygon at index [' + i + '] have radius ' + poly.radius );
        shapes.push(poly);

    }
}());



function reDraw(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for(var k = 0; k < shapes.length; k++){
        shapes[k].draw(ctx);
    }

    requestAnimationFrame(reDraw);
}

reDraw();
//console.log(shapes);

function animateShape(s, delay){
    //console.log(delay);
    var pos = {
        x: s.x,
        y: s.y,
        radius: s.radius
    };

    var newPos = {
        radius: pos.radius + 250,
        x: pos.x + 50,
        y: pos.y + 50
    };

    var delayAnim = s.radius > 180 ? 0.5 : 1.5;
    //console.log('The new x is ' + newPos.x );
    TweenMax.to(s, 3, {
        radius: pos.radius * 2,
        x: newPos.x * 3,
        delay: delay,
        ease: Expo.easeInOut,
        onComplete: function(){
            TweenMax.to(s, 5, {
                radius: pos.radius,
                delay: delay + 1,
                ease: Expo.easeInOut,
                onComplete: function(){
                    animateShape(s);
                }
            })
        }
    })
}

for(var k = 0; k < shapes.length; k++){
    animateShape(shapes[k], ((k+1) * 2) * 0.1 );
}

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
