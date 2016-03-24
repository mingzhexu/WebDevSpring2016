/**
 * Created by mingzhexu on 3/21/16.
 */
module.exports = function(app, userModel, formModel) {

    app.get("/api/assignment/user/:userId/form", findAllForms);
    app.get("/api/assignment/form/:formId", findFormById);
    app.get("/api/assignment/user/:userId/form/title/:title", findFormByTitle);
    app.get("/api/assignment/form/select", getSelectedForm);
    app.delete("/api/assignment/form/:formId", removeFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.post("/api/assignment/form/select", setSelectedForm);


    function setSelectedForm(req, res){
        var form = req.body;
        //formModel.setSelectedForm(form);
        req.session.form = form;
        res.json(req.body);
    }

    function findFormByTitle(req, res){
        var title = req.params.title;
        var userId = req.params.userId;
        res.json(formModel.findFormByTitle(userId, title));
    }


    function getSelectedForm(req, res)
    {
        res.json(req.session.form);

    }
    function findFormById(req, res)
    {
        var id = req.params["formId"];
        var form = formModel.findFormById(id);
        res.json(form);
    }

    function findAllForms(req, res)
    {
        var userId = req.params.userId;
        res.json(formModel.findAllFormsForUser(userId));
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
        var userId = req.params.userId;
        var newForm = formModel.createForm(userId, form);
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