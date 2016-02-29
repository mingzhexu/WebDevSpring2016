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
            $rootScope.currentUser = cur;
            console.log($rootScope.currentUser);
        }
        UserServices.getCurrentUser(curUser);

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

            var callback = function(target){
                $rootScope.currentUser = target;
            }
            UserServices.updateUser($rootScope.currentUser._id, user, callback);
            UserServices.setCurrentUser(user,callback);
            console.log("the update user");
            console.log(user);

            if (user) {
                $scope.message = "User updated successfully";
            } else {
                $scope.message = "Unable to update the user";
            }
        }
        console.log("profile controller: " + $location.url());
    }
})();