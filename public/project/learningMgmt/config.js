/**
 * Created by mingzhexu on 3/3/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/register", {
                    templateUrl: "/learningMgmt/views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "/learningMgmt/views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "/learningMgmt/views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/", {
                    templateUrl: "/learningMgmt/views/home/home.view.html",
                    controller: "HomeController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();