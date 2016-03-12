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
        console.log($scope.courses);
        /*
        if(!$scope.courses){
            var callback = function(response){
                console.log("enter service null");
                $scope.courses = response;
            }
            CourseServices.findAllCourses(callback);
        }
*/

    }
})();