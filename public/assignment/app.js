/**
 * Created by mingzhexu on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"]);
      /*  .config(function($routeProvider){
            $routeProvider
                .when("#/home", {
                    templateUrl: "/assignment/views/home/home.view.html"
                })
                .when("#/profile", {
                    templateUrl: "/assignment/views/users/profile.view.html"
                })
                .when("#/",{
                    templateUrl: "/assignment/views/home/home.view.html"
                })
                .when("#/admin", {
                    templateUrl: "/assignment/views/admin/admin.view.html"
                })
                .when("#/login", {
                    templateUrl: "/assignment/views/users/login.view.html"
                })
                .when("#/register", {
                    templateUrl: "/assignment/views/users/register.view.html"
                })
                .otherwise({
                    redirectTo: "/assignment/views/home/home.view.html"
                });
        })
        .controller("NavControllerTwo", function($scope, $location){
            console.log("I am at: " + $location.url);
            $scope.$location = $location;
        });
        */
})();
