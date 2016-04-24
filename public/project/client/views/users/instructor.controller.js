/**
 * Created by mingzhexu on 3/13/16.
 */
(function() {
    angular
        .module("LearningMgmtApp")
        .controller("InstructorController", InstructorController);

    function InstructorController($scope, $rootScope, CourseServices, $location) {
        $scope.$location = $location;


        $scope.create = function(course){

            course.instructors = $rootScope.currentUser._id;
            CourseServices
                .createCourse(course)
                .then(function(response){
                    if(response.data){
                        console.log("create success");
                        $location.url("/courses");
                    }else{
                        console.log("create fail");
                    }
                });

        }


    }

})();