/**
 * Created by mingzhexu on 3/3/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, CourseServices, $rootScope) {
        $scope.$location = $location;

        $scope.search = function(keyword){

            var callback = function(response){
                $scope.courses = response;
                if($scope.courses){
                    $location.url("/result");
                    console.log($scope.courses);
                }
            }
            CourseServices.searchCoursesByKeyword(keyword, callback);

            var results = function(response){

            }
            CourseServices.setResult($scope.courses, results);
        }
    }
})();