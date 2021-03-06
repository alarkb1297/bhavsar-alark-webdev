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


        model.createWebsite = createWebsite;

        function init() {

            model.websites = websiteService.findWebsitesForUser(model.userID);

        }
        init();


        function createWebsite(website) {
            websiteService.createWebsite(model.userID, website);
            $location.url("/user/" + model.userID + "/website");
        }

    }

})();