/**
 * Created by Alark on 7/17/17.
 */

(function () {

    angular
        .module("omdbApp", ["ngRoute"])
        .controller("searchController", searchController)
        .server("movieService", movieService)
        .config(configuration);


    function configuration($routeProvider) {


        $routeProvider
            .when("/", {
                templateURL: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateURL: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            })

    }

    function detailsController($routeParams, movieService) {

        var model = this;

        model.imdbID = $routeParams.imdbID;

        function init() {

            movieService
                .searchMovieByImdbId(model.imdbID)
                .then(renderMovie);

        }

        init();

        function renderMovie(movie) {
            model.movie = movie;
        }

    }


    function searchController(movieService) {

        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {

        }

        init();


        function searchMovieByTitle(movieTitle) {
            movieService.searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }

    }


    function movieService() {

        this.searchMovieByTitle = searchMovieByTitle;

        function searchMovieByTitle(movieTitle) {

            var url = "http://www.omdbapi.com/?s=" + movieTitle + "&apikey=";

            return $http.get(url)
                .then(function (resposne) {
                    return resposne.data;
                })
        }

        function searchMovieByImdbId(imdbID) {

            var url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey=";

            return $http.get(url)
                .then(function (resposne) {
                    return resposne.data;
                })
        }

    }

})();