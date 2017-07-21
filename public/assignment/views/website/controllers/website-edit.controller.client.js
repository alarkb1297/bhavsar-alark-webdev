/**
 * Created by Alark on 7/19/17.
 */
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

        var userID = $routeParams["userID"];
        var webID = $routeParams["webID"];

        model.updateWebsite = updateWebsite;

        function init() {
            model.website = websiteService.findWebsiteById(webID);
            model.websites = websiteService.findWebsitesForUser(userID);
        }
        init();


        function updateWebsite(website) {
            websiteService.updateWebsite(userID, website);
            $location.url("/user/" + userID + "/website");
        }

    }

})();