/**
 * Created by mingzhexu on 4/24/16.
 */

(function(){
    angular
        .module("LearningMgmtApp")
        .factory("CourseraServices", CourseraService);

    function CourseraService($http) {
        var api = {
            findCourse: findCourse
        };
        return api;

        function findCourse() {
            // use JSONP since API does not support CORS
/*
            var options = {
                host: 'www.udacity.com',
                path: '/public-api/v0/courses'
            };
            var callback = function(response) {
                var str = '';
                response.on('data', function (chunk) {
                    str += chunk;
                });
                response.on('end', function () {
                    json_response = JSON.parse(str);
                    courses = json_response.courses;
                    for (var i = 0; i < courses.length; i++) {
                        console.log(courses[i].title);
                        console.log(courses[i].homepage);
                    }
                });
            };
            http.request(options, callback).end();*/
            return $http.get("https://www.udacity.com/public-api/v0/courses");
        }
    }
})();