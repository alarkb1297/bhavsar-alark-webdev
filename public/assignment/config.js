/**
 * Created by Alark on 7/17/17.
 */

(function () {

    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"

            })

            .when("/profile/:userID", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })

        //website routes
            .when("/user/:userID/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })

            .when("/user/:userID/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })

            .when("/user/:userID/website/:webID", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })

            //page routes
            .when("/user/:userID/website/:webID/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })

            .when("/user/:userID/website/:webID/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })

            .when("/user/:userID/website/:webID/page/:pageID", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })

            //wigdet routes
            .when("/user/:userID/website/:webID/page/:pageID/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })

            .when("/user/:userID/website/:webID/page/:pageID/widget/new", {
                templateUrl: "views/widget/widget-new.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })

            .when("/user/:userID/website/:webID/page/:pageID/widget/:widgetID", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })

    }

})()
