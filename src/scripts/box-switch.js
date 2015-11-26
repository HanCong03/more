/**
 * Author: hancong05@meituan.com
 * Date: 15/11/26
 */

'use strict';

jQuery(function () {
    var $welcomeBox = $('.welcome-box');
    var $pageBox = $('.page-box');
    var $banner = $('.banner');

    var callback = null;

    function toPageBox(cb) {
        callback = cb;

        $welcomeBox.addClass('invisible');
        $pageBox.addClass('visible');
        $banner.addClass('fixed');
    }

    function toWelcomeBox(cb) {
        callback = cb;

        $welcomeBox.removeClass('invisible');
        $pageBox.removeClass('visible');
        $banner.removeClass('fixed');
    }

    $welcomeBox.on('transitionend', function () {
        if (!callback) {
            return;
        }

        callback();
    });

    MORE.toPageBox = toPageBox;
    MORE.toWelcomeBox = toWelcomeBox;
});