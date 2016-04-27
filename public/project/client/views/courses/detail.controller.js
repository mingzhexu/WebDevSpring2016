/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $location, CourseServices, UserServices, $rootScope) {
        $scope.$location = $location;
        $scope.message = null;

        var course = CourseServices.getCurrentCourse();

        if(course._id == null){
            $scope.course = course;
            console.log($scope.course);
            $scope.homepage = $scope.course.homepage;
        }else{
            $scope.localcourse = course;
            console.log($scope.localcourse);
        }


        $scope.register = function(course){
            if($rootScope.currentUser){
                var courseCur = CourseServices.getCurrentCourse();
                CourseServices
                    .studentEnroll(courseCur, $rootScope.currentUser)
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