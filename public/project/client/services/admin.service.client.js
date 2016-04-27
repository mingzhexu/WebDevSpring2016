/**
 * Created by mingzhexu on 4/27/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .factory("AdminServices", AdminService);

    function AdminService($http) {

        var services = {
            adminFindAllUsers: adminFindAllUsers,
            adminFindUserById: adminFindUserById,
            adminDeleteUserById: adminDeleteUserById,
            adminCreateUser: adminCreateUser,
            adminUpdateUser: adminUpdateUser
        };

        return services;

        function adminUpdateUser(userId, user) {
            return $http.put("/api/project/admin/user/"+userId, user);
        }

        function adminFindAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function adminCreateUser(user) {
            return $http.post("/api/project/admin/user", user);
        }

        function adminDeleteUserById(userId) {
            return $http.delete("/api/project/admin/user/"+userId);
        }

        function adminFindUserById (userId) {
            return $http.get("/api/project/admin/user/"+userId);
        }
    }
})();