/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserServices, $location) {
        $scope.login = login;

        function login (user) {
            $scope.message = null;
            if(!user){
                $scope.message = "Please fill in your username and password";
                return;
            }
            if(user.username == null || user.password == null) {
                $scope.message = "Please fill in your username and password";
                return;
            }
            UserServices
                .findUserByCredentials({
                    username: user.username,
                    password: user.password})
                .then(function(response){
                        if(response.data) {
                            UserServices.setCurrentUser(response.data);
                            console.log("response", response.data);
                            $location.url("/profile");
                        }else{
                            $scope.message="Unable to find user";
                        }
                    }
                );
        }


        console.log("this is login controller");
    }
})();