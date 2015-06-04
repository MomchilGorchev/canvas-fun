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
    dots = [];
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
    ctx.strokeStyle = color;
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
}

for (var i = 0; i < 10; i++){
    //ctx.beginPath();
    console.log(colors[Math.floor(i%colors.length)]);
    polygon(ctx, WIDTH / 2 + i*5, HEIGHT / 2 + i*2, (i+1) * 10, 10, 90, -Math.PI /2, colors[Math.floor(i%colors.length)]);
    //ctx.shadowColor = '#c2c2c2';
    //ctx.shadowOffsetX = 0;
    //ctx.shadowOffsetY = 0;
    //ctx.shadowBlur = 200;
    //ctx.fill();
}

//function

//And you can use this method as
//var polygonPoints = [[10,100],[20,75],[50,100],[100,100],[10,100]];
//ctx.fillPolygon(polygonPoints, '#F00','#000');