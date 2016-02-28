/**
 * Created by momchillgorchev on 28/02/16.
 */


    function getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
    var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
    var el = document.querySelector('.container');


    var pos = getOffset(el);
    var scr = {
        width: screen.availWidth,
        height: screen.availHeight
    };

    actualPos = {
        x: pos.left / scr.width * 100,
        y: pos.top / scr.height * 100
    };

    var elSpan = el.querySelector('span'),
        // mo.js timeline obj
        timeline = new mojs.Timeline(),

        // tweens for the animation:


        /**
         *
         * @type {mojs.Burst}
         *
         * mo·js no "eclipse" shape available yet, please choose from this list:
         * bit: t(t)
         * circle: e()
         * cross: e()
         * equal: e()
         * line: e()
         * polygon: e()
         * rect: e()
         * zigzag: e()
         */
        // burst animation
        tween1 = new mojs.Burst({
            parent: el,
            duration: 1500,
            shape : 'circle',
            fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            x: actualPos.left +'%',
            y: actualPos.top +'%',
            opacity: 0.6,
            childOptions: { radius: {20:0} },
            radius: {40:120},
            count: 6,
            isSwirl: true,
            isRunLess: true,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }),
        // ring animation
        tween2 = new mojs.Transit({
            parent: el,
            duration: 750,
            type: 'cross',
            radius: {0: 50},
            fill: 'transparent',
            stroke: '#988ADE',
            strokeWidth: {15:0},
            opacity: 0.6,
            x: actualPos.left +'%',
            y: actualPos.top +'%',
            isRunLess: true,
            easing: mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // icon scale animation
        tween3 = new mojs.Tween({
            duration : 900,
            onUpdate: function(progress) {
                var scaleProgress = scaleCurve(progress);
                elSpan.style.WebkitTransform = elSpan.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
            }
        });

    // add tweens to timeline:
    timeline.add(tween1, tween2, tween3);

    // when clicking the button start the timeline/animation:
    el.addEventListener('click', function() {
        timeline.start();
    });