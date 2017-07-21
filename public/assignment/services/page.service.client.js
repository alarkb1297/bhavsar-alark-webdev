(function () {

    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService() {

        //JSON = JS Object Notation
        var pages = [
                {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
                {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
                {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
                {"_id": "6543", "name": "Post 6", "websiteId": "123", "description": "Lorem"}
            ]
        ;

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "updatePage": updatePage
        };
        return api;

        function createPage(webID, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = webID;

            pages.push(page);

            return page;
        }

        function findPagesByWebsiteId(webID) {

            var pgs = [];

            for (var p in pages) {
                if (pages[p].websiteId == webID) {
                    pgs.push(pages[p])
                }
            }
            return pgs;
        }

        function findPageById(pageID) {

            for (var p in pages) {
                if (pages[p]._id == pageID) {
                    return angular.copy(pages[p]);
                }
            }
            return;
        }

        function updatePage(pageID, page) {

            for (var p in pages) {
                if (pages[p]._id == pageID) {
                    pages[p] = page;
                    return pages[p];
                }
            }
            return null;
        }

        function deletePage(pageID) {

            for (var p in pages) {
                if (pages[p]._id == pageID) {
                    pages.splice(p, 1)
                    return;
                }
            }
            return;
        }

    }

})();