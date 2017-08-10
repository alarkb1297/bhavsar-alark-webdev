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
            "login": login,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin" : checkLogin
        };
        return api;

        function checkLogin() {
            return $http.get("/api/checkLogin")
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userID) {

            var url = "/api/users/" + userID;

            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }

        function login(username, password) {

            var url = "/api/login";

            return $http.post(url, {username: username, password: password})
                .then(function (response) {
                    console.log(response);
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
                .then(function (status) {
                    return findUserById(userID);
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

                    var status = response.data;
                    return status;

                });
        }

    }

})();