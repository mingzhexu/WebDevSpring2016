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

            } else if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS") {
                $("#dialog-3").modal();
            }else {
                $("#dialog-2").modal();
            }
        }

        $scope.updateField = function(field, newfield)
        {
            console.log("in update", field, field._id, formId);
            console.log("in update", newfield, field._id, formId);
            field.label = newfield.label;
            field.placeholder = newfield.placeholder;
            field.options = newfield.options;
            FieldService
                .updateField(formId, field._id, field)
                .then(function(response){
                    if(response.data){
                        console.log("update field:",response.data);
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