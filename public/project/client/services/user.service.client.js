/**
 * Created by mingzhexu on 3/4/16.
 */
(function()
{
    angular
        .module("LearningMgmtApp")
        .factory("UserServices", userService);

    function userService($rootScope, $http)
    {

        var services = {
            findAllUsers : findAllUsers,
            findAllStudents: findAllStudents,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById : deleteUserById,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            addCourse: addCourse,
            deleteCourse:deleteCourse
        };
        return services;

        function findUserByCredentials(credentials)
        {
            console.log("user service client", credentials);
            var username = credentials.username;
            var password = credentials.password;
            return $http
                .post("/api/project/user/"+username+"/password/"+password);
        }

        function findUserById(id)
        {
            return $http
                .get("api/project/admin/user/"+id);
        }

        function findAllUsers()
        {
            return $http
                .get("/api/project/admin/user");
        }

        function findAllStudents()
        {
            return $http
                .get("/api/project/admin/student");
        }
        function createUser(user)
        {
            console.log(user);
            return $http
                .post("/api/project/user", user);
        }

        function deleteUserById(userId)
        {
            return $http
                .delete("/api/project/admin/user/" + userId);
        }

        function updateUser(userId, user)
        {
            console.log("update user in client service:", userId, user);
            return $http
                .put("/api/project/admin/user/" + userId, user);
        }

        function findUserByUsername(username)
        {
            var username = username;
            console.log("username:", username);
            return $http
                .get("/api/project/user/" + username);
        }

        function setCurrentUser(user)
        {
            console.log("set current suer", user);
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http
                .get("/api/project/loggedin");
        }


        function addCourse(user, course){
            for(var i = 0; i < users.length; i++) {
                if (users[i]._id == user._id) {
                    if(users[i].courses.indexOf(course.id) < 0){
                        users[i].courses.push(course.id);
                        callback(course);
                    }else{
                        callback(null);
                    }
                }
            }
            callback(null);
        }

        function deleteCourse(user, course){
            for(var i = 0; i < users.length; i++) {
                if (users[i]._id == user._id) {
                    var index = users[i].courses.indexOf(course.id);
                    if(index > -1){
                        users[i].courses.splice(index,1);
                        callback(course);
                    }else{
                        callback(null);
                    }
                }
            }
            callback(null);
        }
    }

})();