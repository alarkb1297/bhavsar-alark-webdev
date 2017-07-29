(function () {

    angular
        .module("wbdvDirectives", [])
        .directive("widgetSort", widgetSort);


    function widgetSort() {

        function linkFunction(scope, element) {
            $(element).sortable();
        }

        return {
            link: linkFunction
        }

    }

})();