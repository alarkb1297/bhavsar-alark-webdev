/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService() {

        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "50%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "50%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget
        };
        return api;

        function createWidget(pageID, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageID;

            widgets.push(widget);

            return widget;
        }

        function findWidgetsByPageId(pageID) {

            var wdgts = [];

            for (var w in widgets) {
                if (widgets[w].pageId == pageID) {
                    wdgts.push(widgets[w]);
                }
            }
            return wdgts;
        }

        function findWidgetById(widgetID) {

            for (var w in widgets) {
                if (widgets[w]._id == widgetID) {
                    return angular.copy(widgets[w]);
                }
            }
            return;
        }

        function updateWidget(widgetID, widget) {

            for (var w in widgets) {
                if (widgets[w]._id == widgetID) {
                    widgets[w] = widget;
                    return widgets[w];
                }
            }
            return null;
        }

        function deleteWidget(widgetID) {

            for (var w in widgets) {
                if (widgets[w]._id == widgetID) {
                    widgets.splice(w, 1);
                    return;
                }
            }
            return null;
        }

    }


})();