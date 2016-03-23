/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserServices) {
        console.log("this is Register controller");

        $scope.register = register;

        function register(user) {

            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            var new_user;

            UserServices
                .findUserByUsername(user.username)
                .then(function(response){
                    if(response.data) {
                        $scope.message = "User already exists";
                        return;
                    }else{
                        UserServices
                            .createUser(user)
                            .then(function(response){
                                UserServices.setCurrentUser(user);
                                $location.url("/profile");
                                console.log("create new user");
                            });
                    }
                });
        }
    }
})();