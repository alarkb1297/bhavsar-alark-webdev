(function () {

    angular
        .module("booKlub")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, bookService, $sce) {

        var model = this;

        model.volumeId = $routeParams.volumeId;

        model.trustHtmlContent = trustHtmlContent;

        function init() {
            bookService
                .searchBookByVolumeId(model.volumeId)
                .then(function (response) {
                    var book = response;
                    model.book = book;
                });
        }
        init();

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

    }
})();
