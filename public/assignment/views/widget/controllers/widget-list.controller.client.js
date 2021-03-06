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
        model.youtube_parser = youtube_parser;
        model.trustHtmlContent = trustHtmlContent;
        model.sortWidgets = sortWidgets;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageID)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
        }

        init();

        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function youtube_parser(url) {
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return trustSrc("//www.youtube.com/embed/" + match[2]);
            } else {
                return;
            }
        }

        function sortWidgets(start, end) {
            widgetService
                .sortWidgets(model.pageID, start, end)
                .then(function (widgets) {

                })
        }

    }

})();