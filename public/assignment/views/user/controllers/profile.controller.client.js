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
                .then(function (response) {
                model.user = response.data;
            })
        }
        init();

        function updateUser(user) {

            var _user = userService.findUserByUsername(user.username);

            if (!_user) {
                userService.updateUser(user._id, user);
                $location.url("/profile/" + model.userID);
            } else {
                model.error = "User already exists";
                return;
            }

        }

        function deleteUser(userID) {
            userService.deleteUser(userID);
            $location.url("/login");
        }

    }

})()
