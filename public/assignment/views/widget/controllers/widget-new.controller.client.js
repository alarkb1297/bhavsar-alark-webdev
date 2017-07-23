/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;

        model.webID = $routeParams.webID;
        model.userID = $routeParams.userID;
        model.pageID = $routeParams.pageID;


        model.createWidget = createWidget;

        function init() {

        }

        init();

        function createWidget(widget) {
            widgetService.createWidget(model.pageID, widget);
            $location
                .url("/user/" + model.userID + "/website/"
                    + model.webID + "/page/" + model.pageID + "/widget/" + widget._id);
        }

    }

})();