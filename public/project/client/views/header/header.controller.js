/**
 * Created by mingzhexu on 3/3/16.
 */
(function() {
    angular
        .module("LearningMgmtApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, UserServices, $location) {
        $scope.$location = $location;
        $scope.logout = logout;
        function logout() {
            var callback = function(response){

            }
            UserServices.setCurrentUser(null, callback);
            $location.url("/home");
            $scope.form = null;
        }
    }

})();