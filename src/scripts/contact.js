/**
 * Author: hancong05@meituan.com
 * Date: 15/11/6
 */

'use strict';

jQuery(function ($) {
    var $contactBody = $('.contact-body');

    function show() {
        $contactBody.addClass('in');
    }

    function hide() {
        $contactBody.removeClass('in');
    }

    window.hide = hide;
    window.show = show;
});