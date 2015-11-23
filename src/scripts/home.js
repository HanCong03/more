/**
 * Author: hancong05@meituan.com
 * Date: 15/11/6
 */

'use strict';

jQuery(function ($) {
    var $homePage = $('.home-page');
    var $homeBg = $('#homeBg');
    var IMAGE_WIDTH = 2560;
    var IMAGE_HEIGHT = 1706;
    var MIN_HEIGHT = 500;

    var index = 0;
    var TEXT = [
        'We are products supplier',
        'We are service provider',
        'We are designer',
        'We are developer'
    ];

    var $container = $('.page-container');
    var containerWidth;
    var containerHeight;

    //$('.tlt').textillate({
    //    loop: true,
    //    minDisplayTime: 2000,
    //    autoStart: true,
    //    in: {
    //        effect: 'bounceIn',
    //        reverse: true
    //    },
    //    out: {
    //        effect: 'flipOutY',
    //        reverse: true,
    //        callback: function () {
    //            index = (index + 1) % 4;
    //            document.getElementById('tltText').innerHTML = TEXT[index];
    //        }
    //    }
    //});

    resize();

    function resize() {
        var rect = resetBoxSize();

        $homePage.css({
            height: rect.boxHeight
        });

        $homeBg.css({
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
        });
    }

    function resetBoxSize() {
        containerWidth = $container.width();
        containerHeight = $container.height();

        var scale = containerWidth / IMAGE_WIDTH;
        var width = IMAGE_WIDTH * scale;
        var height = IMAGE_HEIGHT * scale;

        var boxHeight = Math.min(containerHeight, height);
        boxHeight = Math.max(boxHeight, MIN_HEIGHT);

        return {
            boxHeight: boxHeight,
            width: width,
            height: height,
            top: (boxHeight - height) / 2,
            left: (containerWidth - width) / 2
        }
    }

    $(window).on('resize', resize);
});