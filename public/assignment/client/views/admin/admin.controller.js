/**
 * Created by mingzhexu on 2/25/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserServices) {
        UserServices
            .findAllUsers()
            .then(handleSuccess, handleError);

        $scope.sortAscending = function(category,up){
            UserServices
                .sortAscending(category,up)
                .then(handleSuccess,handleError);
        };

        $scope.updateUser = function(user){
            var userId = user._id;
            UserServices
                .updateUser(userId,user)
                .then(handleSuccess, handleError);
        }

        $scope.addUser = function(user){
            UserServices
                .createUser(user)
                .then(handleSuccess, handleError);

        }

        $scope.deleteUser = function(user){
            var userId = user._id;
            UserServices
                .deleteUserById(userId)
                .then(handleSuccess, handleError);
        }

        $scope.selectUser = function(user){
            $scope.newUser = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
            console.log(response.data, "the users");
            $scope.newUser = null;
        }

        function handleError(error) {
            console.log("error in constroller");
            vm.error = error;
        }
    }
})();