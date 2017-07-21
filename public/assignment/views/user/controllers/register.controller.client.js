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

            if (!user.password || !user.password2) {
                model.errorMessage = "Blank Fields Detected";
                return;
            }

            if (user.password != user.password2) {
                model.errorMessage = "Passwords Don't Match"
                return;
            }



           //var user = userService.registerUser(user);

           //$location.url("/profile/" + user._id);
        }
    }

})()
