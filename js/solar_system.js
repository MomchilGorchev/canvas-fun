/**
 * Created by momchillgorchev on 14/05/15.
 */


var sun = new Image();
var moon = new Image();
var earth = new Image();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
//var WIDTH = (window.innerWidth > 500) ? 500 : window.innerWidth;
//var HEIGHT = (window.innerHeight > 500) ? 500 : window.innerHeight;
function init(){
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(draw);
}
console.log('Width: '+ WIDTH);
console.log('Height: '+ HEIGHT);
function draw() {
    var cnvs = document.getElementById('canvas'),
        ctx = cnvs.getContext('2d');

    cnvs.width = WIDTH;
    cnvs.height = HEIGHT;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,WIDTH,HEIGHT); // clear canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(WIDTH / 2 ,HEIGHT / 2);

    // Earth
    var time = new Date();
    ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
    ctx.translate(405,0);
    ctx.fillRect(0,-12,50,24); // Shadow
    ctx.drawImage(earth,-12,-12);

    // Moon
    ctx.save();
    ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
    ctx.translate(0,28.5);
    ctx.drawImage(moon,-3.5,-3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(WIDTH /2,HEIGHT/2,405,0,Math.PI*2,false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun,0,0,WIDTH,HEIGHT);

    window.requestAnimationFrame(draw);
}

init();