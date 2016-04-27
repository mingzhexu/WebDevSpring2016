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
            deleteCourse: deleteCourse
            /*
            updateCourse: updateCourse,
            deleteCourseById : deleteCourseById,
            findCoursesById: findCoursesById,


            */

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
/*


        function findCoursesById(ids, callback)
        {
            var result = [];
            for(var i = 0; i < courses.length; i++){
                var find = ids.indexOf(courses[i].id);
                if(find > -1){
                    result.push(courses[i]);
                }
            }
            callback(result);
        }



        function deleteCourseById(courseId, callback)
        {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(courses[i].id == courseId)
                {
                    courses.splice(i, 1);
                    //console.log("delete executed in service?");
                    callback(courses);
                }
            }
        }

        function updateCourse(courseId, course, callback)
        {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(courses[i]._id == courseId)
                {
                    courses[i] = course;
                    callback(course);
                }
            }
            callback(null);
        }

        function setResult(result, callback)
        {
            $rootScope.result = result;
            //console.log("set the current user: ");
            //console.log($rootScope.currentUser);
            callback(result);
        }

        function getResult (callback) {
            callback($rootScope.result);
        }

 */
    }

})();