/**
 * Created by mingzhexu on 3/3/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "/project/learningMgmt/views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/register", {
                    templateUrl: "/project/learningMgmt/views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "/project/learningMgmt/views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "/project/learningMgmt/views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/", {
                    templateUrl: "/project/learningMgmt/views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/courses", {
                    templateUrl: "/project/learningMgmt/views/courses/courses.view.html",
                    controller: "CourseController"
                })
                .when("/about", {
                    templateUrl: "/project/learningMgmt/views/home/about.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();