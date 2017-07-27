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
            "updateWidget": updateWidget
        };
        return api;

        function createWidget(pageID, widget) {

            var url = "/api/page/" + pageID + "/widget";

            return $http.post(url, widget)
                .then(function (response) {
                    var widget = response.data;
                    return widget;
                });

            /*widget._id = (new Date()).getTime() + "";
             widget.pageId = pageID;

             widgets.push(widget);

             return widget;*/
        }

        function findWidgetsByPageId(pageID) {

            var url = "/api/page/" + pageID + "/widget";

            return $http.get(url)
                .then(function (response) {
                    var widgets = response.data;
                    return widgets;
                });

            /*var wdgts = [];

             for (var w in widgets) {
             if (widgets[w].pageId == pageID) {
             wdgts.push(widgets[w]);
             }
             }
             return wdgts;*/
        }

        function findWidgetById(widgetID) {

            var url = "/api/widget/" + widgetID;

            return $http.get(url)
                .then(function (response) {
                    var widget = response.data;
                    return widget;
                });

            /*for (var w in widgets) {
             if (widgets[w]._id == widgetID) {
             return angular.copy(widgets[w]);
             }
             }
             return;*/
        }

        function updateWidget(widgetID, widget) {

            var url = "/api/widget/" + widgetID;

            return $http.put(url, widget)
                .then(function (response) {
                    var widget = response.data;
                    return widget;
                });

            /*for (var w in widgets) {
             if (widgets[w]._id == widgetID) {
             widgets[w] = widget;
             return widgets[w];
             }
             }
             return null;*/
        }

        function deleteWidget(widgetID) {

            var url = "/api/widget/" + widgetID;

            return $http.delete(url)
                .then(function (response) {
                    var widget = response.data;
                    return widget;
                });

            /*for (var w in widgets) {
             if (widgets[w]._id == widgetID) {
             widgets.splice(w, 1);
             return;
             }
             }
             return null;*/
        }

    }


})();