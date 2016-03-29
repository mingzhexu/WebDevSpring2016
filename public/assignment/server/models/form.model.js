/**
 * Created by mingzhexu on 3/21/16.
 */
var mock = require("./form.mock.json");
module.exports = function() {

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        updateFormById: updateFormById,
        removeFormById : removeFormById,
        createForm: createForm,
        findFormById: findFormById,
        setSelectedForm: setSelectedForm,
        findFormByTitle: findFormByTitle,

        // form field functions

        findFormFieldById: findFormFieldById,
        findFormFields: findFormFields,
        removeFormFieldById: removeFormFieldById,
        createFormField: createFormField,
        updateFormFieldById: updateFormFieldById

    };

    return api;

    function updateFormFieldById(formId, fieldId, field)
    {
        for(var u in mock)
        {
            if(mock[u]._id == formId )
            {
                var fields = mock[u].fields;
                for(var v in fields)
                {
                    if(fields[v]._id == fieldId)
                    {
                        fields[v] = field;
                        console.log(fields);
                        return fields;
                    }
                }
            }
        }
        return null;
    }

    function createFormField(formId, field)
    {
        for(var u in mock)
        {
            if(mock[u]._id == formId)
            {
                var id = "ID_" + (new Date()).getTime();
                console.log("id",id);
                field._id = 12;
                mock[u].fields.push(field);
                return mock[u].fields;
            }
        }
        return null;
    }
    function removeFormFieldById(formId, fieldId)
    {
        for(var u in mock)
        {
            if(mock[u]._id == formId)
            {
                var fields = mock[u].fields;
                for(var v in fields)
                {
                    if(fields[v]._id == fieldId)
                    {
                        fields.splice(v, 1);
                        return fields;
                    }
                }
            }
        }
        return null;
    }

    function findFormFieldById(formId, fieldId)
    {
        for (var u in mock)
        {
            if(mock[u]._id == formId)
            {
                var fields = mock[u].fields;
                for(var v in fields)
                {
                    if(fields[v]._id == fieldId)
                    {
                        return fields[v];
                    }
                }
            }
        }
        return null;
    }


    function findFormFields(formId)
    {
        var fields = [];
        for(var u in mock)
        {
            if(mock[u]._id == formId)
            {
                fields = mock[u].fields;
            }
        }
        return fields;
    }

    function findFormByTitle(userId, title){
        for(var u in mock) {
            if( mock[u].title == title && mock[u].userId == userId) {
                return mock[u];
            }
        }
        return null;
    }

    function setSelectedForm(form){

    }

    // return the whole list of forms for the user
    function updateFormById(formId, form){
        for(var u in mock) {
            if( mock[u]._id == formId ) {
                mock[u].title = form.title;
                mock[u].userId = form.userId;
                return mock[u];
            }
        }
        return null;
    }

    function removeFormById(id){
        for (var u in mock){
            if(mock[u]._id == id)
            {
                console.log("find form to be removed", u);
                mock.splice(id);
                return mock;
            }
        }
        return null;
    }

    function findUserByUsername (username) {
        for(var u in mock) {
            if( mock[u].username == username ) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId){
        var userForms = [];
        for(var u in mock)
        {
            if(mock[u].userId == userId){
                userForms.push(mock[u]);
            }
        }
        return userForms;
    }

    function findFormById(formId) {
        for(var u in mock) {
            if( mock[u]._id === formId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createForm(userId, form) {
        form._id = "ID_" + (new Date()).getTime();
        form.userId = userId;
        console.log("newly created form with id:", form._id);
        mock.push(form);
        return form;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
};
