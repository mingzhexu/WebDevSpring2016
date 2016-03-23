/**
 * Created by mingzhexu on 2/27/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserServices", userService);

    function userService($http, $rootScope)
    {

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
            logout : logout
        };

        return services;

        function logout()
        {
            console.log("logout");
            return $http
                .post("/api/assignment/logout");
        }

        function findUserByCredentials(credentials)
        {
            console.log("user service client", credentials);
            return $http
                .post("/api/assignment/login", credentials);
        }

        function findUserById(id)
        {
            return $http
                .get("api/assignment/user/"+id);
        }

        function findAllUsers()
        {
            return $http
                .get("/api/assignment/user");
        }

        function createUser(user)
        {
            return $http
                .post("/api/assignment/register", user);
        }

        function deleteUserById(userId)
        {
            return $http
                .delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user)
        {
            return $http
                .put("/api/assignment/user/" + userId, user);
        }

        function findUserByUsername(username)
        {
            console.log("username:", username);
            return $http
                .get("/api/assignment/search", username);
        }

        function setCurrentUser(user)
        {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http
                .get("/api/assignment/loggedin");
        }
    }
})();