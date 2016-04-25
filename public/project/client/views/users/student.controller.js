/**
 * Created by mingzhexu on 4/23/16.
 */
(function() {
    angular
        .module("LearningMgmtApp")
        .controller("StudentController", StudentController);

    function StudentController($scope, $rootScope, UserServices, CourseServices, $location){

        $scope.$location = $location;

        $scope.error = null;
        $scope.message = null;

        CourseServices
            .findCourseByUser($rootScope.currentUser)
            .then(function(response){
                $scope.courses = response.data;
                console.log($scope.courses);
            });

        UserServices
            .findAllStudents()
            .then(function(students){
                $rootScope.students = students.data;
                console.log("all students:", $rootScope.students);
            });
    }
})();