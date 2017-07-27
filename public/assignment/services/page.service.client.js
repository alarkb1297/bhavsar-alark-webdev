(function () {

    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService($http) {

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "updatePage": updatePage
        };
        return api;

        function createPage(webID, page) {

            var url = "/api/website/" + webID + "/page";

            return $http.post(url, page)
                .then(function (response) {
                    var page = response.data;
                    return page;
                });

            /*page._id = (new Date()).getTime() + "";
             page.websiteId = webID;

             pages.push(page);

             return page;*/
        }

        function findPagesByWebsiteId(webID) {

            var url = "/api/website/" + webID + "/page";

            return $http.get(url)
                .then(function (response) {
                    var pages = response.data;
                    return pages;
                });

            /*var pgs = [];

            for (var p in pages) {
                if (pages[p].websiteId == webID) {
                    pgs.push(pages[p])
                }
            }
            return pgs;*/
        }

        function findPageById(pageID) {

            var url = "/api/page/" + pageID;

            return $http.get(url)
                .then(function (response) {
                    var page = response.data;
                    return page;
                })

            /*for (var p in pages) {
                if (pages[p]._id == pageID) {
                    return angular.copy(pages[p]);
                }
            }
            return;*/
        }

        function updatePage(pageID, page) {

            var url = "/api/page/" + pageID;

            return $http.put(url, page)
                .then(function (response) {
                    var page = response.data;
                    return page;
                })


            /*for (var p in pages) {
                if (pages[p]._id == pageID) {
                    pages[p] = page;
                    return pages[p];
                }
            }
            return null;*/
        }

        function deletePage(pageID) {

            var url = "/api/page/" + pageID;

            return $http.delete(url)
                .then(function (response) {
                    var page = response.data;
                    return page;
                })

            /*for (var p in pages) {
                if (pages[p]._id == pageID) {
                    pages.splice(p, 1)
                    return;
                }
            }
            return;*/
        }

    }

})();