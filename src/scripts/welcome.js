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

    var $welcomeAnimationImage = $('#welcomeAnimationImage');
    var $finallImage = $($welcomeAnimationImage[0].cloneNode(true));

    $finallImage[0].setAttribute('class', 'welcome-image finall-welcome-image')

    $('.welcome-text').append($finallImage);

    var animation = new Vivus('welcomeAnimationImage', {
            type: 'delayed',
            duration: 300,
            start: 'manual',
            dashGap: 0,
            pathTimingFunction: Vivus.LINEAR
        },
        function () {
            $finallImage.css({
                opacity: 1
            });

            $welcomeAnimationImage.css({
                opacity: 0
            });

            $('.entry-btn').addClass('show');
        });

    window.setTimeout(function () {
        animation.play();
    }, 2000);
});