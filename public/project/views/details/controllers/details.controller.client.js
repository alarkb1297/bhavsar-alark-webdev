(function () {

    angular
        .module("booKlub")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, bookService, $sce, $location) {

        var model = this;

        model.volumeId = $routeParams.volumeId;

        model.searchBookByTitle = searchBookByTitle;
        model.searchBookByAuthor = searchBookByAuthor;

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

        function searchBookByTitle(bookTitle) {

            if (bookTitle) {
                bookService
                    .searchBookByTitle(bookTitle)
                    .then(function (response) {
                        $location.path("/search/title/" + bookTitle);
                    })
            } else {
                model.errorMessage = "Please enter a title value";
            }
        }

        function searchBookByAuthor(bookAuthor) {

            if (bookAuthor) {
                bookService
                    .searchBookByTitle(bookAuthor)
                    .then(function (response) {
                        $location.path("/search/author/" + bookAuthor);
                    })
            } else {
                model.errorMessage = "Please enter a author value";
            }
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

    }
})();
