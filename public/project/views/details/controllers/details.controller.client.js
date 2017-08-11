(function () {

    angular
        .module("booKlub")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, bookService, $sce, $location, user, userService) {

        var model = this;

        model.volumeID = $routeParams.volumeID;
        model.user = user;

        model.searchBookByTitle = searchBookByTitle;
        model.searchBookByAuthor = searchBookByAuthor;
        model.createBook = createBook;


        model.trustHtmlContent = trustHtmlContent;

        function init() {
            bookService
                .searchBookByVolumeId(model.volumeID)
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

        function createBook(book) {
            bookService
                .createBook(model.user, book)
                .then(function (reponse) {
                    model.confMessage = "Book successfully added to your bookShelf";
                })
        }

    }
})();
