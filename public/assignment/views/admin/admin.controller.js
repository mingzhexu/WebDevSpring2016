/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserServices) {
        var callback = function(response){
            $scope.users = response;
        }
        UserServices.findAllUsers(callback);

        $scope.deleteUser = function(user){
            var user_id = user._id;
            var callback = function(response){
                $scope.user = response;
            }
            console.log(user_id);
            console.log(user.username);
            UserServices.deleteUserById(user_id, callback);


        }

        $scope.selectUser=function(user){

            $scope.selectedUserIndex = $scope.users.indexOf(user);
            $scope.person = {
                username: user.username,
                password: user.password,
                roles: user.roles
            };
            console.log("select user at: " + $scope.selectedUserIndex);
            console.log($scope.person.username);
        }

        $scope.updateUser=function(user){
            var user_id = user._id;
            console.log("update user at: " + $scope.selectedUserIndex);
            $scope.users[$scope.selectedUserIndex].username= user.username;
            $scope.users[$scope.selectedUserIndex].password= user.password;
            $scope.users[$scope.selectedUserIndex].roles= user.roles;

            console.log("update user in controller");
            console.log($scope.users[$scope.selectedUserIndex].username);
            $scope.person = {};
        }

        $scope.addUser = function(user){
            console.log("adduser!");

            var new_user = {
                username: user.username,
                password: user.password,
                roles: user.roles
            }

            var callback = function(response){
                $scope.users = response;
            }
            UserServices.createUser(new_user, callback);
            $scope.person = {};
        }
    }
})();