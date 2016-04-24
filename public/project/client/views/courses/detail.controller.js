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
        var callback  = function(response){
            $scope.course = response;
        }
        CourseServices.getCurrentCourse(callback);


        $scope.register = function(course){
            if($rootScope.currentUser){
                var callback = function(response){
                    console.log("add a course: ", response);
                    if(!response){
                        $scope.message = "You've registered in this course!";
                    }else{
                        $location.url("/enrollments");
                    }
                }
                UserServices.addCourse($rootScope.currentUser, course, callback);
            }else{
                $scope.message = "Please log in first!";
                return;
            }
        }
    }
})();