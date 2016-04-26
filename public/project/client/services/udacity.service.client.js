/**
 * Created by mingzhexu on 4/24/16.
 */

(function(){
    angular
        .module("LearningMgmtApp")
        .factory("UdacityServices", UdacityServices);

    function UdacityServices($http) {
        var api = {
            findCourse: findCourse,
            findCourseByKeyword: findCourseByKeyword
        };
        return api;

        function findCourse() {
            return $http.get("https://www.udacity.com/public-api/v0/courses");
        }

        function findCourseByKeyword(keyword){
            return $http.get("https://www.udacity.com/public-api/v0/courses")
        }
    }
})();