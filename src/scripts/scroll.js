/**
 * Author: hancong05@meituan.com
 * Date: 15/11/26
 */

'use strict';

jQuery(function () {
    var pageWrap = $('.page-wrap')[0];
    var timer = null;
    var disableCount = 0;
    var DELAY = 66;
    var pages = $('.page[positionable]');
    var allPages = $('.page');

    MORE.disableScroll = function () {
        disableCount++;
        clearTimeout(timer);
        timer = null;
    };

    MORE.enableScroll = function () {
        disableCount--;
    };

    $(pageWrap).on('scroll', function () {
        if (timer || disableCount !== 0) {
            return;
        }

        start();
    }).on('wheel', function (evt) {
        if (disableCount !== 0) {
            evt.preventDefault();
        }
    });

    function start() {
        timer = setTimeout(check, DELAY);
    }

    function check() {
        timer = null;

        var subPage;

        var scrollTop = pageWrap.scrollTop;
        var boxHeight = pageWrap.offsetHeight;

        var limit = scrollTop + boxHeight / 2;

        // 检查所有page
        for (var i = allPages.length -1; i >= 0; i--) {
            if (allPages[i].offsetTop <= limit) {
                subPage = allPages[i].getAttribute('name');
                break;
            }
        }

        // 检查可定位的page
        for (var i = pages.length - 1; i >= 0; i--) {
            // 命中
            if (pages[i].offsetTop <= limit) {
                MORE.activePage(pages[i].getAttribute('name'), subPage);
                return;
            }
        }
    }
});