/**
 * Author: hancong05@meituan.com
 * Date: 15/11/6
 */

'use strict';

jQuery(function ($) {
    var $pageContainer = $('.page-container');
    var pageMap = {};

    (function () {
        var $pages = $('.page');
        var currentPage;

        for (var i = 0, len = $pages.length; i < len; i++) {
            currentPage = $pages[i];
            pageMap[currentPage.getAttribute('name')] = currentPage;
        }
    })();

    MORE.resetPage = function (pageName, cb) {
        if (typeof pageName === 'function') {
            cb = pageName;
            pageName = null;
        }

        if (!pageName) {
            $pageContainer[0].scrollTop = 0;

            if (cb) {
                cb();
            }

            return;
        } else {
            toPage(pageName, cb);
        }
    };

    MORE.setToPage = function (pageName) {
        $pageContainer[0].scrollTop = pageMap[pageName].offsetTop;
    };

    function toPage(pageName, cb) {
        var page = pageMap[pageName];

        if (!page) {
            if (cb) {
                cb();
            }

            return;
        }

        MORE.disableScroll();
        MORE.activePage(pageName, pageName);

        $pageContainer.animate({
            scrollTop: page.offsetTop
        }, 500, function () {
            MORE.enableScroll();

            if (cb) {
                cb();
            }
        });
    }
});