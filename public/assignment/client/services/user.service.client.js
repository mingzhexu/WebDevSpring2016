/**
 * Created by mingzhexu on 2/27/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserServices", userService);

    function userService($http, $rootScope, $q)
    {

        var services = {
            findAllUsers : findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById : deleteUserById,
            findUserById: findUserById,
            findUserByUserName: findUserByUserName,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout : logout,
            sortAscending: sortAscending
        };

        return services;

        function sortAscending(category,dir){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/admin/sort?category=" + category + "&dir=" + dir)
                .success(function(users){
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        function logout()
        {
            return $http
                .post("/api/assignment/logout");
        }

        function findUserByCredentials(credentials)
        {
            //console.log("user service client", credentials);
            var username = credentials.username;
            var password = credentials.password;
            return $http
                .post("/api/assignment/user/"+username+"/password/"+password);
        }

        function findUserById(id)
        {
            return $http
                .get("api/assignment/admin/user/"+id);
        }

        function findAllUsers()
        {
            return $http
                .get("/api/assignment/admin/user");
        }

        function createUser(user)
        {
            return $http
                .post("/api/assignment/admin/user", user);
        }

        function deleteUserById(userId)
        {
            return $http
                .delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId, user)
        {
            console.log("update user in client service:", userId, user);
            return $http
                .put("/api/assignment/admin/user/" + userId, user);
        }

        function findUserByUserName(user)
        {
            var username = user.username;
            console.log("username:", user.username);
            return $http
                .get("/api/assignment/user/" + username);
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