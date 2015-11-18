/**
 * Author: hancong05@meituan.com
 * Date: 15/11/17
 */

'use strict';

jQuery(function ($) {
    var container = $('.page-content')[0];
    var $pages = $(".navigable");
    var $navs = $('.nav li');

    // 动画持续时间
    var DURATION = 500;
    var frameId = -1;

    var from = 0;
    var to = 0;
    var startTime = 0;

    $(document).on('topage', function (evt, index) {
        stop();

        var containerRect = container.getBoundingClientRect();
        var pageRect = $pages[index - 1].getBoundingClientRect();
        var originalScrollTop = container.scrollTop;
        var newScrollTop = pageRect.top + originalScrollTop - containerRect.top;

        activeNav(index - 1);

        from = originalScrollTop;
        to = newScrollTop;

        start();
    }).on('navactive', function (evt, index) {
        activeNav(index);
    });

    function activeNav(index) {
        $navs.removeClass('active');
        $($navs[index]).addClass('active');
    }

    function start() {
        next();
    }

    function stop() {
        startTime = 0;
        cancelAnimationFrame(frameId);
    }

    function next() {
        frameId = requestAnimationFrame(scroll);
    }

    function scroll(timeStamp) {
        startTime = startTime || timeStamp;

        var diff = timeStamp - startTime;

        if (diff >= DURATION) {
            container.scrollTop = to;
            return;
        }

        var distance = to - from;

        container.scrollTop = from + ((timeStamp - startTime) / DURATION * distance)
        next();
    }
});