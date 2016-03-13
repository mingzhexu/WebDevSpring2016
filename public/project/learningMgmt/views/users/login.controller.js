/**
 * Created by mingzhexu on 3/3/16.
 */
(function() {
    angular
        .module("LearningMgmtApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserServices, $location) {
        $scope.login = login;

        function login (user) {
            $scope.message = null;
            var user;
            var callback = function(response){
                user = response;
                if (user != null) {
                    $location.url("/profile");
                    $rootScope.currentUser = user;
                }else{
                    $scope.message = "Incorrect username or password";
                    return;
                }
            }
            UserServices.findUserByCredentials(user.username, user.password, callback);
        }
    }

})();