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

        }

        function findPagesByWebsiteId(webID) {

            var url = "/api/website/" + webID + "/page";

            return $http.get(url)
                .then(function (response) {
                    var pages = response.data;
                    return pages;
                });
        }

        function findPageById(pageID) {

            var url = "/api/page/" + pageID;

            return $http.get(url)
                .then(function (response) {
                    var page = response.data;
                    return page;
                })

        }

        function updatePage(pageID, page) {

            var url = "/api/page/" + pageID;

            return $http.put(url, page)
                .then(function (response) {
                    var page = response.data;
                    return page;
                })

        }

        function deletePage(pageID) {

            var url = "/api/page/" + pageID;

            return $http.delete(url)
                .then(function (response) {
                    var page = response.data;
                    return page;
                })

        }

    }

})();