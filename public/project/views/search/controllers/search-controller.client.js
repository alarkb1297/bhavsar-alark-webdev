(function () {

    angular
        .module("booKlub")
        .controller("searchController", searchController);

    function searchController(bookService) {

        var model = this;

        model.searchBookByTitle = searchBookByTitle;
        model.searchBookByAuthor = searchBookByAuthor;

        function init() {

        }

        init();


        function searchBookByTitle(bookTitle) {
            if (bookTitle) {
                model.errorMessage = null;
                bookService
                    .searchBookByTitle(bookTitle)
                    .then(function (response) {
                        var books = response.items;
                        model.books = books;
                    });
            } else {
                model.errorMessage = "Please enter a title value";
            }
        }

        function searchBookByAuthor(bookAuthor) {
            if (bookAuthor) {
                model.errorMessage = null;
                bookService
                    .searchBookByAuthor(bookAuthor)
                    .then(function (response) {
                        var books = response.items;
                        model.books = books;
                    });
            } else {
                model.errorMessage = "Please enter an author value";
            }
        }
    }
})();
