/**
 * Created by Alark on 7/17/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController);


    function profileController($routeParams, userService, $location) {

        var model = this;

        model.userID = $routeParams.userID;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserByID(model.userID)
                .then(function (user) {
                    model.user = user;
                })

            //model.user = userService.findUserByID(model.userID);
        }

        init();

        function updateUser(user) {

            userService.findUserByUsername(user.username)
                .then(function (_user) {
                    if (_user !== "0" && _user._id === model.userID) {
                        return userService.updateUser(user._id, user);
                    } else {
                        model.errorMessage = "User already exists";
                        return;
                    }
                })
                .then(function (_user) {
                    model.confMessage = "User successfully updated";
                    $location.url("/profile/" + _user._id);
                    return _user;
                })

        }


        function deleteUser(userID) {
            userService.deleteUser(userID)
                .then(function (status) {
                    $location.url("/login");
                })
        }

    }

})()
