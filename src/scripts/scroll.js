/**
 * Author: hancong05@meituan.com
 * Date: 15/11/26
 */

'use strict';

jQuery(function () {
    var pageContainer = $('.page-container')[0];
    var timer = null;
    var isDisabled = false;
    var DELAY = 66;
    var pages = $('.page[positionable]');
    var allPages = $('.page');

    MORE.disableScroll = function () {
        isDisabled = true;
        clearTimeout(timer);
        timer = null;
    };

    MORE.enableScroll = function () {
        isDisabled = false;
    };

    $(pageContainer).on('scroll', function () {
        if (timer || isDisabled) {
            return;
        }

        start();
    });

    function start() {
        timer = setTimeout(check, DELAY);
    }

    function check() {
        timer = null;

        var subPage;

        var scrollTop = pageContainer.scrollTop;
        var boxHeight = pageContainer.offsetHeight;

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