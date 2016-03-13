/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, $location, CourseServices, UserServices, $rootScope) {
        $scope.$location = $location;

        if(!$rootScope.currentUser){
            var callback = function(response){
                $scope.courses = response;
            }
            CourseServices.findAllCourses(callback);
        }else{
            var callback = function(response){
                if(!$scope.coursesId){
                    $scope.coursesId = response;
                }
            }

            var curCourses = function(response){
                $scope.courses = response;
            }
            UserServices.getCoursesByUser($rootScope.currentUser, callback);
            CourseServices.findCoursesById($scope.coursesId, curCourses);
        }


    }
})();