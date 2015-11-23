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

    var PAGE_NAME = 'skills';
    var lastTime = 0;
    var INTERVAL = 10;

    var VALUES = [42, 78, 82, 91, 66, 88];
    var currentValues = [0, 0, 0, 0, 0, 0];

    var animationId = -1;
    var animation = false;

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

    $(document).on('scrollin', function (evt, inPages) {
        if (!inPages[PAGE_NAME]) {
            return;
        }

        start();
    }).on('scrollout', function (evt, outPages) {
        if (!outPages[PAGE_NAME]) {
            return;
        }

        stop();
    }).on('welcomeshow', function () {
        stop();
    });

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

    function start() {
        animation = true;
        next();
    }

    function stop() {
        animation = false;
        cancelAnimationFrame(animationId);
        currentValues = [0, 0, 0, 0, 0, 0];

        for (var i = 0, len = VALUES.length; i < len; i++) {
            $skillBox[i].innerHTML = '';
            $labels[i].innerHTML = '';
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

        return items.reverse().join('');
    }

    function next() {
        if (!animation) {
            return;
        }

        animationId = requestAnimationFrame(inc);
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