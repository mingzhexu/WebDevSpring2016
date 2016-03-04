/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
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