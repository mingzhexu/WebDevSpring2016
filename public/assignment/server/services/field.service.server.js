/**
 * Created by mingzhexu on 3/21/16.
 */
module.exports = function(app, userModel, formModel)
{
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.get("/api/assignment/form/:formId/fields", findFormFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeFormFieldById);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);



    function findFormFieldById(req, res)
    {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];

        var field = formModel.findFormFieldById(formId, fieldId);
        res.json(field);
    }

    function findFormFields(req, res)
    {
        var formId = req.params["formId"];
        var fields = [];
        fields = formModel.findFormFields(formId);
        res.json(fields);
    }

    function removeFormFieldById(req, res)
    {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        console.log("field server service", fieldId);
        var fields = formModel.removeFormFieldById(formId, fieldId);
        console.log("field server service", fields);
        res.json(fields);
    }

    function createFormField(req, res){
        var formId = req.params["formId"];

        var field = req.body;

        var fields = formModel.createFormField(formId, field);
        res.json(fields);
    }

    function updateFormFieldById(req, res)
    {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var field = req.body;

        var form = formModel.updateFormFieldById(formId, fieldId, field);
        res.json(form);
    }


};