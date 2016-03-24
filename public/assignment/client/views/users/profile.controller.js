/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserServices, $rootScope)
    {
        $scope.error = null;
        $scope.message = null;

        var curUser = function(cur)
        {
            $rootScope.currentUser = cur.data;
            console.log("getCurUser:", $rootScope.currentUser);
        };
        UserServices
            .getCurrentUser()
            .then(curUser);

        if (!$scope.currentUser) {
            console.log($scope.currentUser);
            console.log("this check not current user");
            $location.url("/home");
        }
        $scope.update = update;

        function update (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            console.log("update",$rootScope.currentUser, user);
            UserServices
                .updateUser(user._id, user)
                .then(function(response){
                    if(response.data) {
                        UserServices.setCurrentUser(response.data);
                        $location.url("/profile");
                        $scope.message = "User updated successfully";
                    }else{
                        console.log("error");
                        $scope.message = "Unable to update the user";
                    }
                });
        }
    }
})();