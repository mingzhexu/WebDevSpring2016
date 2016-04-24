/**
 * Created by mingzhexu on 3/13/16.
 */
(function() {
    angular
        .module("LearningMgmtApp")
        .controller("EnrollController", EnrollController);


    function EnrollController($scope, $rootScope, UserServices, CourseServices, $location) {

        $scope.$location = $location;

        if($rootScope.currentUser){
            var callback = function(response){
                if(!$scope.coursesId){
                    $scope.coursesId = response;
                }
            }

            var curCourses = function(response){
                $scope.mycourses = response;
            }
            UserServices.getCoursesByUser($rootScope.currentUser, callback);
            CourseServices.findCoursesById($scope.coursesId, curCourses);

        }

        $scope.withdrew = function(course){

            var callback = function(response){
                if(response){
                    console.log("successfully delete");
                    $location.url("/enrollments");
                    var index = $scope.mycourses.indexOf(course);
                    $scope.mycourses.splice(index, 1);
                }
            }
            UserServices.deleteCourse($rootScope.currentUser, course, callback);
        }

    }

})();
