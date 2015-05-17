/**
 * Created by momchillgorchev on 17/05/15.
 */

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var points = [], running = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var point = function(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = 5;
    this.vy = 1;
    this.radius= 2;
    this.color= 'black';
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
    };

};


console.log(points);

//point.draw();
//point.move();

window.addEventListener('click', function(){
    var pos = {
        x : Math.random() * canvas.width,
        y : Math.random() * canvas.height
    };

    point.move(pos);
});


function createPoint(){
    for( var i = 0; i < 50; i++){
        var p = new point;
        p.draw();
        points.push(p);
    }

    shiftPoint(points);
}

function shiftPoint(points){

    for(var k = 0; k< points.length; k++){
        var p = points[k];
        var x = p.x;
        var y = p.y;

        var newX = Math.random() * canvas.width;
        var newY = Math.random() * canvas.height;

        TweenMax.to(p, 1, {x: x + newX, y: y + newY, onComplete: function(){console.log('ya!')}});

        requestAnimationFrame(createPoint);
    }
}

createPoint();