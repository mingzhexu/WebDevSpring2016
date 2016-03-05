/**
 * Created by mingzhexu on 3/3/16.
 */
(function() {
    angular
        .module("LearningMgmtApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location) {

        $scope.register = register;

        function register(user) {

            $scope.message = null;
            console.log($scope.message);
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
            if (!user.email) {
                $scope.message = "Please provide an email";
                return;
            }
            if (!user.role) {
                $scope.message = "Please tell us whether you a student or instructor";
                return;
            }

            var new_user;
            /*
            var findUser = function(response){
                new_user = response;
            }
            UserServices.findUserByUsername(user.username, findUser);

            if (new_user != null) {
                $scope.message = "User already exists";
                return;
            }

            var newUser = function(response) {
                $rootScope.currentUser = response;
            }
            //UserServices.createUser(user, newUser);
            //UserServices.setCurrentUser(user,newUser);*/
            $location.url("/profile");
        }

    }
})();