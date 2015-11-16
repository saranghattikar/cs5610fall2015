/**
 * Created by SarangPC on 11/12/2015.
 */
require('body-parser');
module.exports = function (app, model) {
    app.post("/api/assignment/user/:userId/form", addform);
    app.get("/api/assignment/form/user/:userId", getUserForms);
    app.get(" /api/assignment/form/:formId", getFormById);
    app.put("/api/assignment/form/:formId", updateform);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function addform(req, res) {
        console.log(req);
        //console.log("in server service adduser");
        var userId = req.params.userId;
        var form = req.body;
        console.log("in server service addform");
        model
            .Create(userId,form)
            .then(function (form) {
                res.json(form);
            });
    }

    function getUserForms(req,res){
        var userId = req.params.userId;
        model.findAllFormsForUser(userId)
            .then(function(userForms){
                console.log("in server service getUserForms");
                console.log(userForms);

                res.json(userForms);
            })
            .catch(function(error){
                console.log('getUserForms error',error);
                res.status(400).send(error);
            });
    }

    function getFormById(req, res){
        var formId = req.params.formId;
        model.FindById(formId)
            .then(function(form){
                res.json(form);
            })
            .catch(function(error){
                console.log('getFormById error',error);
                res.status(400);
            });
    }


    function updateform(req, res){
        var form = req.body || {};
        var formId = req.params.formId;
        model.Update(formId, form)
            .then(function(updatedForm){
                res.json(updatedForm);
            })
            .catch(function(error){
                console.log('updateForm error', error);
                res.status(400);
            });
    }

    function deleteFormById(req, res){

        var formId = req.params.formId;
        model.Delete(formId)
            .then(function(userForms){
                res.json(userForms);
            })
            .catch(function(error){
                console.log('deleteFormById error',error);
                res.status(400);
            });

    }


}