/**
 * Created by mingzhexu on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/register", {
                    templateUrl: "/assignment/client/views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "userModel"
                })
                .when("/login", {
                    templateUrl: "/assignment/client/views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "userModel"
                })
                .when("/profile", {
                    templateUrl: "/assignment/client/views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "userModel"
                })
                .when("/admin", {
                    templateUrl: "/assignment/client/views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "userModel"
                })
                .when("/forms", {
                    templateUrl: "/assignment/client/views/forms/forms.view.html",
                    controller: "FormsController",
                    controllerAs: "formModel"
                })
                .when("/form/:formId/fields", {
                    templateUrl: "/assignment/client/views/forms/fields.view.html",
                    controller: "FieldController",
                    controllerAs: "formModel"
                })
                .when("/home", {
                    templateUrl: "/assignment/client/views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "userModel"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();