/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {

        var model = this;

        model.webID = $routeParams.webID;
        model.userID = $routeParams.userID;
        model.pageID = $routeParams.pageID;
        model.widgetID = $routeParams.widgetID;


        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetID);
        }

        init();


        function updateWidget(widget) {

            widgetService.updateWidget(model.widgetID, widget);
            $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/" + model.pageID + "/widget/");
        }

        function deleteWidget(widgetID) {

            widgetService.deleteWidget(widgetID);
            $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/" + model.pageID + "/widget/");
        }

    }

})();