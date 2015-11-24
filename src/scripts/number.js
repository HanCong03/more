/**
 * Author: hancong05@meituan.com
 * Date: 15/11/6
 */

'use strict';

jQuery(function ($) {
    var $labels = $('.number-label');
    var NUBMERS = [6, 5, 20, 500, 300];

    var DURATION  = 1000;
    var startTime = -1;

    var id;

    start();

    window.start = start;

    function start() {
        next();
    }

    function next() {
        id = requestAnimationFrame(animation);
    }

    function animation(timestamp) {
        if (startTime === -1) {
            startTime = timestamp;
        }

        var diff = timestamp - startTime;

        if (diff >= DURATION) {
            return end();
        }

        var scale = diff / DURATION;

        for (var i = 0, len = NUBMERS.length; i < len; i++) {
            $labels[i].innerHTML = Math.floor(NUBMERS[i] * scale) + '+';
        }

        next();
    }

    function end() {
        startTime = -1;

        for (var i = 0, len = NUBMERS.length; i < len; i++) {
            $labels[i].innerHTML = NUBMERS[i] + '+';
        }
    }
});