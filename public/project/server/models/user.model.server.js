/**
 * Created by mingzhexu on 4/23/16.
 */
//var mock = require("./user.mock.json");

// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var StudentSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('Student', StudentSchema);


    var api = {
        findAllUsers : findAllUsers,
        updateUser: updateUser,
        deleteUserById : deleteUserById,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllStudents: findAllStudents,
        studentEnroll: studentEnroll
    };
    return api;

    function findAllUsers(){

        var deferred = q.defer();

        UserModel.find(function(err,doc){
            console.log("find all user",doc);
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        //return mock;
    }

    function findAllStudents(){
        var deferred = q.defer();

        UserModel.find({roles:["student"]}, function(err, doc){
            if (err) {
                deferred.reject(err);
            } else {
                console.log(doc, "is the students in model");
                deferred.resolve(doc);
            }
            return null;
        });
        return deferred.promise;
    }

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

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                console.log("mode",doc);
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
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
    }

    function studentEnroll(studentId, courseId){
        var deferred = q.defer();
        UserModel.findOne(studentId, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                doc.courses.push(courseId);
                doc.save (function (err1, doc1) {
                    if (err1) {
                        deferred.reject(err);
                    } else {
                        // resolve promise with user
                        deferred.resolve (doc1);
                    }
                });
            }
        });
        return deferred.promise;
    }
    function studentWithdrew(studentId, courseId){

        var deferred = q.defer();

        UserModel.findOne(studentId, function(err, doc){
            if(err){
                console.log("err1");
                deferred.reject(err);
            }else{
                var index = doc.courses.indexOf(courseId);
                console.log("student withdrew in user", doc.courses);
                doc.courses.splice(index);
                doc.save(function(err1, doc1){
                    if(err1){
                        console.log("err2");
                        deferred.reject(err);
                    }else{
                        deferred.resolve(doc1);
                    }
                })
            }
        });
        return deferred.promise;
    }
};