/**
 * Author: hancong05@meituan.com
 * Date: 15/11/5
 */

'use strict';

(function () {
    var PAGE_NAME = ['welcome', 'home', 'about', 'service', 'products', 'brands', 'contact', 'p&c'];
    var PAGE_INDEX = {};

    var currentIndex = 0;

    PAGE_NAME.forEach(function (item, index) {
        PAGE_INDEX[item] = index;
    });

    window.Router = {
        to: function (name) {
            var newIndex = PAGE_INDEX[name];
            var oldIndex = currentIndex;

            if (newIndex === undefined) {
                return;
            }

            if (oldIndex === newIndex) {
                return;
            }

            currentIndex = newIndex;

            $(document).trigger('routerchange', {
                oldIndex: oldIndex,
                index: newIndex
            });
        }
    };
})();