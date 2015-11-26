/**
 * Author: hancong05@meituan.com
 * Date: 15/11/26
 */

'use strict';

jQuery(function () {
    var navMap = {};
    var pointMap = {};
    var prev = null;
    var prevSubPage = null;
    var $doc = $(document);

    (function () {
        var $navs = $('.nav a');
        var $points = $('.active-point-wrap li');
        var name;
        var node;

        for (var i = 0, len = $navs.length;i < len; i++) {
            node = $navs[i];
            name = node.getAttribute('to');

            navMap[name] = $(node.parentNode);
        }

        for (var i = 0, len = $points.length;i < len; i++) {
            node = $points[i];
            name = node.getAttribute('name');

            pointMap[name] = $(node);
        }
    })();

    MORE.activePage = function (name, subPageName) {
        active(name);

        if (prevSubPage !== subPageName) {
            $doc.trigger('activepage', subPageName);
            prevSubPage = subPageName;
        }
    };

    MORE.clearNavState = function () {
        navMap[prev] && navMap[prev].removeClass('active');
        pointMap[prev] && pointMap[prev].removeClass('active');
    };

    function active(name) {
        if (name === prev) {
            return;
        }

        navMap[prev] && navMap[prev].removeClass('active');
        pointMap[prev] && pointMap[prev].removeClass('active');

        navMap[name] && navMap[name].addClass('active');
        pointMap[name] && pointMap[name].addClass('active');

        prev = name;
    }
});