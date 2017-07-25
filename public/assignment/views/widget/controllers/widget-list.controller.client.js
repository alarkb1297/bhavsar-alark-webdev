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

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageID);
        }

        init();

        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function youtube_parser(url){
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return trustSrc("//www.youtube.com/embed/" + match[2]);
            } else {
                return;
            }
        }

    }

})();