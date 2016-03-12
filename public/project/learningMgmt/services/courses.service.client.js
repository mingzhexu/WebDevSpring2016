/**
 * Created by mingzhexu on 3/4/16.
 */
(function()
{
    angular
        .module("LearningMgmtApp")
        .factory("CourseServices", CourseServices);

    function CourseServices($rootScope){

        var courses;

        courses = [
            {"id": 123,"title":"Machine Learning","school":"Northeastern University","instructor":"Kevin Small"},
            {"id": 223,"title":"Data Mining","school":"Duke University","instructor":"Christopher Keen"},
            {"id": 323,"title":"Algorithm","school":"Cornell University","instructor":"Jennifer Wang"},
            {"id": 423,"title":"Database Management","school":"New York University","instructor":"Sarah Yalonda"}
        ];

        var services = {
            findAllCourses : findAllCourses,
            findCourseByTitle: findCourseByTitle,
            createCourse: createCourse,
            updateCourse: updateCourse,
            deleteCourseById : deleteCourseById,
            findCourseById: findCourseById
        };

        return services;

        function findCourseByTitle(coursetitle, callback)
        {
            var arrayLength = courses.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(courses[i].title == coursetitle)
                {
                    callback(courses[i]);
                }
            }
            callback(null);
        }

        function findCourseById(id, callback)
        {
            callback(courses[id]);
            callback(null);
        }

        function findAllCourses(callback)
        {
            console.log("return all courses!");
            console.log(courses);
            callback(courses);
        }

        function createCourse(course, callback)
        {
            course["id"] = (new Date).getTime();
            courses.push(course);
            console.log("create course in service");
            callback(course);
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
    }

})();