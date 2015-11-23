jQuery(function ($) {

    $(document).on('click', 'a', function (evt) {
        var to = this.getAttribute('to');

        if (to === null) {
            return;
        }

        evt.preventDefault();

        Router.to(to);
    });
});