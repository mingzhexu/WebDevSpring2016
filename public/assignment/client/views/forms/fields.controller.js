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
            var newField =
            {
                "_id" : field._id,
                "label": field.label,
                "type":field.type,
                "placeholder": field.placeholder,
                "options":field.options
            };
            $scope.selectedField = newField;

            var fieldType = field.type;
            if (fieldType == "TEXT" || fieldType == "TEXTAREA") {
                $("#dialog-1").modal();
            } else if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS") {
                $("#dialog-3").modal();
            }else {
                $("#dialog-2").modal();
            }
        };

        $scope.updateField = function(field, newfield)
        {
            FieldService
                .getFieldForForm(formId, $scope.selectedField._id)
                .then(function(response){
                    if(response.data)
                    {
                        $scope.field = response.data;
                    }
                });

            console.log("in update", field);
            field.label = newfield.label;
            field.placeholder = newfield.placeholder;
            field.options = [];
            if(newfield.options != null){
                var options = newfield.options.split("\n");
                for(var u in options){
                    var s = options[u].split(":");
                    console.log("S:",s);
                    var one = {"label":s[0], "value":s[1]}
                    field.options.push(one);
                }
            }
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