(function (window) {
    var PAGE_INDEX = {};
    var FIRST_PAGE_NAME = 'welcome';
    var currentPage = FIRST_PAGE_NAME;
    var CB_LIST = [];

    (function () {
        [FIRST_PAGE_NAME, 'home', 'about', 's&p', 'brands', 'contact', 'p&c'].forEach(function (item, index) {
            PAGE_INDEX[item] = index;
        });
    })();

    window.Router = {
        to: function (pageName) {
            var newIndex = PAGE_INDEX[pageName];

            if (pageName === currentPage || newIndex === undefined) {
                return;
            }

            var oldIndex = PAGE_INDEX[currentPage];
            currentPage = pageName;

            emit(newIndex, oldIndex);
        },

        onchange: function (cb) {
            CB_LIST.push(cb);
        }
    };

    function emit(newIndex, oldIndex) {
        CB_LIST.forEach(function (cb) {
            cb(newIndex, oldIndex);
        });
    }
})(window);