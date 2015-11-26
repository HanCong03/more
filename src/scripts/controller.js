/**
 * Author: hancong05@meituan.com
 * Date: 15/11/26
 */

'use strict';

jQuery(function () {
    var CURRENT_BOX = 'welcome';

    MORE.changePage = function (to) {
        switch (to) {
            case 'welcome':
                toWelcome();
                break;

            default:
                toPage(to);
                break;
        }
    };

    function toWelcome() {
        CURRENT_BOX = 'welcome';

        MORE.toWelcomeBox(function () {
            MORE.clearNavState();
        });
    }

    function toPage(pageName) {
        if (CURRENT_BOX === 'welcome') {
            CURRENT_BOX = 'page';

            MORE.setToPage(pageName);
            setTimeout(function () {
                MORE.toPageBox();
            }, 17);
            return;
        }

        MORE.resetPage(pageName);
    }
});