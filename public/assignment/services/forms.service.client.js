/**
 * Created by mingzhexu on 2/28/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($rootScope) {
        var forms;
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var services = {
            createFormForUser : createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            setCurrentForm: setCurrentForm,
            findFormByTitle: findFormByTitle
        };

        return services;

        function setCurrentForm(form, callback){
            $rootScope.form = form;
            callback(form);
        }

        function createFormForUser(userId, form, callback){
            var id = (new Date).getTime();
            var form = {"_id": id, "title": form.title, "userId": userId};
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback){
            var len = forms.length;
            var userForms = [];
            for(var i = 0; i < len; i++){
                if(forms[i].userId == userId){
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback){
            var len = forms.length;
            for(var i = 0; i < len; i++){
                console.log(formId);
                console.log(forms[i]._id);
                if(forms[i]._id == formId){
                  //  var index = forms.indexOf(form);
                    forms.splice(i, 1);
                    console.log("deleted");
                }
            }
            console.log("in the delete service");
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            var len = forms.length;
            for(var i = 0; i < len; i++){
                if(forms[i]._id == formId){
                    forms[i] = newForm;
                    console.log("updated");
                }
            }
            callback(newForm);
        }

        function findFormByTitle(form_title, forms, callback){
            for(var form in forms){
                if(form.title == form_title){
                    callback(form);
                }
            }
        }
    }
})();