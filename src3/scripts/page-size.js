/**
 * Author: hancong05@meituan.com
 * Date: 15/11/5
 */

'use strict';

jQuery(function ($) {
    var $pageContent = $('.page-content');
    var $pageWrap = $('.page-wrap');

    var SCROLLBAR_WIDTH = 10;

    function resize() {
        var width = $pageContent.width();
        $pageWrap.width(width - SCROLLBAR_WIDTH);
    }

    resize();

    $(window).on('resize', resize);
});