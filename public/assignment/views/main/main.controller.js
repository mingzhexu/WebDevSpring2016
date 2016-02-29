/**
 * Created by mingzhexu on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController",
            function($scope, $location) {
                $scope.$location = $location;
                console.log($location.url());
            });
})();
