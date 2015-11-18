/**
 * Author: hancong05@meituan.com
 * Date: 15/11/3
 */

'use strict';

jQuery(function ($) {
    var index = 0;
    var TEXT = [
        'We are products supplier',
        'We are service provider',
        'We are designer',
        'We are developer'
    ];

    $('.tlt').textillate({
        loop: true,
        minDisplayTime: 2000,
        autoStart: true,
        in: {
            effect: 'bounceIn',
            reverse: true
        },
        out: {
            effect: 'flipOutY',
            reverse: true,
            callback: function () {
                index = (index + 1) % 4;
                document.getElementById('tltText').innerHTML = TEXT[index];
            }
        }
    });
});