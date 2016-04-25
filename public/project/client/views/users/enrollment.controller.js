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
            CourseServices
                .findCourseByUser($rootScope.currentUser)
                .then(function(response){
                    console.log(response.data, "length is ", response.data.length);
                    if(response.data.length == 0){
                        console.log("legnth is 0");
                        $scope.message = "You haven't register any course yet!"
                    }
                    $scope.mycourses = response.data;
                });
        }

        $scope.withdrew = function(course){

            CourseServices.studentWithdrew($rootScope.currentUser, course);
        }

    }

})();
