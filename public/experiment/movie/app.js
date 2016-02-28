/**
 * Created by mingzhexu on 2/18/16.
 */
(function(){
    // angular JS has module to split code into different sections
    // a module that maps to angular js
    angular
        .module("MovieAdminApp", [])
        .controller("MovieController");

    // this function is a constructor $scope is the key that they talk to each other!!! s
    // cope is the interface btw controller and view
    function  MovieController($scope){
        $scope.hello = "hello with scope";
        console.log("hello from movie controller");
    }
})();