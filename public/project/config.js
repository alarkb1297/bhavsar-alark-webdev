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
                controllerAs: "model",
                resolve: {
                    user: checkLoginHome
                }
            })
            .when("/details/:volumeID", {
                templateUrl: "./views/details/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginDetails
                }
            })
            .when("/search/:searchOption/:searchQuery", {
                templateUrl: "./views/search/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginHome
                }
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
            .when("/profile", {
                templateUrl: "./views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/profile/edit", {
                templateUrl: "./views/user/templates/profile-edit.view.client.html",
                controller: "profileEditController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
    }

    function checkLogin(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkLoginHome(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.resolve(null);
                    $location.url("/");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkLoginDetails(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.resolve(null);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();