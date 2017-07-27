/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;

        function init() {
            pageService
                .findPagesByWebsiteId(model.webID)
                .then(function (pages) {
                    model.pages = pages;
                })
        }

        init();
    }

})();