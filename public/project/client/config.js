/**
 * Created by mingzhexu on 3/3/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "userModel"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "userModel"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "userModel"
                })
                .when("/enrollments", {
                    templateUrl: "views/users/enrollment.view.html",
                    controller: "EnrollController"
                })
                .when("/instructor", {
                    templateUrl: "views/users/instructor.view.html",
                    controller: "InstructorController"
                })
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/courses", {
                    templateUrl: "views/courses/courses.view.html",
                    controller: "CourseController",
                    controllerAs: "courseModel"
                })
                .when("/detail", {
                    templateUrl: "views/courses/detail.view.html",
                    controller: "DetailController"
                })
                .when("/about", {
                    templateUrl: "views/home/about.view.html"
                })
                .when("/students", {
                    templateUrl: "views/users/student.view.html",
                    controller: "StudentController"
                })
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();