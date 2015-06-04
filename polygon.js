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
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

CanvasRenderingContext2D.prototype.fillPolygon = function (pointsArray, fillColor,     strokeColor) {
    if (pointsArray.length <= 0) return;
    this.moveTo(pointsArray[0][0], pointsArray[0][1]);
    for (var i = 0; i < pointsArray.length; i++) {
        this.lineTo(pointsArray[i][0], pointsArray[i][1]);
    }
    if (strokeColor != null && strokeColor != undefined)
        this.strokeStyle = strokeColor;

    if (fillColor != null && fillColor != undefined) {
        this.fillStyle = fillColor;
        this.fill();
    }
};

function polygon(ctx, x, y, radius, sides, startAngle, anticlockwise, color) {
    ctx.strokeStyle = color || colors[Math.floor(i%colors.length)];
    ctx.strokeWidth = 10;
    if (sides < 3) return;
    var a = (Math.PI * 2)/sides;
    a = anticlockwise?-a:a;
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(startAngle);
    ctx.moveTo(radius,0);
    for (var i = 1; i < sides; i++) {
        ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    return {
        x: x,
        y: y,
        radius: radius,
        sides: sides,
        startAngle: startAngle,
        color: color
    }
}

for (var i = 0; i < 20; i++){
    //ctx.beginPath();
    //console.log(colors[Math.floor(i%colors.length)]);
    shapes.push(polygon(ctx, WIDTH / 2 + i*5, HEIGHT / 2 + i*4, (i+1) * 10, 10, 90, -Math.PI /2, colors[Math.floor(i%colors.length)]));

    //ctx.shadowColor = '#c2c2c2';
    //ctx.shadowOffsetX = 0;
    //ctx.shadowOffsetY = 0;
    //ctx.shadowBlur = 200;
    //ctx.fill();
}
console.log(shapes);


//for (var j = 0; j < shapes.length; j ++){
//    var current = shapes[j];
//
//    TweenMax.to(current, 2, {
//        x: 0,
//        ease: Linear.easeNone,
//        onComplete: function(){
//            console.log('bump');
//        }
//    })
//}

ctx.font="50px Verdana";
// Create gradient
var gradient=ctx.createLinearGradient(0,0,WIDTH,0);
gradient.addColorStop("0","ivory");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","ivory");
// Fill with gradient
ctx.strokeStyle=gradient;
ctx.strokeText("Looks like 3D",WIDTH / 1.8,50);
//function
var grd = ctx.createLinearGradient(0.687, 0.000, 102.313, 99.000);
grd.addColorStop(0.239, 'rgba(255, 170, 86, 1.000)');
grd.addColorStop(0.562, 'rgba(255, 255, 0, 1.000)');
grd.addColorStop(1.000, 'rgba(255, 255, 255, 1.000)');
ctx.beginPath();
ctx.arc(0, 0, 100, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = grd;
ctx.fill();//And you can use this method as
//var polygonPoints = [[10,100],[20,75],[50,100],[100,100],[10,100]];
//ctx.fillPolygon(polygonPoints, '#F00','#000');