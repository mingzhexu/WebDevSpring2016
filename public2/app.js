/**
 * Created by mingzhexu on 3/20/16.
 */
(function(){
   angular
       .module("whiteBoardApp",[])
       .controller("CourseController", CourseController);

    function CourseController($scope, $http, CourseService)
    {
        CourseService.readAllCourses(renderCourses);

        function renderCourses(response)
        {
            $scope.courses = response;
        }

        CourseService.readOneCourseById(1, function(response){
            $scope.testCourse = response;
        });

        $scope.selectCourse = function(index){
            $scope.selectedCourseIndex = index;
            console.log($scope.selectedCourseIndex);
            CourseService.readOneCourseById(index, function
                (response){
                $scope.course = response;
            });
        };

        $scope.removeCourse = function(index){
            CourseService.deleteCourseById(index, renderCourses);
        };

        $scope.createCourse = function(course){
            CourseService.createCourse(course, renderCourses);
        };

        $scope.updateCourse = function(course){
            CourseService.updateCourseById($scope.selectedCourseIndex, course, renderCourses);
        };
    }
})();