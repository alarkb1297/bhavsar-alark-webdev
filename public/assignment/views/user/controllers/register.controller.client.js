/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("registerController", registerController);


    function registerController(userService, $location) {


        var model = this;

        model.registerUser = registerUser;

        function init() {

        }

        init();


        function registerUser(user) {

            if (user == null || !user.username || !user.password || !user.password2) {
                model.errorMessage = "Blank Fields Detected";
                return;
            }

            if (user.password != user.password2) {
                model.errorMessage = "Passwords Don't Match"
                return;
            }

            userService.findUserByUsername(user.username)
                .then(function (_user) {

                    if (!_user) {
                        return userService.registerUser(user)
                    } else {
                        model.errorMessage = "User already exists";
                        return;
                    }

                })
                .then(function (_user) {
                    $location.url("/profile/" + _user._id);
                    return _user;
                })

        }
    }

})()
