/**
 * Author: hancong05@meituan.com
 * Date: 15/11/5
 */

'use strict';

jQuery(function ($) {
    $(document).on('click', 'a', function (evt) {
        var pageName = this.getAttribute('to');

        if (pageName === null) {
            return;
        }

        evt.preventDefault();

        Router.to(pageName);
    });
});