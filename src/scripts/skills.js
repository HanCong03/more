/**
 * Author: hancong05@meituan.com
 * Date: 15/11/12
 */

'use strict';

jQuery(function ($) {
    var $skillBox = $('.skill-box');
    var $skillBgBox = $('.skill-bg-box');
    var $labels = $('.skill-label');

    var ITEM_HEIGHT = 5;
    var SPACE = 3;
    var HEIGHT = $skillBox.height();
    var COUNT = Math.floor(HEIGHT / (SPACE + ITEM_HEIGHT));

    var lastTime = 0;
    var INTERVAL = 10;

    var isDisabled = false;

    var VALUES = [42, 78, 82, 91, 66, 88];
    var currentValues = [0, 0, 0, 0, 0, 0];

    var animationId = -1;

    var DELAY_TIMER = null;

    // init bg skills
    (function () {
        var items = [];

        for (var i = 0; i < COUNT; i++) {
            items.push('<div class="skill-item"></div>');
        }

        items = items.reverse().join('');

        for (var i = 0, len = $skillBgBox.length; i < len; i++) {
            $skillBgBox[i].innerHTML = items;
        }
    })();

    $(document).on('activepage', function (evt, pageName) {
        if (pageName !== 'skill') {
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

        isDisabled = true;
        cancelAnimationFrame(animationId);
        currentValues = [0, 0, 0, 0, 0, 0];

        for (var i = 0, len = VALUES.length; i < len; i++) {
            $skillBox[i].innerHTML = '';
            $labels[i].innerHTML = '';
        }
    }

    function next() {
        if (isDisabled) {
            return;
        }

        animationId = requestAnimationFrame(inc);
    }

    function inc(timestamp) {
        if (timestamp - lastTime < INTERVAL) {
            next();
            return;
        }

        var isContinue = false;

        lastTime = timestamp;

        for (var i = 0, len = VALUES.length; i < len; i++) {
            isContinue = update(i) || false;
        }

        if (isContinue) {
            next();
        }
    }

    function getItems(index) {
        var showCount = Math.round((currentValues[index] / 100) * COUNT);
        var items = [];
        var className;

        for (var i = 0; i < COUNT; i++) {

            if (i < showCount) {
                className = "skill-item skill-show";
            } else {
                className = "skill-item";
            }

            items.push('<div class="' + className + '"></div>');
        }

        if (showCount < COUNT / 2) {
            className = 'low-skill-item';
        } else {
            className = 'high-skill-item';
        }

        return '<div class="' + className + '">' + items.reverse().join('') + '</div>';
    }

    function update(index) {
        var max = VALUES[index];
        var current = currentValues[index];

        if (current >= max) {
            return false;
        }

        currentValues[index] = current + 1;

        $labels[index].innerHTML = currentValues[index] + '%';
        $skillBox[index].innerHTML = getItems(index);

        return true;
    }
});