/**
 * Created by Alark on 7/17/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController);


    function profileController($routeParams, userService, $location, user) {

        var model = this;

        model.userID = user._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(model.userID)
                .then(function (user) {
                    model.user = user;
                })

            //model.user = userService.findUserById(model.userID);
        }

        init();

        function updateUser(user) {

            userService.findUserByUsername(user.username)
                .then(function (_user) {
                    if (_user !== null && _user._id === model.userID) {
                        return userService.updateUser(user._id, user);
                    } else {
                        model.errorMessage = "User already exists";
                        return;
                    }
                })
                .then(function (_user) {
                    model.confMessage = "User successfully updated";
                    $location.url("/profile");
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

})();
