/**
 * Created by mingzhexu on 3/27/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http, $q) {


        var services = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            createFieldForFormWithField: createFieldForFormWithField
        };

        return services;

        function createFieldForFormWithField(formId, field)
        {
            return $http.post("/api/assignment/form/"+formId+"/field", field);
        }

        function createFieldForForm(formId, fieldType)
        {
            var field;
            var options = ["Single Line Text Field",
                "Multi Line Text Field",
                "Date Field",
                "Dropdown Field",
                "Checkboxes Field",
                "Radio Buttons Field"
            ];
            switch(options.indexOf(fieldType)){
                case 0:
                    field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    console.log("ub swutcg");
                    break;
                case 1:
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case 2:
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case 3:
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case 4:
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case 5:
                    field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
            }

            return $http.post("/api/assignment/form/"+formId+"/field", field);
        }

        function getFieldsForForm(formId)
        {
             var deferred = $q.defer();
             $http
                .get("/api/assignment/form/"+formId+"/fields")
                .success(function(response){
                    console.log("response in service client:",response);
                    deferred.resolve(response);
                });
             return deferred.promise;

        }

        function getFieldForForm(formId, fieldId)
        {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId, fieldId)
        {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(response){
                    console.log("delete successful", response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateField(formId, fieldId, field)
        {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }
    }

})();