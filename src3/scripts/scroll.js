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

    $(window).on('resize', resetPagePosition);

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

    function resetPagePosition() {
        var rect;
        var offset = 0;
        var navIndex = -1;
        var $currentPage;

        pagePosition = [];
        boxHeight = $pageContainer.height();

        for (var i = 0, len = $pages.length; i < len; i++) {
            rect = $pages[i].getBoundingClientRect();

            $currentPage = $($pages[i]);

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

    function checkPage() {
        var current;

        var scrollInPages = [];
        var scrollOutPages = [];

        var mainPages = [];

        var invisiblePages = [];
        var visiblePages = [];

        var viewBoxOffsetTop = $pageContainer[0].scrollTop;
        var viewBoxOffsetBottom = viewBoxOffsetTop + boxHeight;

        for (var i = 0, len = pagePosition.length; i < len; i++) {
            current = pagePosition[i];

            if (viewBoxOffsetTop >= current.bottom || viewBoxOffsetBottom <= current.top) {
                invisiblePages.push(i);
            } else {
                visiblePages.push(i);
            }
        }

        var newVisible = $.extend(true, {}, currentVisiblePage);
        var activeIndex = -1;
        var index;
        var currentPosition;
        var viewHeight;
        var top;
        var bottom;

        for (var i = 0, len = visiblePages.length; i < len; i++) {
            index = visiblePages[i];
            currentPosition = pagePosition[index];

            top = Math.max(viewBoxOffsetTop, currentPosition.top);
            bottom = Math.min(viewBoxOffsetBottom, currentPosition.bottom);

            viewHeight = bottom - top;

            if (viewHeight >= boxHeight / 2 || viewHeight >= (currentPosition.height / 2)) {
                mainPages.push(index);
            }
        }

        activeIndex = pagePosition[mainPages[0]].navIndex;

        //if (hasIn) {
        //    $doc.trigger('scrollin', inResult);
        //}
        //
        //if (hasOut) {
        //    $doc.trigger('scrollout', outResult);
        //}
        //
        $doc.trigger('navactive', activeIndex);
    }
});