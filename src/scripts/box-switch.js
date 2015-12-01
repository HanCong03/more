/**
 * Author: hancong05@meituan.com
 * Date: 15/11/26
 */

'use strict';

jQuery(function () {
    var $welcomeBox = $('.welcome-box');
    var $pageBox = $('.page-box');
    var $banner = $('.banner');

    var cbs = [];

    function toPageBox(cb) {
        if (cb) {
            cbs.push(cb);
        }

        $welcomeBox.addClass('invisible');
        $pageBox.addClass('visible');
        $banner.addClass('fixed');
    }

    function toWelcomeBox(cb) {
        cbs.push(cb);

        $welcomeBox.removeClass('invisible');
        $pageBox.removeClass('visible');
        $banner.removeClass('fixed');
    }

    $welcomeBox.on('transitionend', function () {
        var cb;

        while (cb = cbs.shift()) {
            cb();
        }
    });

    MORE.toPageBox = toPageBox;
    MORE.toWelcomeBox = toWelcomeBox;
});