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
                    console.log(response.data, "length is ", response.data.length);
                    if(response.data.length == 0){
                        console.log("legnth is 0");
                        $scope.message = "You haven't got any course yet!"
                    }
                    $scope.courses = response.data;
                });
        }
        CourseServices
            .findAllCourses()
            .then(function(response){
                console.log(response);
                $scope.allcourses = response.data;
            });

        $scope.select = function(course){
            CourseServices.setCurrentCourse(course);
        }
    }
})();