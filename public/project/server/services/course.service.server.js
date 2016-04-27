/**
 * Created by mingzhexu on 4/23/16.
 */
module.exports = function(app, userModel, courseModel) {

    app.post("/api/project/course/", createCourse);
    app.get("/api/project/user/course/:userId", findCourseByUser);
    app.get("/api/project/courses", findAllCourses);
    app.post("/api/project/student/:student_id/course/:course_id", studentEnroll);
    app.put("/api/project/course/:courseId/student/:studentId", studentWithdrew);
    app.get("/api/project/course/keyword/:keyword", searchCoursesWithKeyword);
    app.delete("/api/project/course", deleteCourse);
    app.put("/api/project/course/:courseId", updateCourse);

    function findCourseByUser(req, res){
        var userId = req.params["userId"];
        courseModel
            .findCourseByUserId(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createCourse(req, res){
        var course = req.body;

        courseModel
            .createCourse(course)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllCourses(req, res){
        courseModel.findAllCourses()
            .then(
                function(doc){
                    console.log("in server service", doc);
                    res.json(doc)
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function studentEnroll(req, res){
        var studentId = req.params["student_id"];
        var courseId = req.params["course_id"];
        var student = req.body;

        courseModel
            .studentEnroll(courseId, student)
            .then(
                // return user if promise resolved
                function (doc) {
                    console.log(doc);
                    return userModel.studentEnroll(studentId, courseId);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(doc1){
                    console.log("doc1", doc1);
                    res.json(doc1);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function studentWithdrew(req, res){
        var studentId = req.params["studentId"];
        var courseId = req.params["courseId"];
        var student = req.body;

        courseModel
            .studentWithdrew(courseId, student)
            .then(
                function(doc){
                    console.log("withdrew student from course", doc);
                    return userModel.studentWithdrew(studentId, courseId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(doc1){
                    res.json(doc1);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function searchCoursesWithKeyword(req, res){
        var keyword = req.params["keyword"];
        courseModel
            .searchCoursesWithKeyword(keyword)
            .then(function(doc){
                res.json(doc);
                console.log("in service", doc);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function deleteCourse(req, res){
        var course = req.body;
        courseModel
            .deleteCourse(course)
            .then(function(doc){
                res.json(doc);
                console.log("deleted");
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function updateCourse(req, res){
        var courseId = req.params["courseId"];
        var course = req.body;
        courseModel
            .updateCourse(courseId, course)
            .then(function(doc){
                    res.json(doc);
                    console.log("updated");
                },
                function(err){
                    res.status(400).send(err);
                });
    }
};