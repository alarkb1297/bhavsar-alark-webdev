(function () {

    angular
        .module("booKlub")
        .controller("profileController", profileController);


    function profileController($routeParams, userService, $location) {

        var model = this;

        model.userId = $routeParams.userId;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                });
        }

        init();


        function updateUser(user) {

            userService.findUserByUsername(user.username)
                .then(function (_user) {
                    if (_user !== null && _user._id === model.userId) {
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

})();