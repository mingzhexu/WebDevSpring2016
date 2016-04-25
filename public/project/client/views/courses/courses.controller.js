/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, $location, CourseServices, CourseraServices, $rootScope) {
        $scope.$location = $location;

        if($rootScope.currentUser){
            CourseServices
                .findCourseByUser($rootScope.currentUser)
                .then(function(response){
                    console.log(response.data, "length is ", response.data.length);
                    if(response.data.length == 0){
                        console.log("legnth is 0");
                        $scope.message = "You haven't got any course yet!"
                    }
                    $scope.courses = response.data;
                });
        }

        $scope.images = [];
        CourseraServices
            .findCourse()
            .then(function(response){
                $scope.udacity = response.data.courses;
                $scope.instructors = [];
                var courses = $scope.udacity;
                console.log(courses);
                console.log("udacity",response.data.courses);
                console.log("udacity",response.data.courses[2].instructors[0]["image"]);
                for(var i in $scope.udacity){
                    if(courses[i].instructors) {
                        var instructors = courses[i].instructors;
                        var elem = [];
                        for (var j in instructors) {
                            elem.push(instructors[j]["name"]);
                        }
                        $scope.instructors.push(elem);// a list of list
                        //$scope.images.push(courses[i].instructors[0]["image"]);
                    }
                }
            });

        CourseServices
            .findAllCourses()
            .then(function(response){
                console.log(response);
                $scope.allcourses = response.data;
            });

        $scope.select = function(course){
            CourseServices.setCurrentCourse(course);
        }
    }
})();