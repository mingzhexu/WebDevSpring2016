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

        $scope.editField=function(field)
        {
            $scope.field = field;
            var fieldType = field.type;
            if (fieldType == "TEXT" || fieldType == "TEXTAREA") {
                $("#dialog-1").modal();

            } else if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIO") {
                $("#dialog-3").modal();
            }else {
                $("#dialog-2").modal();
            }
        }

        $scope.updateField = function(field)
        {
            FieldService
                .updateField(formId, field._id, field)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        $scope.fields= response.data;
                    }
                })
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