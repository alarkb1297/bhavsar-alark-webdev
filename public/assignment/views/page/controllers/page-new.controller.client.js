/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;
        model.pageID = $routeParams.pageID;


        model.createPage = createPage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.webID)
                .then(function (pages) {
                    model.pages = pages;
                })
        }

        init();


        function createPage(page) {
            pageService
                .createPage(model.webID, page)
                .then(function (page) {
                    $location.url("/user/" + model.userID + "/website/" + model.webID + "/page");
                })
        }

    }

})();