/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;

        var userID = $routeParams["userID"];


        model.createWebsite = createWebsite;

        function init() {
            //model.website = websiteService.findWebsiteById(model.webID);
            model.websites = websiteService.findWebsitesForUser(model.userID);

        }
        init();


        function createWebsite(website) {
            websiteService.createWebsite(userID, website);
            $location.url("/user/" + userID + "/website");
        }

    }

})();