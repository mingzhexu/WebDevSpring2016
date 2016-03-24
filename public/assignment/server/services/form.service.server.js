/**
 * Created by mingzhexu on 3/21/16.
 */
module.exports = function(app, userModel, formModel) {

    app.get("/api/assignment/user/:userId/form", findAllForms);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", removeFormById);
    app.post("/api/assignment/user.:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findFormById(req, res)
    {
        var id = req.params["formId"];
        var form = formModel.findFormById(id);
        res.json(form);
    }

    function findAllForms(req, res)
    {
        res.json(formModel.findAllForms());
    }

    function removeFormById(req, res)
    {
        var id = req.params["formId"];
        var forms = formModel.removeFormById(id);
        res.json(forms);
    }

    function createForm(req, res)
    {
        var form = req.body;
        var newForm = formModel.createForm(form);
        res.json(newForm);
    }

    function updateFormById(req, res)
    {
        var id = req.params["formId"];
        var newForm = req.body;
        console.log("in form server service:", id, newForm);
        res.json(formModel.updateFormById(id, newForm));
    }
};