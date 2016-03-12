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
            {"id": 123,"title":"Machine Learning","school":"Northeastern University","instructor":"Kevin Small","info":"One of the most common tasks performed by data scientists and data analysts are prediction and machine learning. This course will cover the basic components of building and applying prediction functions with an emphasis on practical applications. The course will provide basic grounding in concepts such as training and tests sets, overfitting, and error rates. The course will also introduce a range of model based and algorithmic machine learning methods including regression, classification trees, Naive Bayes, and random forests. The course will cover the complete process of building prediction functions including data collection, feature creation, algorithms, and evaluation."},
            {"id": 223,"title":"Data Mining","school":"Duke University","instructor":"Christopher Keen", "info":"Learn how to take scattered data and organize it into groups for use in many applications, such as market analysis and biomedical data analysis, or as a pre-processing step for many data mining tasks."},
            {"id": 323,"title":"Algorithm","school":"Cornell University","instructor":"Jennifer Wang", "info":"The course covers basic algorithmic techniques and ideas for computational problems arising frequently in practical applications: sorting and searching, divide and conquer, greedy algorithms, dynamic programming. "},
            {"id": 423,"title":"Database Management","school":"New York University","instructor":"Sarah Yalonda", "info":"Database Management Essentials provides the foundation you need for a career in database development, data warehousing, or business intelligence, as well as for the entire Data Warehousing for Business Intelligence specialization. In this course, you will create relational databases, write SQL statements to extract information to satisfy business reporting requests, create entity relationship diagrams (ERDs) to design databases, and analyze table designs for excessive redundancy."}
        ];

        var services = {
            findAllCourses : findAllCourses,
            findCourseByTitle: findCourseByTitle,
            createCourse: createCourse,
            updateCourse: updateCourse,
            deleteCourseById : deleteCourseById,
            findCourseById: findCourseById,
            searchCoursesByKeyword: searchCoursesByKeyword,
            setResult: setResult,
            getResult: getResult
        };

        return services;

        function findCourseByTitle(title, callback)
        {
            var arrayLength = courses.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(courses[i].title == title)
                {
                    callback([courses[i]]);
                }
            }
            callback(null);
        }

        function searchCoursesByKeyword(keyword, callback)
        {
            var arrayLength = courses.length;
            var result = [];
            for (var i = 0; i < arrayLength; i++)
            {
                var up = courses[i].title.toUpperCase();
                var key = keyword.toUpperCase();
                if(up.indexOf(key) > -1 )
                {
                    result.push(courses[i]);
                }
            }

            callback(result);
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
    }

})();