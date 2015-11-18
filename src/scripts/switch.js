/**
 * Author: hancong05@meituan.com
 * Date: 15/11/5
 */

'use strict';

jQuery(function ($) {
    var $welcomeBox = $('.welcome-box');
    var $pageBox = $('.page-box');
    var $banner = $('.banner');
    var $doc = $(document);

    $doc.on('routerchange', function (evt, data) {
        var newIndex = data.index;
        var oldIndex = data.oldIndex;

        if (newIndex === 0) {
            scrollToWelcome();
        } else if (oldIndex === 0) {
            scrollToPage(newIndex);
        } else {
            scrollPage(newIndex);
        }
    });

    function scrollToWelcome() {
        $welcomeBox.removeClass('invisible');
        $banner.removeClass('visible');
        $pageBox.removeClass('visible');

        $doc.trigger('welcomeshow');
    }

    function scrollToPage(index) {
        $welcomeBox.addClass('invisible');
        $banner.addClass('visible');
        $pageBox.addClass('visible');

        $doc.trigger('pageshow')
        $doc.trigger('topage', index);
    }

    function scrollPage(index) {
        $doc.trigger('topage', index);
    }
});