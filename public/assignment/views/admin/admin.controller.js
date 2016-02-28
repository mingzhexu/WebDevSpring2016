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
        console.log("this is Admin controller");

    }

    /*
    function renderRoles(roles){
        var role;
        if(roles.length == 1)  {
            role = roles[0];
        }else{
            var len = roles.length;
            for (var i = 0; i < len - 1; i++){
                roles[i].concat("|");
                role.concat(roles[i]);
            }
            return role = role.concat(roles[len - 1]);
        }
    }*/
})();