/**
 * Author', 'hancong05@meituan.com
 * Date', '15/11/6
 */

'use strict';

jQuery(function ($) {
    var ORIGINAL_WIDTH = 1350;
    var ORIGINAL_HEIGHT = 720;

    var $page = $('.product-page');
    var $hotspotList = [];
    var $hotspots = $('.product-control>li');

    var POINTS = [{
        // accessories
        x: 107,
        y: 297
    }, {
        // fitness
        x: 345,
        y: 223
    }, {
        // outdoor
        x: 635,
        y: 269
    }, {
        // sports
        x: 555,
        y: 407
    }, {
        // promotional
        x: 907,
        y: 165
    }, {
        // bags
        x: 983,
        y: 394
    }, {
        // oem
        x: 1155,
        y: 191
    }];

    for(var i = 0, len = $hotspots.length; i < len; i++) {
        $hotspotList[i] = $($hotspots[i]);
    }

    init();

    function init() {
        var realWidth = $page.width();
        var scale = realWidth / ORIGINAL_WIDTH;
        var realHeight = ORIGINAL_HEIGHT * scale;

        $page.css({
            width: realWidth,
            height: realHeight
        });


        for (var i = 0, len = $hotspotList.length; i < len; i++) {
            $hotspotList[i].css({
                left: POINTS[i].x * scale,
                top: POINTS[i].y * scale
            });
        }
    }
});