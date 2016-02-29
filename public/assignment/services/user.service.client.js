/**
 * Created by mingzhexu on 2/27/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserServices", userService);

    function userService($rootScope)
    {
        var users;

        users = [
            {"_id":123, "firstName":"Alice","lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"], "email": ""},
            {"_id":234, "firstName":"Bob","lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"], "email": ""},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"], "email": ""},
            {"_id":456, "firstName":"Dan","lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"], "email": ""},
            {"_id":567, "firstName":"Edward","lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"], "email": ""}
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
            getCurrentUser: getCurrentUser
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
        }

        function findUserById(id, callback)
        {
            callback(users[id]);
            callback(null);
        }

        function findAllUsers(callback)
        {
            console.log("return all users!");
            /*
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++)
            {
                users[i].roles = ArraytoString(users[i].roles);
            }*/
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
                    console.log("udpate the user");
                    //users[i].username = user.username;
                    console.log(user);
                    users[i] = user;
                    callback(user);
                }
            }
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
        /*
        function ArraytoString(roles)
        {
            var role;
            var len = roles.length;
            for (var i = 0; i < len - 1; i++)
            {
                role = role.concat(roles[i]);
            }
            role.concat(roles[len - 1]);
            return role;
        }
        */
    }
})();