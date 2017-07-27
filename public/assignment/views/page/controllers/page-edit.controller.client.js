(function () {

    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location) {
        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;
        model.pageID = $routeParams.pageID;

        model.updatePage = updatePage;
        model.deletePage = deletePage;


        function init() {
            pageService
                .findPageById(model.pageID)
                .then(function (page) {
                    model.page = page;
                })

            pageService
                .findPagesByWebsiteId(model.webID)
                .then(function (pages) {
                    model.pages = pages;
                })
        }

        init();


        function updatePage(page) {
            pageService
                .updatePage(model.pageID, page)
                .then(function (page) {
                    $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/");
                })
        }

        function deletePage(pageID) {
            pageService
                .deletePage(pageID)
                .then(function (page) {
                    $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/");
                })
        }
    }

})();