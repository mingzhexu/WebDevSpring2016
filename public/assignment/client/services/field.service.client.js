/**
 * Created by mingzhexu on 3/27/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http) {


        var services = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return services;

        function createFieldForForm(formId, field)
        {
            return $http.post("/api/assignment/form/"+formId+"/field", field);
        }

        function getFieldsForForm(formId)
        {
            return $http.get("/api/assignment/form/"+formId+"/fields");
        }

        function getFieldForForm(formId, fieldId)
        {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId, fieldId)
        {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId, fieldId, field)
        {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }
    }

})();