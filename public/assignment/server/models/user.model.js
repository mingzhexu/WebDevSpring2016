/**
 * Created by mingzhexu on 3/21/16.
 */
var mock = require("./user.mock.json");

// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

     // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);


    var api = {
        findAllUsers : findAllUsers,
        updateUser: updateUser,
        deleteUserById : deleteUserById,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };
    return api;

    function updateUser(userId, user){
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                console.log("userId updated:", userId);
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].username = user.username;
                mock[u].password = user.password;
                mock[u].email = user.email;
                console.log("after update, the user is:", mock[u]);
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(id){

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

    function findAllUsers(){
        return mock;
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

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
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

};