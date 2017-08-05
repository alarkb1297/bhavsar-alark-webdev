/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "sortWidgets": sortWidgets

        };
        return api;

        function createWidget(pageID, widget) {

            var url = "/api/page/" + pageID + "/widget";

            return $http.post(url, widget)
                .then(function (response) {
                    var widget = response.data;
                    return widget;
                });

        }

        function findWidgetsByPageId(pageID) {

            var url = "/api/page/" + pageID + "/widget";

            return $http.get(url)
                .then(function (response) {
                    var widgets = response.data;
                    return widgets;
                });

        }

        function findWidgetById(widgetID) {

            var url = "/api/widget/" + widgetID;

            return $http.get(url)
                .then(function (response) {
                    var widget = response.data;
                    return widget;
                });

        }

        function updateWidget(widgetID, widget) {

            var url = "/api/widget/" + widgetID;

            return $http.put(url, widget)
                .then(function (response) {
                    return findWidgetById(widgetID);
                });
        }

        function deleteWidget(widgetID) {

            var url = "/api/widget/" + widgetID;

            return $http.delete(url)
                .then(function (response) {
                    var widget = response.data;
                    return widget;
                });
        }

        function sortWidgets(pageID, start, end) {

            var url = "/api/page/" + pageID + "/widget?initial=" + start + "&final=" + end;

            return $http.put(url)
                .then(function (response) {
                    var widgets = response.data;
                    return widgets;
                })
        }
    }


})();