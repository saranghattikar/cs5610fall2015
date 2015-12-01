/**
 * Created by SarangPC on 11/15/2015.
 */
require('body-parser');
var mongoose = require("mongoose");
module.exports = function (app, model) {
    app.get("/api/assignment/form/:formId/field", getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.post("/api/assignment/form/:formId/field/:index", cloneField);

    function createField(req, res) {
        var field = req.body || {};
        //field.id = guid();
        field.id = field._id = mongoose.Types.ObjectId();
        var formId = req.params.formId;
        model.FindById(formId)
            .then(function (requiredForm) {
                requiredForm = requiredForm || {};
                requiredForm.fields = requiredForm.fields || [];
                requiredForm.fields.push(field);
                model.Update(formId, requiredForm)
                    .then(function (updatedForm) {
                        var newFields = updatedForm.fields || [];
                        res.json(newFields);
                    });
            })
            .catch(function (error) {
                console.log('error in createfield', error);
                res.status(400).send(error);
            });
    }

    function getFormFields(req, res) {
        var formId = req.params.formId;
        model.FindById(formId)
            .then(function (requiredForm) {
                requiredForm = requiredForm || {};
                var fields = requiredForm.fields || [];
                res.json(fields);
            })
            .catch(function (error) {
                console.log('error in getFormFields', error);
                res.status(400).send(error);
            });
    }


    function cloneField(req, res){
        var clonedField = req.body || {};
        //clonedField.id = guid();
        clonedField.id = clonedField._id = mongoose.Types.ObjectId();
        var index = req.params.index, formId = req.params.formId;
        model.FindById(formId)
            .then(function(form){
                var fields = form.fields;
                fields.splice(index, 0, clonedField);
                model.Update(formId, form)
                    .then(function(updatedForm){
                        res.json(updatedForm.fields);
                    });
            })
            .catch(function(error){
                console.log('updateForm error', JSON.stringify(error));
                res.status(400).send(JSON.stringify(error));
            });
    }

    function getFieldById(req, res) {
        var formId = req.params.formId, fieldId = req.params.fieldId;
        model.FindById(formId)
            .then(function (requiredForm) {
                requiredForm = requiredForm || {};
                var fields = requiredForm.fields || [];
                var requiredField;
                fields.forEach(function (field, index) {
                    if (field.id.equals(fieldId)) {
                        requiredField = field;
                    }
                });
                if (requiredField) {
                    res.json(fields);
                } else {
                    res.status(400).send("no field found with id:" + fieldId);
                }
            })
            .catch(function (error) {
                console.log('error in getFieldById', error);
                res.status(400);
            });
    }


    function deleteFieldById(req, res) {
        var formId = req.params.formId, fieldId = req.params.fieldId;
        model.FindById(formId)
            .then(function (requiredForm) {
                requiredForm = requiredForm || {};
                var fields = requiredForm.fields || [];
                var remainingFields = [];
                fields.forEach(function (field, index) {
                    if (field.id.equals(fieldId)) {
                        fields.splice(index, 1);
                    }
                });
                requiredForm.fields = fields || [];
                model.Update(formId, requiredForm)
                    .then(function (updatedForm) {
                        res.json(requiredForm.fields);
                    });
            })
            .catch(function (error) {
                console.log('error in deleteFieldById', error);
                res.status(400);
            });
    }


    function updateField(req, res) {
        var inputField = req.body || {};
        var formId = req.params.formId, fieldId = req.params.fieldId;
        model.FindById(formId)
            .then(function (requiredForm) {
                requiredForm = requiredForm || {};
                fields = requiredForm.fields || [];
                fields.forEach(function (field, index) {
                    if (field.id.equals(fieldId)) {
                        field = inputField;
                    }
                });
                requiredForm.fields = fields || [];
                model.Update(formId, requiredForm)
                    .then(function (updatedForm) {
                        res.json(inputField);
                    });
            })
            .catch(function (error) {
                console.log('error in updateField', error);
                res.status(400);
            });
    }


    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


}
