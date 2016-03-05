/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $location) {
        $scope.$location = $location;
    }
})();