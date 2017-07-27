/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserByID": findUserByID,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function findUserByID(userID) {

            var url = "/api/users/" + userID;

            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;

                });
        }

        function findUserByUsernameAndPassword(username, password) {

            var url = "/api/user?username=" + username + "&password=" + password;

            return $http.get(url)
                .then(function (response) {

                    console.log(response.data);


                    var user = response.data;
                    return user;
                });

        }

        function findUserByUsername(username) {

            var url = "/api/user?username=" + username;

            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }

        function updateUser(userID, user) {

            var url = "/api/user/" + userID;

            return $http.put(url, user)
                .then(function (response) {

                    var user = response.data;
                    return user;

                });

        }

        function registerUser(user) {

            var url = "/api/user";

            return $http.post(url, user)
                .then(function (response) {

                    var user = response.data;
                    return user;

                });

        }

        function deleteUser(userID) {

            var url = "/api/user/" + userID;

            return $http.delete(url)
                .then(function (response) {

                    var user = response.data;
                    return user;

                });

        }

    }

})();