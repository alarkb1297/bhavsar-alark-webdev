(function () {

    angular
        .module("booKlub")
        .factory("bookService", bookService);

    function bookService($http) {

        var apiKey = "AIzaSyDo4no47rHc3IwKKdrSYkKG56o1dhOjwjM";

        var api = {
            "searchBookByTitle": searchBookByTitle,
            "searchBookByAuthor": searchBookByAuthor,
            "searchBookByVolumeId": searchBookByVolumeId
        };
        return api;

        function searchBookByVolumeId(volumeId) {

            var url = "https://www.googleapis.com/books/v1/volumes/" + volumeId +"?key=" + apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchBookByTitle(bookTitle) {
            var url = "https://www.googleapis.com/books/v1/volumes?q=" + bookTitle + "&key=" + apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchBookByAuthor(bookAuthor) {
            var url = "https://www.googleapis.com/books/v1/volumes?q=+inauthor:" + bookAuthor + "&key=" + apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }

})();