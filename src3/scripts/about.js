/**
 * Author', 'hancong05@meituan.com
 * Date', '15/11/6
 */

'use strict';

jQuery(function ($) {
    var currentIndex = 0;
    var $commentList = $('.comment-list');
    var $items = $('li', $commentList);
    var max = $items.length;

    var ANIMATION_CLASSNAME = 'comment-animation';

    var isScrolling = false;

    $('.scroll-button').on('click', function () {
        if (isScrolling) {
            return;
        }

        var type = this.getAttribute('data-type');

        animationPause(function () {
            if (type === 'prev') {
                prevReady(toPrev);
            } else {
                nextReady(toNext);
            }
        });
    });

    function prevReady(cb) {
        var prevIndex = (currentIndex + max - 1) % max;
        $($items[prevIndex]).css('transform', 'translateX(-200%)');
        animationRecovery(cb);
    }

    function nextReady(cb) {
        var nextIndex = (currentIndex + 1) % max;
        $($items[nextIndex]).css('transform', 'translateX(100%)');
        animationRecovery(cb);
    }

    function toPrev() {
        var prevIndex = (currentIndex + max - 1) % max;

        $($items[prevIndex]).css('transform', 'translateX(-100%)');
        $($items[currentIndex]).css('transform', 'translateX(0)');

        currentIndex = prevIndex;
        isScrolling = false;
    }

    function toNext() {
        var nextIndex = (currentIndex + max - 1) % max;

        $($items[nextIndex]).css('transform', 'translateX(-100%)');
        $($items[currentIndex]).css('transform', 'translateX(-200%)');

        currentIndex = nextIndex;
        isScrolling = false;
    }


    function animationPause(cb) {
        isScrolling = true;
        $commentList.removeClass(ANIMATION_CLASSNAME);
        window.setTimeout(cb, 16);
    }

    function animationRecovery(cb) {
        window.setTimeout(function () {
            $commentList.addClass(ANIMATION_CLASSNAME);
            cb();
        }, 16);
    }
});