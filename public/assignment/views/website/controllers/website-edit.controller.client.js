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

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findWebsiteById(model.webID)
                .then(function (website) {
                    model.website = website;
                });

            websiteService
                .findWebsitesForUser(model.userID)
                .then(function (websites) {
                    model.websites = websites;
                })
        }

        init();

        function updateWebsite(website) {
            websiteService
                .updateWebsite(model.webID, website)
                .then(function (website) {
                    $location.url("/user/" + model.userID + "/website");
                })
        }

        function deleteWebsite(webID) {
            websiteService
                .deleteWebsite(webID)
                .then(function (website) {
                    $location.url("/user/" + model.userID + "/website");
                })

        }
    }

})();