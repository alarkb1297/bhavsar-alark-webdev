(function () {

    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {

        var model = this;

        model.login = login;



        function init() {

        }
        init();

       function login(user) {

           if (!user) {
               model.errorMessage = "User Not Found";
               return;
           }

            var user = userService.findUserByUsernameAndPassword(user.username, user.password);

            if (user == null) {
                model.errorMessage = "User Not Found";
            }
            else {
                $rootScope.currentUser = user;
                $location.url("profile/" + user._id);
            }
        }

    }
})()
