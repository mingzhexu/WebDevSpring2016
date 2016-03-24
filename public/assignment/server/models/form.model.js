/**
 * Created by mingzhexu on 3/21/16.
 */
var mock = require("./form.mock.json");
module.exports = function() {

    var api = {
        findAllForms : findAllForms,
        updateFormById: updateFormById,
        removeFormById : removeFormById,
        createForm: createForm,
        findFormById: findFormById
    };

    return api;

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

    function findAllForms(){
        return mock;
    }

    function findFormById(formId) {
        for(var u in mock) {
            if( mock[u]._id === formId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
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
