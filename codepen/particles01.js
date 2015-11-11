/**
 * Created by momchillgorchev on 11/11/15.
 */

(function(){

    var bgCanvas = document.getElementById('c'), stars = [];
    //bgCanvas.style.zIndex = '1';
    var width = bgCanvas.width = window.innerWidth;
    var height = bgCanvas.height = window.innerHeight;
    var bgc = bgCanvas.getContext('2d');

    console.log('alive');
    bgc.rect(0,0,width, height);
    bgc.fillStyle = '#333';
    bgc.fill();

    // Create points
    for(var i = 0; i < 500; i++){
        var pos = {
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height
        };
        stars.push(pos);
        bgc.fillStyle = 'white';
        bgc.fillRect(pos.x, pos.y, 2.5, Math.sin(2*Math.random()));
        shiftPoint(pos);
    }

    function shiftPoint(p){
        TweenMax.to(p, 1 + Math.random(), {
            x: Math.sin(2*Math.random()),
            y: Math.sin(2*Math.random()),
            ease: Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }
        });
    }

    function drawPoints(){
        bgc.rect(0,0,width, height);
        bgc.fillStyle = '#333';
        bgc.fill();
        for (var j = 0, count = stars.length; j < count; j++){
            bgc.fillStyle = 'white';
            bgc.fillRect(stars[j].x, stars[j].y, 2.5, Math.sin(2*Math.random()));
        }

        requestAnimationFrame(drawPoints);
    }

    drawPoints();

})();
