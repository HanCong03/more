/**
 * Author: hancong05@meituan.com
 * Date: 15/11/6
 */

'use strict';

jQuery(function ($) {
    var $contactBody = $('.contact-body');
    var DELAY_TIMER = null;

    $(document).on('activepage', function (evt, name) {
        if (name !== 'contact') {
            clear();
            return;
        }

        start();
    });

    function start() {
        DELAY_TIMER = setTimeout(function () {
            show();
        }, 300);
    }

    function clear() {
        clearTimeout(DELAY_TIMER);
        hide();
    }

    function show() {
        $contactBody.addClass('in');
    }

    function hide() {
        $contactBody.removeClass('in');
    }
});