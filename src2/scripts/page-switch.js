jQuery(function ($) {
    var $pages = $('.page');
    var $pageBox = $('.page-box');
    var $main = $('.main');
    var $navs = $('.nav li');

    var NO_ANIMATION_CLASSNAME = 'no-animation';
    var NORMA_PAGE_VIEW_CLASSNAME = 'normal-view';

    var isScrollUp = true;

    Router.onchange(function (newIndex, oldIndex) {
        updateView(newIndex);
        updateNav(newIndex);

        var $nextPage = $($pages[newIndex]);
        var $currentPage = $($pages[oldIndex]);

        $pageBox.addClass(NO_ANIMATION_CLASSNAME);

        isScrollUp = newIndex > oldIndex;

        delay(function () {
            $nextPage.css('top', isScrollUp ? '100%' : '-100%');

            delay(function () {
                $pageBox.removeClass(NO_ANIMATION_CLASSNAME);

                delay(function () {
                    $nextPage.css('top', 0);
                    $currentPage.css('top', isScrollUp ? '-100%' : '100%');
                });
            });
        });
    });

    function updateView(index) {
        ($main[index === 0 ? 'removeClass' : 'addClass'])(NORMA_PAGE_VIEW_CLASSNAME);
    }

    function updateNav(index) {
        $navs.removeClass('active');
        $($navs[index - 1]).addClass('active');
    }

    function delay(fn) {
        window.setTimeout(fn, 16);
    }
});