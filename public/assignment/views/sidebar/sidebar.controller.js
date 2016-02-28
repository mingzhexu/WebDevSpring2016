/**
 * Created by mingzhexu on 2/27/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope) {
        console.log("this is sidebar controller");
    }
})();