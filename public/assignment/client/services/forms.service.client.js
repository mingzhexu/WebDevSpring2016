/**
 * Created by mingzhexu on 2/28/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($rootScope, $http, $q) {

        var services = {
            createFormForUser : createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            setCurrentForm: setCurrentForm,
            getCurrentForm: getCurrentForm,
            findFormByName: findFormByName
        };

        return services;

        function findFormByName(userId, title){
            return $http
                .get("/api/assignment/user/"+userId+"/form/title/"+title);
        }

        function getCurrentForm(){
            return $http
                .get("/api/assignment/form/select");
        }

        function setCurrentForm(form){
            return $http
                .post("/api/assignment/form/select", form);
        }

        function createFormForUser(userId, form){
            return $http
                .post("/api/assignment/user/"+userId+"/form", form);
        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + userId +"/form")
                .success(function(response){
                    console.log("response in service client:",response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById(formId){
            return $http
                .delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, newForm){
            return $http
                .put("/api/assignment/form/"+formId, newForm);
        }
    }
})();