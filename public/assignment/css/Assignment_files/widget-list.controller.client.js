/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $location) {
        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;
        model.pageID = $routeParams.pageID;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageID);
        }
        init();



    }

})();