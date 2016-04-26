/**
 * Created by mingzhexu on 4/23/16.
 */
// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var CourseSchema = require("./course.schema.server.js")(mongoose);

    // create user model from schema
    var CourseModel = mongoose.model('Course', CourseSchema);


    var api = {
        findCourseByUserId: findCourseByUserId,
        createCourse: createCourse,
        findAllCourses : findAllCourses,
        studentEnroll: studentEnroll,
        studentWithdrew: studentWithdrew,
        searchCoursesWithKeyword : searchCoursesWithKeyword
        /*
        updateUser: updateUser,
        deleteUserById : deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername*/
    };
    return api;

    function findCourseByUserId(userId){
        var deferred = q.defer();
        CourseModel.find({instructorId:[userId]}, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                console.log("find courses for user", doc);
                if(doc.length == 0){
                    console.log("no courses for user isntr", err);
                    CourseModel.find({studentId:{$in: [userId]}}, function(err1, doc1){
                        if(err1){
                            console.log("no find courses for user student", err1);
                            deferred.resolve(err);
                        }else{
                            deferred.resolve(doc1);
                            console.log("find courses for user student", doc1);
                        }
                    });
                }else{
                    deferred.resolve(doc);
                }
            }
        });
        return deferred.promise;
    }

    function findAllCourses(){

        var deferred = q.defer();

        CourseModel.find(function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                console.log( "in model", doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        //return mock;
    }
    function createCourse(course) {
        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        CourseModel.create(course, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("in model", doc);
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function studentEnroll(courseId, student){
        var deferred = q.defer();
        CourseModel
            .findById(courseId, function(err, doc){
                if(err){
                    deferred.reject(err);
                    console.log("reject in first");
                }else{
                    console.log(doc.students);
                    if(doc.studentId.indexOf(student._id) < 0){
                        doc.studentId.push(student._id);
                        doc.students.push(student.firstName + " " + student.lastName);
                        console.log("in model", "enroll student", doc.students);
                        doc.save (function (err1, doc1) {
                            if (err1) {
                                console.log("reject in 2");
                                deferred.reject(err);
                            } else {
                                // resolve promise with user
                                deferred.resolve (doc1);
                            }
                        });
                    }else{
                        deferred.resolve(doc);
                    }
                }
        });
        // return a promise
        return deferred.promise;
    }

    function studentWithdrew(courseId, student){
        var deferred = q.defer();
        CourseModel
            .findById(courseId, function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    console.log(doc);
                    var index = doc.studentId.indexOf(student._id);
                    doc.studentId.splice(index,1);
                    index = doc.students.indexOf(student.firstName + " "+student.lastName);
                    doc.students.splice(index, 1);
                    doc.save(function(err1, doc1){
                        if(err1){
                            deferred.reject(err);
                        }else{
                            deferred.resolve(doc1);
                        }

                    })
                }
            })
        return deferred.promise;
    }

    function searchCoursesWithKeyword(keyword){
        var deferred = q.defer();
        CourseModel
            .find({"title": {'$regex' : '.*' + keyword + '.*'}}, function(err, doc){
                if(err){
                    deferred.reject(err);
            }else{
                    deferred.resolve(doc);
                    console.log("is the model search result",doc);
                }
        });
        return deferred.promise;
    }
    /*
        function updateUser(userId, user){

            var deferred = q.defer();

            UserModel.findById(userId,function(err,doc){
                doc.firstName = user.firstName;
                doc.lastName = user.lastName;
                doc.username = user.username;
                doc.password = user.password;
                doc.email = user.email;
                doc.phone = user.phone;
                doc.roles = [user.roles];
                doc.save(function(err,doc){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(doc);
                    }

                })
            });
            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = q.defer();
            userId = mongoose.Types.ObjectId(userId);
            UserModel.remove({_id:userId},
                function(err,result){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(result);
                    }
                });
            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = q.defer();

            // find one retrieves one document
            UserModel.findOne(

                // first argument is predicate
                { username: username, password: password },

                // doc is unique instance matches predicate
                function(err, doc) {

                    if (err) {
                        // reject promise if error
                        deferred.reject(err);
                    } else {
                        // resolve promise
                        deferred.resolve(doc);
                    }

                });

            return deferred.promise;
        }


    // use user model find by id
    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
            return null;
        });
        return deferred.promise;
    }


    function findUserByUsername (username) {
        var deferred = q.defer();
        UserModel.findOne(username, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
            return null;
        });
        return deferred.promise;
    }*/
};