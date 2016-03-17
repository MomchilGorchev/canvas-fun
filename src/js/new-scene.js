var canvas = document.getElementById('scene'),
    $ = canvas.getContext('2d');
var WIDTH = canvas.width = window.innerWidth,
    HEIGHT = canvas.height = window.innerHeight,
    objs = [];

canvas.style.background = '#000';

function init(){
    createLine();
}

function Obj(x, y, color, size){

    var _this = this;
    _this.x = x;
    _this.y = y;
    _this.xx = x + size;
    _this.yy = y - size;
    _this.color = color || '180,184,240';

    _this.draw = function(ctx){
        ctx.beginPath();
        ctx.moveTo(_this.x, _this.y);
        ctx.lineTo(_this.xx, _this.yy);
        ctx.lineTo(Math.random() * WIDTH, Math.random() * HEIGHT);
        ctx.closePath();
        ctx.strokeStyle = 'rgba('+ _this.color +', '+ Math.random() +')';
        ctx.stroke();
    }

}


function createLine(){
    for (var i = 0; i < 100; i++){
        var l = new Obj(Math.random() * WIDTH, Math.random() * HEIGHT, '180,184,240', Math.random() * 50);
        l.draw($);
        objs.push(l);

    }
}

init();