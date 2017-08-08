(function () {

    angular
        .module("booKlub")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            //search routes
            .when("/", {
                templateUrl: "./views/search/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:volumeId", {
                templateUrl: "./views/details/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/search/:searchOption/:searchQuery", {
                templateUrl: "./views/search/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            //user routes
            .when("/login", {
                templateUrl: "./views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "./views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "./views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })

    }

})();