/**
 * Created by mingzhexu on 4/23/16.
 */
module.exports = function(app, userModel, courseModel) {
/*
    app.get("/api/project/loggedin", getCurrentUser);
    app.get("/api/project/admin/user/:id", getUserById);
    app.post("/api/project/user/:username/password/:password", findUserByCredentials);
    app.put("/api/project/admin/user/:id", update);
    app.delete("/api/project/admin/user/:id", deleteUser);
*/
    app.post("/api/project/course/", createCourse);
    app.get("/api/project/user/course/:userId", findCourseByUser);
    app.get("/api/project/courses", findAllCourses);
    app.post("/api/project/student/:student_id/course/:course_id", studentEnroll);
    app.put("/api/project/course/:courseId/student/:studentId", studentWithdrew);
    app.get("/api/project/course/keyword/:keyword", searchCoursesWithKeyword);
    app.delete("/api/project/course", deleteCourse);

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
/*
    function getUserById(req, res)
    {
        var userId = req.params["id"];
        // use model to find user by id
        userModel.findUserById(userId)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function getCurrentUser(req, res)
    {
        console.log("get current user:", req.session.currentUser);
        res.json(req.session.currentUser);
    }

    function deleteUser(req, res)
    {
        userModel
            .deleteUserById(req.params["id"])
            .then(
                function(doc){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                })
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function update(req, res)
    {
        var index = req.params["id"];
        var user = req.body;
        console.log("req body:", req.body);
        console.log("req id:", req.params["id"]);
        req.session.currentUser = user;
        userModel
            .updateUser(index, user)
            .then(
                function(doc){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllUser(req, res)
    {
        var users = userModel.findAllUsers()
            .then(
                function(doc){
                    console.log("find all users in server service", doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function register(req, res) {
        var user = req.body;
        console.log("the user in servers service", user);
        userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function(doc) {
                    req.session.currentUser = doc;
                    return userModel.findAllUsers();
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.params["username"];
        var password = req.params["password"];

        var user = userModel.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function searchUsername(req, res)
    {
        var name = req.params["username"];
        console.log("in user service server", name);
        res.json(userModel.findUserByUsername(name));
    }

*/
};