/**
 * Created by mingzhexu on 3/13/16.
 */
(function() {
    angular
        .module("LearningMgmtApp")
        .controller("InstructorController", InstructorController);

    function InstructorController($scope, $rootScope, CourseServices, $location) {
        $scope.$location = $location;


        $scope.create=function(course){
            var callback = function(response){
                $rootScope.currentCourse=response;
                if(response){
                    $location.url("/detail");
                }
            }
            CourseServices.createCourse(course, callback);
        }
    }

})();