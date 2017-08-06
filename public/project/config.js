(function () {

    angular
        .module("booKlub")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "./views/search/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:volumeId", {
                templateUrl: "./views/details/templates/details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/:searchOption/:searchQuery", {
                templateUrl: "./views/search/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })

    }

})();