/**
 * Created by mingzhexu on 3/12/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("ResultController", ResultController);

    function ResultController($scope, $location, CourseServices, $rootScope) {
        $scope.$location = $location;

        var callback = function(response){
            $scope.courses = response;
            console.log($scope.courses);
        }
        CourseServices.getResult(callback);
    }
})();