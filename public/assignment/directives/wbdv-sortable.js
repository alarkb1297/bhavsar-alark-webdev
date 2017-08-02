(function () {

    angular
        .module("wbdvDirectives", [])
        .directive("widgetSort", widgetSort);

    function widgetSort() {

        function linkFunction(scope, element) {

            var start = -1;
            var end = -1;

            $(element).sortable({

                axis: 'y',

                handle: '.ab-sort-hamburger',

                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();

                    scope.widgetCallback({
                        start: start,
                        end: end
                    });
                }

            });
        }

        return {
            scope: {
                widgetCallback: '&'
            },
            link: linkFunction
        }

    }

})();