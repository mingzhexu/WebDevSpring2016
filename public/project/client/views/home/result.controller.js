/**
 * Created by mingzhexu on 3/12/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("ResultController", ResultController);

    function ResultController($scope, $location, $rootScope, CourseServices) {
        $scope.$location = $location;
        $scope.courses = $rootScope.result;
    }
})();