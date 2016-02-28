/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, $location, UserServices)
    {
        $scope.id = $routeParams.num;
        $scope.user = UserServices.findUserById($routeParams.id);

        $scope.$location = $location;
        console.log("profile controller: " + $location.url());
    }
})();