
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
            model.page = pageService.findPageById(model.pageID);
            model.pages = pageService.findPagesByWebsiteId(model.webID);
        }
        init();


        function updatePage(page) {
            pageService.updatePage(model.pageID, page);
            $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/");
        }

        function deletePage(pageID) {
            pageService.deletePage(pageID);
            $location.url("/user/" + model.userID + "/website/" + model.webID + "/page/");
        }
    }

})();