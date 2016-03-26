/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $rootScope, FormService, UserServices) {

        UserServices
            .getCurrentUser()
            .then(function(response){
                $rootScope.currentUser = response.data;

            });
        console.log("current user:", $rootScope.currentUser);
        FormService
            .findAllFormsForUser($rootScope.currentUser._id)
            .then(function(response){
                if(response.data){
                    $scope.forms = response.data;
                }else{
                    console.log("error");
                }
            });

        $scope.addForm = function(form){
            $scope.message = null;
            FormService
                .findFormByName($rootScope.currentUser._id, form.title)
                .then(function(response){
                    if(response.data) {
                        $scope.message = "You have that form";
                    }else{
                        FormService
                            .createFormForUser($rootScope.currentUser._id, form)
                            .then(function(response){
                                if(response.data){
                                    $scope.forms.push(response.data);
                                }
                            });
                        $scope.form = "";
                    }
                });
        };

        $scope.selectForm = function(form){

            $scope.selectedFormIndex = $scope.forms.indexOf(form);

            FormService
                .setCurrentForm(form)
                .then(function(response){
                    $scope.form = response.data;
                });
        };

        $scope.updateForm = function(form){
            $scope.message = null;
            var index = $scope.selectedFormIndex;

            FormService
                .findFormByName($rootScope.currentUser._id, form.title)
                .then(function(response){
                    if(response.data) {
                        console.log("already there, dup");
                        $scope.message = "You have that form";
                    }else{
                        FormService
                            .updateFormById(form._id, form)
                            .then(function(response){
                                if(response.data){
                                    $scope.form = response.data;
                                    $scope.forms[$scope.selectedFormIndex].title = $scope.form.title;
                                }
                            });
                        $scope.form = "";
                    }
                });
            console.log("controller: ", form._id, form);

        };

        $scope.deleteForm = function(form){
            var index = $scope.forms.indexOf(form);
            $scope.forms.splice(index, 1);

            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    if(response.data){
                        console.log("delete form:", response.data);
                    }
                });
        }
    }
})();