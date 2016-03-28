/**
 * Created by mingzhexu on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService, FormService) {

        var formId = $routeParams.formId;
        console.log(formId, "is the formId form Route");

        FieldService
            .getFieldsForForm(formId)
            .then(function(response){
                $scope.fields = response.data;
                console.log("get all the fields: ", response.data)
            });

        $scope.addField = function(fieldType){
            console.log("add field type", fieldType);
            FieldService
                .createFieldForForm(formId, fieldType)
                .then(function(response)
                {
                    $scope.fields = response.data;
                    console.log("success");
                });
        };

        $scope.deleteField = function(field)
        {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(response){
                    $scope.fields = response.data;
                    console.log("deleted");
                });
        }
    }
})();