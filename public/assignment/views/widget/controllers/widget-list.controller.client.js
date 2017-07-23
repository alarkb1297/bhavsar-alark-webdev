/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;
        model.pageID = $routeParams.pageID;

        model.trustSrc = trustSrc;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageID);
        }

        init();

        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

    }

})();