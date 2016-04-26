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
            CourseServices
                .searchCoursesByKeyword(keyword)
                .then(function(response){
                    console.log("response.data", response.data);
                    $rootScope.result = response.data;
                    $location.url("/result");
                });
        }
    }
})();