/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserServices, $location) {
        $scope.login = login;

        function login (user) {
            var user;
            var callback = function(response){
                user = response;
                if (user != null) {
                    $location.url("/profile");
                    $rootScope.currentUser = user;
                }else{
                    $location.url("/register");
                    return;
                }
            }
            UserServices.findUserByCredentials(user.username, user.password, callback);
        }
        console.log("this is login controller");
    }
})();