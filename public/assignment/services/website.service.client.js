/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .service("websiteService", websiteService);


    function websiteService($http) {


        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

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
                .then(function (reponse) {
                    var website = reponse.data;
                    return website;
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