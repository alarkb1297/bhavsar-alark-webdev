/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService, user) {
        var model = this;

        model.userID = user._id;

        function init() {
            websiteService
                .findWebsitesForUser(model.userID)
                .then(function (websites) {
                    model.websites = websites;
                })
        }

        init();

    }

})();