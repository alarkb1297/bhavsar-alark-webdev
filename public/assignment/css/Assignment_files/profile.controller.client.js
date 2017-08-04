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

        var userID = $routeParams["userID"];
        
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.user = userService.findUserById(userID);
        }
        init();
        
        function updateUser(user) {
            userService.updateUser(user._id, user);
            $location.url("/profile/" + model.userID);

        }
        
        function deleteUser(userID) {
            userService.deleteUser(userID);
            $location.url("/login");
        }

    }

})()
