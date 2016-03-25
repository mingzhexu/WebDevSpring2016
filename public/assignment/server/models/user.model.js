/**
 * Created by mingzhexu on 3/21/16.
 */
var mock = require("./user.mock.json");

// load q promise library
// var q = require("q");

module.exports = function() {

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
        for(var u in mock) {
            if( mock[u].username == username ) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers(){
        return mock;
    }

    // use user model find by id
    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        console.log("newly created user with id:", user._id);
        mock.push(user);
        return user;
    }

    function findUserByCredentials(username, password) {
        for(var u in mock) {
            if( mock[u].username == username &&
                mock[u].password == password) {
                return mock[u];
            }
        }
        return null;
    }
};