/**
 * Created by mingzhexu on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, UserServices) {
        $scope.$location = $location;

        UserServices.findAllUsers(renderUsers);

        function renderUsers(response)
        {
            console.log("users:", response);
            $scope.users = response;
        }

    }
})();