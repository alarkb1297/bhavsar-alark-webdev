/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);


    function websiteListController($routeParams) {

        var model = this;

        model.userID = $routeParams.userID;


        function init() {
            model.websites = websiteService.findWebsitesByUser(user);
        }
        init()



    }


})()