/**
 * Author: hancong05@meituan.com
 * Date: 15/11/6
 */

'use strict';

jQuery(function ($) {
    var $labels = $('.number-label');
    var NUBMERS = [6, 5, 20, 500, 300];

    var DURATION  = 700;
    var startTime = -1;

    var isDisabled = false;
    var DELAY_TIMER = null;

    var id;

    $(document).on('activepage', function (evt, name) {
        if (name !== 'number') {
            clear();
            return;
        }

        start();
    });

    function start() {
        isDisabled = false;

        clearTimeout(DELAY_TIMER);

        DELAY_TIMER = setTimeout(function () {
            next();
        }, 300);
    }

    function clear() {
        if (isDisabled) {
            return;
        }

        startTime = -1;
        cancelAnimationFrame(id);
        isDisabled = true;

        for (var i = 0, len = NUBMERS.length; i < len; i++) {
            $labels[i].innerHTML = '0+';
        }
    }

    function next() {
        if (isDisabled) {
            return;
        }

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