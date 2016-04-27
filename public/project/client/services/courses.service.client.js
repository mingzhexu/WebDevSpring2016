/**
 * Created by mingzhexu on 3/4/16.
 */
(function()
{
    angular
        .module("LearningMgmtApp")
        .factory("CourseServices", CourseServices);

    function CourseServices($rootScope, $http){

        var services = {
            findAllCourses : findAllCourses,
            findCourseByTitle: findCourseByTitle,
            findCourseByUser: findCourseByUser,
            createCourse: createCourse,
            setCurrentCourse: setCurrentCourse,
            getCurrentCourse: getCurrentCourse,
            studentEnroll: studentEnroll,
            getInstructors: getInstructors,
            studentWithdrew: studentWithdrew,
            searchCoursesByKeyword: searchCoursesByKeyword,
            setResult: setResult,
            getResult: getResult,
            deleteCourse: deleteCourse,
            updateCourse: updateCourse

        };

        return services;

        function findCourseByTitle(title)
        {
            return $http
                .get("/api/project/course"+title);
        }

        function findCourseByUser(user)
        {
            return $http
                .get("/api/project/user/course/"+user._id);
        }

        function createCourse(course)
        {
            return $http
                .post("/api/project/course/", course);
        }

        function findAllCourses()
        {
            return $http.get("/api/project/courses/");
        }

        function setCurrentCourse(course){
            $rootScope.currentCourse = course;

        }
        function getCurrentCourse(){
            return $rootScope.currentCourse;
        }

        function studentEnroll(course, student){
            console.log(course);
            return $http.post("/api/project/student/"+student._id+"/course/"+course._id, student);
        }

        function getInstructors(courses){
            return $http.get("/api/project/courses/instructors", courses);
        }

        function studentWithdrew(student, course){
            return $http.put("/api/project/course/"+course._id+"/student/"+student._id, student);
        }

        function searchCoursesByKeyword(keyword)
        {
            return $http.get("/api/project/course/keyword/"+keyword);
        }

        function setResult(result)
        {
            $rootScope.result = result;
        }

        function getResult () {
            return $rootScope.result;
        }

        function deleteCourse(course){
            return $http.delete("/api/project/course", course);
        }

        function updateCourse(courseId, course)
        {

            return $http.put("/api/project/course/"+courseId, course);
        }
    }

})();