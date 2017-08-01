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
            widgetService.findWidgetById(model.widgetID)
                .then(function (widget) {
                    model.widget = widget;
                });
        }

        init();


        function updateWidget(widget) {

            widgetService
                .updateWidget(model.widgetID, widget)
                .then(function (widget) {
                    $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/"
                        + model.pageID + "/widget/");
                });
        }

        function deleteWidget(widgetID) {

            widgetService.deleteWidget(widgetID)
                .then(function (widget) {
                    $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/"
                        + model.pageID + "/widget/");
                });
        }


    }

})();