/**
 * Created by mingzhexu on 3/21/16.
 */
module.exports = function(app, userModel, formModel)
{
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.get("/api/assignment/form/:formId/field", findFormField);
    app.delete("/api/assignment/form/:formId/field/fieldId", removeFormFieldById);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
}