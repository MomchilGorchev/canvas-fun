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
    for(var i = 0; i < 1500; i++){
        var pos = {
            x: width,
            y: height
        };
        stars.push(pos);
        bgc.fillStyle = 'white';
        bgc.fillRect(pos.x, pos.y, 2.5, Math.sin(2*Math.random()));
        shiftPoint(pos);
    }

    function shiftPoint(p){

        var newPos = {};

        // Depends on which part of the screen give different target position
        // case statement maybe better as they will be several use cases
        //if(p.x < width / 2 && p.y < height / 2){
        //    newPos = {
        //        x: p.x * Math.random(),
        //        y: p.y * Math.random()
        //    };
        //} else if(p.x < width / 2 && p.y > height / 2) {
        //    newPos = {
        //        x: p.x * Math.random(),
        //        y: p.y * Math.random()
        //    };
        //} else {
        //    newPos = {
        //        x: p.x / Math.random(),
        //        y: p.y / Math.random()
        //    };
        //
        //    if(newPos.x > width){
        //        newPos.x = width;
        //    }
        //    if(newPos.y > height){
        //        newPos.y = height;
        //    }
        //
        //}

        //if(p.x < width / 12 && p.y < height / 12){
        //    newPos = {
        //        x: Math.random() * width,
        //        y: Math.random() * height
        //    }
        //} else {
        newPos = {
            x: p.x - Math.random() * 100,
            y: p.y - Math.random() * 100
        };

        if(newPos.y < height / 2){
            newPos = {
                x: width,
                y: height
            };
        }


        //}

        TweenMax.to(p, 1 + Math.random(), {
            x: newPos.x,
            y: newPos.y,
            ease: Linear.easeNone,
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
