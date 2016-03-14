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
                .when("/enrollments", {
                    templateUrl: "/project/learningMgmt/views/users/enrollment.view.html",
                    controller: "EnrollController"
                })
                .when("/instructor", {
                    templateUrl: "/project/learningMgmt/views/users/instructor.view.html",
                    controller: "InstructorController"
                })
                .when("/", {
                    templateUrl: "/project/learningMgmt/views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/courses", {
                    templateUrl: "/project/learningMgmt/views/courses/courses.view.html",
                    controller: "CourseController"
                })
                .when("/detail", {
                    templateUrl: "/project/learningMgmt/views/courses/detail.view.html",
                    controller: "DetailController"
                })
                .when("/about", {
                    templateUrl: "/project/learningMgmt/views/home/about.view.html"
                })
                .when("/result", {
                    templateUrl: "/project/learningMgmt/views/home/result.view.html",
                    controller: "ResultController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();