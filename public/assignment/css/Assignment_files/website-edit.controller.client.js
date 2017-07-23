/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;

        // var userID = $routeParams["userID"];
        // var webID = $routeParams["webID"];

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;


        function init() {
            model.website = websiteService.findWebsiteById(model.webID);
            model.websites = websiteService.findWebsitesForUser(model.userID);
        }
        init();


        function updateWebsite(website) {
            websiteService.updateWebsite(model.webID, website);
            $location.url("/user/" + model.userID + "/website");
        }

        function deleteWebsite(webID) {
            websiteService.deleteWebsite(webID);
            $location.url("/user/" + model.userID + "/website");
        }
    }

})();