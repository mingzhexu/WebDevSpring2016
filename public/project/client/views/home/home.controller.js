/**
 * Created by mingzhexu on 3/3/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, CourseServices, UdacityServices) {
        $scope.$location = $location;
        var all_courses = [];
        $scope.search = function(keyword){
            CourseServices
                .searchCoursesByKeyword(keyword)
                .then(function(response){
                    console.log("response.data", response.data);
                    $scope.courses = response.data;
                    all_courses = response.data;
                    //$location.url("/result");
                });

            UdacityServices
                .findCourseByKeyword(keyword)
                .then(function(response){
                    var courses = response.data.courses;
                    var result = [];
                    for(var i in courses){
                        if(courses[i].title.toLowerCase().indexOf(keyword.toLowerCase())>=0
                            || courses[i].subtitle.toLowerCase().indexOf(keyword.toLowerCase())>=0){
                            result.push(courses[i]);
                        };
                    }
                    $scope.udacity = result;
                })
        }

        $scope.select = function(course){
            CourseServices.setCurrentCourse(course);
        }
    }
})();