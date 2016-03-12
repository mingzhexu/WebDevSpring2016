/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, $location, CourseServices, $rootScope) {
        console.log("into controller");
        $scope.$location = $location;

        var callback = function(response){
            console.log(response);
            $scope.courses = response;
        }
        CourseServices.findAllCourses(callback);

    }
})();