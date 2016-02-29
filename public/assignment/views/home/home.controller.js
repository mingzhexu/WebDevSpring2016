/**
 * Created by mingzhexu on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;
    }
})();