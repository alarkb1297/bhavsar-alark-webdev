(function () {

    angular
        .module("booKlub")
        .controller("searchController", searchController);

    function searchController(bookService, $routeParams, $location) {

        var model = this;

        model.searchBookByTitle = searchBookByTitle;
        model.searchBookByAuthor = searchBookByAuthor;

        model.searchOption = $routeParams.searchOption;
        model.searchQuery = $routeParams.searchQuery;

        function init() {

            if (model.searchOption !== null) {
                if (model.searchOption === "title") {
                    searchBookByTitle(model.searchQuery);
                }
                if (model.searchOption === "author") {
                    searchBookByAuthor(model.searchQuery);
                }
            }

        }
        init();


        function searchBookByTitle(bookTitle) {

            model.searchQuery = bookTitle;

            $location.url("/title/" + model.searchQuery);

            if (model.searchQuery) {
                model.errorMessage = null;
                bookService
                    .searchBookByTitle(model.searchQuery)
                    .then(function (response) {
                        var books = response.items;
                        model.books = books;
                    });
            } else {
                model.errorMessage = "Please enter a title value";
            }
        }

        function searchBookByAuthor(bookAuthor) {

            model.searchQuery = bookAuthor;

            $location.url("/author/" + model.searchQuery);

            if (model.searchQuery) {
                model.errorMessage = null;
                bookService
                    .searchBookByAuthor(model.searchQuery)
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
