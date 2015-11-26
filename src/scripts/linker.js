/**
 * Author: hancong05@meituan.com
 * Date: 15/11/26
 */

'use strict';

jQuery(function () {
    $(document).on('click', 'a', function (evt) {
        var to = this.getAttribute('to');

        if (to === null) {
            return;
        }

        evt.stopPropagation();
        evt.preventDefault();

        MORE.changePage(to);
    });
});