/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .factory("websiteService", websiteService);


    function websiteService($http) {

        var api = {
            "findWebsitesForUser": findWebsitesForUser,
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function findWebsitesForUser(userID) {

            var url = "/api/user/" + userID + "/website";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function createWebsite(userID, website) {

            var url = "/api/user/" + userID + "/website";

            return $http.post(url, website)
                .then(function (response) {
                    return website = response.data;
                });
        }

        function findWebsiteById(webID) {

            var url = "/api/website/" + webID;

            return $http.get(url)
                .then(function (reponse) {
                    var website = reponse.data;
                    return website;
                });
        }

        function updateWebsite(webID, website) {

            var url = "/api/website/" + webID;

            return $http.put(url, website)
                .then(function (status) {
                    return findWebsiteById(webID);
                });
        }

        function deleteWebsite(webID) {

            var url = "/api/website/" + webID;

            return $http.delete(url)
                .then(function (response) {
                    var website = response.data;
                    return website;
                });

        }

    }


})();