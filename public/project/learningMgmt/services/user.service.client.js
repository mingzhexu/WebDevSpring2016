/**
 * Created by mingzhexu on 3/4/16.
 */
(function()
{
    angular
        .module("LearningMgmtApp")
        .factory("UserServices", userService);

    function userService($rootScope)
    {
        var users;

        users = [
            {"_id":123, "firstName":"Alice","lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"], "email": "alice@neu.edu", "courses":[123]},
            {"_id":234, "firstName":"Bob","lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["instructor"], "email": "bob@neu.edu", "courses":[223,323]},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["instructor"], "email": "charlie@neu.edu","courses":[423,323]},
            {"_id":456, "firstName":"Dan","lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["instructor"], "email": "dan@neu.edu","courses":[123,223]},
            {"_id":567, "firstName":"Edward","lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"], "email": "ed@neu.edu", "courses":[]}
        ];

        var services = {
            findAllUsers : findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById : deleteUserById,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            getCoursesByUser:getCoursesByUser
        };


        return services;

        function findUserByCredentials(username, password, callback)
        {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(users[i].username == username && users[i].password == password)
                {
                    callback(users[i]);
                }
            }
            callback(null);
        }

        function findUserById(id, callback)
        {
            callback(users[id]);
            callback(null);
        }

        function findAllUsers(callback)
        {
            console.log("return all users!");
            callback(users);
        }

        function createUser(user, callback)
        {
            user["_id"] = (new Date).getTime();
            users.push(user);
            console.log("create user in service");
            callback(user);
        }

        function deleteUserById(userId, callback)
        {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(users[i]._id == userId)
                {
                    users.splice(i, 1);
                    //console.log("delete executed in service?");
                    callback(users);
                }
            }
        }

        function updateUser(userId, user, callback)
        {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(users[i]._id == userId)
                {
                    console.log("update the user");
                    //users[i].username = user.username;
                    console.log(user);
                    users[i] = user;
                    callback(user);
                }
            }
            callback(null);
        }

        function findUserByUsername(username, callback)
        {
            var len = users.length;
            for (var i = 0; i < len; i++)
            {
                if(users[i].username == username){
                    callback(users[i]);
                }
            }
            callback(null);
        }

        function setCurrentUser(user, callback)
        {
            $rootScope.currentUser = user;
            //console.log("set the current user: ");
            //console.log($rootScope.currentUser);
            callback(user);
        }

        function getCurrentUser (callback) {
            callback($rootScope.currentUser);
        }

        function getCoursesByUser(user, callback){
            for (var i = 0; i < users.length; i++){
                if(users[i]._id == user._id){
                    callback(users[i].courses);
                }
            }
            callback(null);
        }
    }

})();