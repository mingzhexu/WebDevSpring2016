/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, $location, CourseServices, $rootScope) {
        $scope.$location = $location;

        if($rootScope.currentUser){
            CourseServices
                .findCourseByUser($rootScope.currentUser)
                .then(function(response){
                    console.log(response);
                    $scope.courses = response.data;
                });
        }else{
            CourseServices
                .findAllCourses()
                .then(function(response){
                    console.log(response);
                    $scope.courses = response.data;
                });
        }

        $scope.select = function(course){
            CourseServices.setCurrentCourse(course);
        }
    }
})();