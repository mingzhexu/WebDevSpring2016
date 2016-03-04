/**
 * Created by mingzhexu on 3/3/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("MainController",
            function($scope, $location) {
                $scope.$location = $location;
                console.log($location.url());
            });
})();