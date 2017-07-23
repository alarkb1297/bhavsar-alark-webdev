/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .service("websiteService", websiteService);


    function websiteService() {

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function findWebsitesForUser(userID) {
            var sites = [];

            for (var w in websites) {
                if (websites[w].developerId == userID) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function createWebsite(userID, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userID;

            websites.push(website);

            return website;

        }

        function findWebsiteById(webID) {

            for (var w in websites) {

                if (websites[w]._id == webID) {
                    return angular.copy(websites[w]);
                    //return websites[w];
                }
            }
            return;
        }

        function updateWebsite(webID, website) {

            for (var w in websites) {
                if (websites[w]._id == webID) {
                    websites[w] = website;
                    return websites[w];
                }
            }

            return null;
        }

        function deleteWebsite(webID) {

            for (var w in websites) {
                if (websites[w]._id == webID) {
                    websites.splice(w, 1)
                    return;
                }
            }
            return;
        }

    }


})();