/**
 * Created by mingzhexu on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/register", {
                    templateUrl: "/assignment/views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "/assignment/views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "/assignment/views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "/assignment/views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/forms", {
                    templateUrl: "/assignment/views/forms/forms.view.html",
                    controller: "FormsController"
                })
                .when("/fields", {
                    templateUrl: "/assignment/views/forms/fields.view.html",
                    controller: "FieldsController"
                })
                .when("/", {
                    templateUrl: "/assignment/views/home/home.view.html",
                    controller: "HomeController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();