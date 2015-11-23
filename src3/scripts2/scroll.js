jQuery(function ($) {
    var lastTime = Date.now();
    var DELAY = 300;
    var direction = false;

    $(document).on('mousewheel', function (evt) {
        //evt.preventDefault();
        evt = evt.originalEvent;

        if (evt.timeStamp - lastTime <= DELAY) {
            lastTime = evt.timeStamp;
            return;
        }

        lastTime = evt.timeStamp;
        console.log(evt)

        if (evt.wheelDelta < 0) {
            console.log('down')
        } else if (evt.wheelDelta > 0) {
            console.log('up')
        }
    });
});