/**
 * Created by mingzhexu on 4/27/16.
 */
(function(){
    angular
        .module("LearningMgmtApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, AdminServices)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        $scope.sortType     = 'username'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        function init() {
            AdminServices
                .adminFindAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            AdminServices
                .adminDeleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            AdminServices
                .adminUpdateUser(user._id, user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                        $scope.user = null;
                    }
                    , handleError);
        }

        function add(user)
        {
            AdminServices
                .adminCreateUser(user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                        $scope.user = null;
                    }
                    , handleError);
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();