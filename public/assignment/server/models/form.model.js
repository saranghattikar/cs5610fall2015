var forms = require("./form.mock.json");
var q = require("q");
module.exports = function (app, db) {
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle:findFormByTitle,
        findAllFormsForUser:findAllFormsForUser
    };
    return api;

    function Create(userId,form) {
        var deferred = q.defer();
        try {
            form.id = guid();
            form.userId = userId;
            forms.push(form);
            deferred.resolve(form);
            return deferred.promise;
        } catch (error) {
            console.log("error in form.model.js in create", error);
            return deferred.reject(error);
        }
    }


    function FindAll() {
        var deferred = q.defer();
        try {
            deferred.resolve(forms);
            return deferred.promise;
            //return forms;
        } catch (error) {
            console.log("error in user.model.js in findall", error);
            return deferred.reject(error);
        }
    }


    function findAllFormsForUser(userId){
        var deferred = q.defer();
        try{
            var userForms = [];
            forms.forEach(function(form){
                if (form.userId == userId){
                    userForms.push(form);
                }
            });
            deferred.resolve(userForms);
            return deferred.promise;
            //return resolve(userForms);
        }catch(error){
            console.log("error in form.model.js in findAllFormsForUser", error);
            return deferred.reject(error);

        }
    }

    function FindById(id) {
        var deferred = q.defer();
        try {
            var found, arrlength, i;
            arrlength = forms.length
            for (i = 0; i < arrlength; i++) {
                if (forms[i].id == id) {
                    found = forms[i];
                    console.log("form found")
                }
            }
            if (found) {
                deferred.resolve(found);
            } else {
                deferred.reject("form not forund"+id);
            }
            return deferred.promise;
        } catch (error) {
            console.log("error in form.model.js in FindById", error);
            return deferred.reject(error);
        }
    }

    function Update(id, changedForm) {
        var deferred = q.defer();
        try {
            var exist;
            var updatedForm;
            console.log(id);
            console.log(changedForm);
            forms.forEach(function (form) {
                if (form.id == id) {
                    exist = true;
                    for (var prop in changedForm) {
                        if (changedForm[prop]) {
                            form[prop] = changedForm[prop];
                        }
                    }
                    form.id = id;
                    updatedForm = form;
                }
            });

            if (exist) {
                deferred.resolve(updatedForm);
                //return updatedForm;
            } else {
                deferred.reject("Error in updating form eith id"+id);

            }
            return deferred.promise;
        }
        catch (error) {
            console.log("error on updateForm");
            return deferred.reject(error);
        }
    }

    function Delete(id) {
        var deferred = q.defer();
        console.log("in delete model.js")
        console.log(id);
        try {
            if (typeof id != 'string') {
                deferred.resolve(null);
            } else {
                var found = false;
                var userId ;
                forms.forEach(function (form, index) {
                    if (form.id == id) {
                        console.log("form deleted");
                        found = true;
                        userId = form.userId;
                        forms.splice(index, 1);
                    }
                });

                if (found){
                    var remaningForms = [];
                    forms.forEach(function(form, index){
                        if (form && form.userId == userId){
                            remaningForms.push(form);
                        }
                    })
                    console.log("in form model")
                    console.log(remaningForms)
                    deferred.resolve(remaningForms);
                } else {
                    deferred.reject("No form found with formId : "+id);
                }
                return deferred.promise;
            }
        } catch (error) {
            console.log("exception in delete Delete method in form.model.js", error);
            return deferred.reject(error);
        }
    }

    function findFormByTitle(title)

    {
        var deferred = q.defer();
        try {
            var form, arrlength, i;
            arrlength = forms.length
            for (i = 0; i < arrlength; i++) {
                if (forms[i].title == title) {
                    form = forms[i];
                    console.log("form found by title")
                }
            }
            if (form) {
                deferred.resolve(form);
            } else {
                deferred.reject("No form found with title : "+title);
            }
        } catch (error) {
            console.log("error in form.model.js in findFormByTitle", error);
            return deferred.reject(error);
        }
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




};
