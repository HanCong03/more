/**
 * Author: hancong05@meituan.com
 * Date: 15/11/25
 */

'use strict';

jQuery(function ($) {
    var IMAGE_WIDTH = 2560;
    var OFFSET = 200;
    var $welcomeBg = $('.welcome-bg');
    var pageWidth;

    //resize();
    //
    //function resize() {
    //    pageWidth = document.documentElement.clientWidth;
    //
    //    var imageInfo = getImageWidth();
    //
    //    $welcomeBg.css('width', imageInfo.width);
    //}
    //
    //
    //function getImageWidth() {
    //    var diff = IMAGE_WIDTH - pageWidth;
    //    var imageWidth = IMAGE_WIDTH;
    //
    //    if (diff < OFFSET) {
    //        imageWidth = pageWidth + OFFSET;
    //        diff = imageWidth - pageWidth;
    //    }
    //
    //    return {
    //        width: imageWidth,
    //        diff: diff
    //    };
    //}
    //
    //$(window).on('resize', resize);
});