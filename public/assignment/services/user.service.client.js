/**
 * Created by mingzhexu on 2/27/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserServices", userService);

    function userService()
    {
        var users;

        users = [
            {"_id":123, "firstName":"Alice","lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]},
            {"_id":234, "firstName":"Bob","lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan","lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {"_id":567, "firstName":"Edward","lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]}
        ];

        var services = {
            findAllUsers : findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUsers: createUsers,
            updateUser: updateUser,
            deleteUserById : deleteUserById,
            findUserById: findUserById
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
            callback(users);
        }

        function createUsers(user, callback)
        {
            user["_id"] = (new Date).getTime();
            callback(user);
        }

        function deleteUserById(userId, callback)
        {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++)
            {
                if(users[i]._id == userId)
                {
                    delete(users[i]);
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
                    users[i] = user;
                    callback(user);
                }
            }
        }
    }
})();