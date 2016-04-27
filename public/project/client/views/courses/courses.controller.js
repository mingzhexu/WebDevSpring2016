/**
 * Created by mingzhexu on 3/4/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, $location, CourseServices, UdacityServices, $rootScope) {
        $scope.$location = $location;

        if($rootScope.currentUser){
            CourseServices
                .findCourseByUser($rootScope.currentUser)
                .then(function(response){
                    console.log(response.data, "length is ", response.data.length);
                    if(response.data.length == 0){
                        $scope.message = "You haven't got any course yet!"
                    }
                    $scope.courses = response.data;
                });
        }

        $scope.images = [];
        UdacityServices
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
                        var images = [];
                        for (var j in instructors) {
                            images.push(instructors[j]["image"]);
                            elem.push(instructors[j]["name"]);
                        }
                        $scope.images.push(images);
                        $scope.instructors.push(elem);// a list of list
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

        $scope.deleteCourse =function(course){
            CourseServices
                .deleteCourse(course)
                .then(function(response){
                    var index = $scope.courses.indexOf(course);
                    $scope.courses.splice(index, 1);
                    console.log("removed");
                });
        }
    }
})();