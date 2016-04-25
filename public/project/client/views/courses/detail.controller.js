/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $location, CourseServices,UserServices, $rootScope) {
        $scope.$location = $location;
        $scope.message = null;

        $scope.course = CourseServices.getCurrentCourse();


        $scope.register = function(course){
            if($rootScope.currentUser){
                CourseServices
                    .studentEnroll(course, $rootScope.currentUser)
                    .then(function(response){
                        console.log("register successfully");
                        $location.url("/courses");
                    });
            }else{
                $scope.message = "Please log in first!";
                return;
            }
        }
    }
})();