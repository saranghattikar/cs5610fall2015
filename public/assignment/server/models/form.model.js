var forms = require("./form.mock.json");
var q = require("q");
var schemaForm = require('./form.schema.js');
mongoose = require("mongoose");



module.exports = function (app, appDb) {
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle:findFormByTitle,
        findAllFormsForUser:findAllFormsForUser
    };

    var modelForm = appDb.model('modelForm', schemaForm);


    function Create(userId,form) {
        var deferred = q.defer();
        try {
/*            form.id = guid();
            form.userId = userId;
            forms.push(form);
            deferred.resolve(form);*/

            form.id = form._id = mongoose.Types.ObjectId();
            form.userId = userId;

            modelForm.create(form, function(err, newForm){

                if (err){
                    console.log("Error while createform : ", err);
                    deferred.reject(err);
//                    return reject(err);
                } else {
                    /*                   console.log("in else");
                     console.log(newlyCreatedUser);*/
                    deferred.resolve(newForm);
                }
            });

        } catch (error) {
            console.log("error in form.model.js in create", error);
            return deferred.reject(error);
        }

        return deferred.promise;
    }


    function FindAll() {
        var deferred = q.defer();
        try {
            //deferred.resolve(forms);

            //return forms;
            modelForm.find({}, function(err, userForms){

                if (err){
                    console.log("Error while createform : ", err);
                    deferred.reject(err);
//                    return reject(err);
                } else {
                    /*                   console.log("in else");
                     console.log(newlyCreatedUser);*/
                    deferred.resolve(userForms);
                }
            });


        } catch (error) {
            console.log("error in form.model.js in findall", error);
            return deferred.reject(error);
        }

        return deferred.promise;
    }


    function findAllFormsForUser(userId){
        var deferred = q.defer();
        try{
 /*           var userForms = [];
            forms.forEach(function(form){
                if (form.userId == userId){
                    userForms.push(form);
                }
            });
            deferred.resolve(userForms);*/

            //return resolve(userForms);

            modelForm.find({userId: userId}, function(err, userForms){
                if (err){
                    console.log("Error while findAllFormsForUser : ", err);
                    deferred.reject(err);
//                    return reject(err);
                } else {
                    /*                   console.log("in else");
                     console.log(newlyCreatedUser);*/
                    deferred.resolve(userForms);
                }
            });
        }catch(error){
            console.log("error in form.model.js in findAllFormsForUser", error);
            return deferred.reject(error);
        }
        return deferred.promise;

    }

    function FindById(fid) {
        var deferred = q.defer();
        try {
/*            var found, arrlength, i;
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
            }*/

            modelForm.findOne({id: fid}, function(err, form){
                if (err){
                    console.log("Error while FindById : ", err);
                    deferred.reject(err);
//                    return reject(err);
                } else {
                    /*                   console.log("in else");
                     console.log(newlyCreatedUser);*/
                    deferred.resolve(form);
                }


            });

        } catch (error) {
            console.log("error in form.model.js in FindById", error);
            return deferred.reject(error);
        }
        return deferred.promise;
    }

    function Update(fid, changedForm) {
        var deferred = q.defer();
        try {
 /*           var exist;
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
             });*/

            modelForm.findOne({id: fid}, function(err, form){

                if (err){
                    console.log("Error in Update : ", err);
                    deferred.reject(err);
//                    return reject(err);
                } else {
                    /*                   console.log("in else");
                     console.log(newlyCreatedUser);*/
                    for(var prop in form){
                        if (!(typeof changedForm[prop] == 'undefined')){
                            form[prop] = changedForm[prop];
                        }
                    }
                    form.save(function(err){
                        if (err){
                            console.log("Error in Update : ", err);
                            deferred.reject(err);
//                    return reject(err);
                        } else {
                            /*                   console.log("in else");
                             console.log(newlyCreatedUser);*/
                            deferred.resolve(form);
                        }
                    });
                }

            });

 /*           if (exist) {
                deferred.resolve(updatedForm);
                //return updatedForm;
            } else {
                deferred.reject("Error in updating form eith id"+id);

            }*/
            //return deferred.promise;
        }
        catch (error) {
            console.log("error on update");
            return deferred.reject(error);
        }

        return deferred.promise;
    }

    function Delete(fid) {
        var deferred = q.defer();
        console.log("*************************");
        console.log("in delete model.js")
        console.log(fid);
        try {
            /*if (typeof id != 'string') {
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
                //return deferred.promise;


            }*/


            FindById(fid)
                .then(function(obtainedForm){
                    console.log(obtainedForm);
                    console.log("After Printing obtainedform");
                    var userId = obtainedForm.userId || "";
                    modelForm.remove({id: fid}, function(error){
                        if(error){
                            return deferred.reject(error);
                        } else {
                            findAllFormsForUser(userId)
                                .then(function(uForms){
                                    console.log(uForms);
                                    deferred.resolve(uForms)
                                    //return resolve(uForms);
                                });
                        }
                    })
                });
                /*.catch(function(error){
                    return deferred.reject(error);
                });*/




        } catch (error) {
            console.log("exception in delete Delete method in form.model.js", error);
            return deferred.reject(error);
        }

        return deferred.promise;
    }

    function findFormByTitle(title)

    {
        var deferred = q.defer();
        try {
 /*           var form, arrlength, i;
            arrlength = forms.length
            for (i = 0; i < arrlength; i++) {
                if (forms[i].title == title) {
                    form = forms[i];
                    console.log("form found by title")
                }
            }*/

            modelForm.findOne({title: title}, function(err, form){
                if (form) {
                    deferred.resolve(form);
                } else {
                    deferred.reject("No form found with title : "+title);
                }

            });


 /*           if (form) {
                deferred.resolve(form);
            } else {
                deferred.reject("No form found with title : "+title);
            }*/
        } catch (error) {
            console.log("error in form.model.js in findFormByTitle", error);
            return deferred.reject(error);
        }
        return deferred.promise;
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

    return api;


};
