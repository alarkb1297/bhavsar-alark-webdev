/**
 * Created by Alark on 7/17/17.
 */

(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController);



    function profileController($routeParams, userService) {

        var model = this;

        var userID = $routeParams["userID"];
        
        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = userService.findUserByID(userID);
        }
        init();
        
        function updateUser() {
            
        }
        
        function unregister() {
            
        }
        

    }

})()
