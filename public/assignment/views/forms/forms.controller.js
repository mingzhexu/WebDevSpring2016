/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $rootScope, FormService) {
        var callback = function(response){
            $scope.forms = response;
        }
        FormService.findAllFormsForUser($rootScope.currentUser._id, callback);

        $scope.addForm = function(form){
            var callback = function(response){
                $scope.form = response;
                $scope.forms.push($scope.form);
            }
            FormService.createFormForUser($rootScope.currentUser._id, form, callback);
            $scope.form = "";

        }

        $scope.selectForm = function(form){
            $scope.selectedFormIndex = $scope.forms.indexOf(form);
            var callback = function(response){
                $scope.form = {
                    _id: response._id,
                    title: response.title,
                    userId: response.userId
                };
            }
            FormService.setCurrentForm(form, callback);
        }

        $scope.updateForm = function(form){
            $scope.message = null;
            var index = $scope.selectedFormIndex;
            var callback = function(response){
                console.log("update form at: " + $scope.selectedFormIndex);
                console.log($scope.form);
                $scope.forms[$scope.selectedFormIndex].title = response.title;
            }
            FormService.updateFormById($scope.forms[index]._id, form, callback);
            $scope.form = {};
        }

        $scope.deleteForm = function(form){
            var index = $scope.forms.indexOf(form);
            $scope.forms.splice(index, 1);

            var callback = function(response){
                $scope.forms = response;
                var nest = function(filter){
                    $scope.forms = filter;
                }
                FormService.findAllFormsForUser($rootScope.currentUser._id, nest);
            }
            FormService.deleteFormById(form._id, callback);
            console.log(form._id);

        }
    }
})();