jQuery(function ($) {
    var $banner = $('.banner');

    $('.hotspot').on('click', function () {
        $banner.addClass('fixed');
    });
});