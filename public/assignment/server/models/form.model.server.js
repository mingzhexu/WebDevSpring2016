/**
 * Created by mingzhexu on 3/21/16.
 */
var mock = require("./form.mock.json");

var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormModel = mongoose.model("Form",FormSchema);
    var FieldModel  = mongoose.model("Field", FieldSchema);

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


    function findAllFormsForUser(userId){
        var deferred = q.defer();
        FormModel.find({userId:{$in:userId}},function(err,forms){
            if(err){
                deferred.reject(err);
            }else{
                //console.log("forms for user", userId, forms);
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    // return the whole list of forms for the user
    function updateFormById(formId, form){
        var deferred = q.defer();

        FormModel.findById(formId, function(err,doc){
            doc.title = form.title;
            doc.fields = form.fields;
            console.log("update in model", form.title);
            doc.save(function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            })
        });
        return deferred.promise;
    }

    function removeFormById(id){
        var deferred = q.defer();

        FormModel.remove({_id:id},
            function(err,result){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }

    function createForm(userId, form) {
        var newform = new FormModel({
            userId:userId,
            title:form.title,
            fields:[],
            created:new Date(),
            updated:new Date()
        });

        console.log("new form:,",newform);
        var deferred = q.defer();
        newform.save(function (err,doc){
            if(err){
                deferred.reject(err)
            }else{
                console.log("doc",doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(userId, title){
        var deferred = q.defer();
        FormModel.find({title:title, userId:userId},function(err,result){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function setSelectedForm(form){

    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById({_id : formId},function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                // console.log("find form by id - model", doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormFieldById(formId, fieldId)
    {
        var deferred = q.defer();
        FormModel.findOne({_id:formId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                if(doc){
                    doc.fields.findOne({_id:fieldId},
                        function(err,doc){
                            if(err){
                                deferred.reject(err);
                            }else{
                                deferred.resolve(doc);
                            }
                        })
                }
            });
        return deferred.promise;
    }

    function findFormFields(formId)
    {
        var deferred = q.defer();
        FormModel.findById({_id:formId},function(err, form){
            if(err){
                deferred.reject(err);
            }
            if(form){
                var fields = form.fields;
                // console.log("fields found:", fields);
                deferred.resolve(fields);
            }
        });
        return deferred;
    }

    function removeFormFieldById(formId, fieldId)
    {
        var deferred= q.defer();
        FormModel.findOne({_id:formId},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            if(doc){
                // remove the field in the form model
                for(var i = 0; i < doc.fields.length;i++){
                    if(doc.fields[i]._id.toString() == fieldId){
                        doc.fields.splice(i,1);
                        break;
                    }
                }
                doc.save(function(err1,doc1){
                    if(err1){
                        deferred.reject(err1);
                    }else{
                        deferred.resolve(doc1);
                        console.log("doc1", doc1)
                    }
                });
                // remove the field in field model
                FieldModel.remove({_id: fieldId}, function (err2, doc2) {
                    if (err2) {
                        deferred.reject(err2);
                    }
                    if (doc2) {
                        deferred.resolve(doc2);
                    }
                });
            }
        });
        return deferred;
    }

    function createFormField(formId, field)
    {
        var deferred = q.defer();

        var newField = new FieldModel({
            label:field.label,
            type:field.type,
            placeholder:field.placeholder,
            options:field.options
        });
        console.log(newField);
        FormModel.findOne({_id:formId},function(err,form) {
            if (err) {
                deferred.reject(err);
            } else {
                newField.save(function(err1,doc1){
                    if(err1){
                        deferred.reject(err1);
                    }else{
                        deferred.resolve(doc1);
                    }
                });
                form.fields.push(newField);
                form.save(function(err2,doc2){
                    if(err2){
                        deferred.reject(err2);
                    }else{
                        deferred.resolve(doc2);
                    }
                })
            }
        });
        return deferred.promise;
    }

    function updateFormFieldById(formId, fieldId, field)
    {
        var deferred = q.defer();
        var type = field.type;
        var newField;

        if (type == "TEXT" || type == "TEXTAREA") {
            newField = {
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                options:[]
            };
        } else if (type == "OPTIONS" || type == "CHECKBOXES" || type == "RADIOS") {
            newField = {
                label: field.label,
                type: field.type,
                options: field.options
            };
        } else {
            newField = {
                label: field.label,
                type: field.type,
                options:[]

            };
        }
        newField = new FieldModel(newField);
        FormModel
            .findOneAndUpdate(
                {_id: new ObjectId(formId), 'fields._id': new ObjectId(fieldId)},
                {$set: {'fields.$': newField}},
                {new: true},
                function(err, doc) {
                    if (doc) {
                        deferred.resolve(doc)
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }
};
