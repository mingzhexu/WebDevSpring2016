/**
 * Created by mingzhexu on 3/20/16.
 */
(function(){
   angular
       .module("whiteBoardApp")
       .factory("CourseService", CourseService);

    function CourseService($http)
    {
        var service = {
            createCourse: createCourse,
            readAllCourses : readAllCourses,
            readOneCourseById : readOneCourseById,
            deleteCourseById : deleteCourseById,
            updateCourseById : updateCourseById,
            selectCourse : selectCourse
        };
        return service;

        function selectCourse(index){

        }

        function createCourse(course, callback)
        {
            console.log("course:", course);
            $http
                .post("/rest/course", course)
                .success(callback);
        }

        function readOneCourseById(id, callback){
            $http
                .get("/rest/course/" + id)
                .success(callback);

        }
        function deleteCourseById(id, callback)
        {
            $http
                .delete("/rest/course/" + id)
                .success(callback);
        }

        function updateCourseById(id, course, callback){
            $http
                .put("/rest/course/" + id, course)
                .success(callback);
        }
        function readAllCourses(callback)
        {
            $http
                .get("/rest/course")
                .success(callback);
        }

    }
})();