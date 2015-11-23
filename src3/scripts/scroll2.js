/**
 * Author: hancong05@meituan.com
 * Date: 15/11/15
 */

'use strict';

jQuery(function ($) {
    var $pages = $('.page');
    var $doc = $(document);

    var BANNER_HEIGHT = 100;
    var TIMEOUT = 30;
    var Timer = null;

    var PAGENAMES = ['home', 'about', 'service', 'work', 'skills', 'products', 'numbers', 'concat'];

    var currentVisiblePage = {};
    var pagePosition = [];
    var boxHeight = 0;
    var $pageContainer = $('.page-content');

    $(document).on('pageshow', function () {
        resetPagePosition();
        $pageContainer.trigger('scroll');
    }).on('welcomeshow', function () {
        // 重置
        currentVisiblePage = {};
        pagePosition = [];
    });

    resetPagePosition();

    $pageContainer.on('scroll', function (evt) {
        if (Timer) {
            return;
        }

        start();
    });

    function start() {
        Timer = setTimeout(function () {
            Timer = null;
            checkPage();
        }, TIMEOUT);
    }

    function checkPage() {
        var scrollTop = $pageContainer[0].scrollTop;
        var current;

        var invisible = [];
        var visible = [];

        var pageTop = scrollTop;
        var pageBottom = pageTop + boxHeight;

        var height;

        for (var i = 0, len = pagePosition.length; i < len; i++) {
            current = pagePosition[i];

            if (pageTop >= current.bottom || pageBottom <= current.top) {
                invisible.push(i);
            } else {
                height = Math.min(pageBottom, current.bottom) - Math.max(pageTop, current.top);

                if (height >= boxHeight / 2 || height >= (current.height * 2 / 3)) {
                    visible.push(i);
                }
            }
        }

        var inResult = {};
        var outResult = {};
        var hasIn = false;
        var hasOut = false;

        var index;
        var newVisible = $.extend(true, {}, currentVisiblePage);
        var activeIndex = -1;

        for (var i = 0, len = visible.length; i < len; i++) {
            index = visible[i];

            newVisible[index] = true;

            // 当前显示中
            if (currentVisiblePage[index]) {
                continue;
            }

            inResult[PAGENAMES[index]] = true;
            hasIn = true;
        }

        for (var i = 0, len = invisible.length; i < len; i++) {
            index = invisible[i];
            delete newVisible[index];

            // 之前不可见
            if (!currentVisiblePage[index]) {
                continue;
            }

            outResult[PAGENAMES[index]] = true;
            hasOut = true;
        }

        currentVisiblePage = newVisible;

        if (hasIn) {
            $doc.trigger('scrollin', inResult);
        }

        if (hasOut) {
            $doc.trigger('scrollout', outResult);
        }

        var activeIndex = findActiveIndex(newVisible);

        $doc.trigger('navactive', activeIndex);
    }

    function resetPagePosition() {
        var rect;
        var offset = 0;
        var navIndex = -1;
        var $currentPage;

        pagePosition = [];
        boxHeight = $pageContainer.height();

        for (var i = 0, len = $pages.length; i < len; i++) {
            rect = $pages[0].getBoundingClientRect();

            $currentPage = $($pages[0]);

            if ($currentPage.hasClass('navigable')) {
                navIndex++;
            }

            pagePosition.push({
                top: offset,
                bottom: offset + rect.height,
                height: rect.height,
                navIndex: navIndex
            });

            offset += rect.height;
        }
    }

    function findActiveIndex(visiblePages) {
        var keys = Object.keys(visiblePages);
        var rect;
        var index;

        for (var i = 0, len = keys.length; i < len; i++) {
            index = keys[i];

            rect = $pages[index].getBoundingClientRect();

            if (rect.top > BANNER_HEIGHT) {
                console.log(pagePosition[index].navIndex, index, visiblePages)
                return pagePosition[index].navIndex;
            }

            if (BANNER_HEIGHT - rect.top < rect.height / 2) {
                console.log(pagePosition[index].navIndex, index, visiblePages)
                return pagePosition[index].navIndex;
            }
        }

        console.log('bad', visiblePages)
        return pagePosition[len - 1].navIndex;
    }
});