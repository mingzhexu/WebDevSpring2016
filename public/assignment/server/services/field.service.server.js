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
        var form = formModel.findFormById(formId)
            .then(
                function(doc){
                    //console.log("form fields", doc, doc.fields);
                    res.json(doc.fields);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function removeFormFieldById(req, res)
    {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        console.log("field server service", fieldId);
        var fields = formModel.removeFormFieldById(formId, fieldId);
        res.json(fields);
    }

    function createFormField(req, res) {
        var formId = req.params["formId"];
        var field = req.body;

        var fields = formModel.createFormField(formId, field)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateFormFieldById(req, res)
    {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var field = req.body;

        var fields = formModel.updateFormFieldById(formId, fieldId, field);
        res.json(fields);
    }


};