/**
 * Author: hancong05@meituan.com
 * Date: 15/11/25
 */

'use strict';

jQuery(function ($) {
    var allowScroll = false;
    var $welcomeAnimationImage = $('#welcomeAnimationImage');
    var $finallImage = $($welcomeAnimationImage[0].cloneNode(true));
    var $welcomeBox = $('.welcome-box');
    var $welcomeText = $('.welcome-text');

    var ORIGINAL_WIDTH = 1280;
    var ORIGINAL_HEIGHT = 383;

    var TOP_SPACE = 150;
    var BOTTOM_SPACE = 200;

    $finallImage[0].setAttribute('class', 'welcome-image finall-welcome-image');

    $welcomeText.append($finallImage);

    var animation = new Vivus('welcomeAnimationImage', {
            type: 'delayed',
            duration: 300,
            start: 'manual',
            dashGap: 0,
            pathTimingFunction: Vivus.LINEAR
        },
        function () {
            window.setTimeout(function () {
                $finallImage.css({
                    opacity: 1
                });

                $welcomeAnimationImage.css({
                    opacity: 0
                });

                $('.entry-btn').addClass('show');
                $('#bannerWrap').show(300);

                allowScroll = true;
            }, 100);
        });

    $('.welcome-box').on('wheel', function (e) {
        e.preventDefault();

        if (!allowScroll) {
            return;
        }

        allowScroll = false;

        MORE.disableScroll();
        MORE.changePage('home');

        MORE.toPageBox(function () {
            allowScroll = true;
            window.setTimeout(function () {
                MORE.enableScroll();
            }, 1000);
        });
    });

    window.setTimeout(function () {
        animation.play();
    }, 2000);

    function resize() {
        var height = Math.min($welcomeBox.height() - TOP_SPACE - BOTTOM_SPACE, ORIGINAL_HEIGHT);
        var width = ORIGINAL_WIDTH * height / ORIGINAL_HEIGHT;

        $welcomeText.css({
            width: width,
            height: height
        });
    }

    $(window).on('resize', resize);
    resize();
});