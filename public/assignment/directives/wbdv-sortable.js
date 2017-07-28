(function () {

    angular
        .module("wbdvDirectives", [])
        .directive("widgetSort", widgetSort);
    
    
    function widgetSort() {

        function linkFunction(element, scope) {
            $(element).sortable();
        }

        return {
            link: linkFunction
        }
        
    }

})();