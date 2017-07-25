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

            return $http.get("http://localhost:3000/api/users/" + userID);
        }

        function findUserByUsernameAndPassword(username, password) {

            for (var u in users) {
                var _user = users[u];
                if (_user.username == username && _user.password == password) {
                    return _user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {

            for (var u in users) {
                var _user = users[u];
                if (_user.username == username) {
                    return _user;
                }
            }
            return null;
        }

        function updateUser(userID, user) {

            for (var u in users) {
                if (users[u]._id == userID) {
                    users[u] = user;
                    return users[u];
                }
            }
            return null;
        }

        function registerUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function deleteUser(userID) {

            for (var u in users) {
                if (users[u]._id == userID) {
                    users.splice(u, 1)
                    return;
                }
            }
            return null;

        }

    }


})();