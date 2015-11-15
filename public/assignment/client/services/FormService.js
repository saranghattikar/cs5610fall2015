(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        console.log("Hi FormService is here");
        //var forms = [];

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/"+userId+"/form",form)
                .success(function(newForm){
                    deferred.resolve(newForm);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;

/*            try {
                if (typeof  userId === 'string' && typeof form === 'object') {
                    form.id = guid();
                    form.userid = userId;
                    forms.push(form);
                    console.log("form created sucessfully and returning");
                    console.log(forms);
                    return callback(null, forms);
                } else {
                    return callback("error in user id or form")
                }
            } catch (error) {
                console.log(error)
                console.log("error in createFormForUser");
                return callback(error)
            }*/
        };

        function findAllFormsForUser(userId) {

            var deferred = $q.defer();

            $http.get("/api/assignment/form/user/"+userId)
                .success(function(userForms){
                    console.log("in user service");
                    console.log(userForms);
                    deferred.resolve(userForms);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;

            /*            var uforms = [];

            try {
                if (typeof  userId === "string") {

                    forms.forEach(function (form, index) {
                        if (form.userid === userId) {
                            uforms.push[form];
                        }
                    });
                    return callback(null, uforms);

                } else {
                    return callback("enter valid userId")
                }
            } catch (error) {
            }*/
        };

        function deleteFormById(formId) {

            var deferred = $q.defer();

            $http.delete("/api/assignment/form/"+formId)
                .success(function(userForms){
                    deferred.resolve(userForms);
                    console.log("in client model")
                    console.log(userForms)
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;





 /*           var formsRemaining = [];
            try {

                if (typeof formId === "string") {
                    console.log("in deleteFormById");
                    var formFlag;
                    var userId;

                    console.log(formId);
                    console.log(forms);

                    var i = forms.length;
                    while (i--) {
                        if (forms[i].id === formId) {
                            forms.splice[i, 1];
                        }
                    }


                    /!*     forms.forEach(function(form,index){

                     if (form.id===formId){
                     console.log("formID matched");
                     formFlag = true;
                     userId = form.userid;

                     }
                     });*!/
                    console.log(forms);
                    console.log("after if (form.formid===formId)");
                    if (formFlag) {
                        forms.forEach(function (form, index) {
                            if (form.userid === userId) {
                                console.log("userid matched");
                                formsRemaining.push[form];
                            }
                        });
                        /!*console.log(formsRemaining);*!/
                        console.log("before return");
                        return callback(null, forms);
                    }
                } else {
                    console.log("enter valid formId")
                }
            } catch (error) {
                console.log(error)
                console.log("Error in deleteFormId");
            }*/

        };

        function updateFormById(formId, newForm) {



            var deferred = $q.defer();

            $http.put("/api/assignment/form/"+formId,newForm)
                .success(function(formAfterUpdate){
                    deferred.resolve(formAfterUpdate);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;

 /*           try {
                if (typeof formId === "string" && typeof nreForm === "object") {
                    var formFlag, updatedForm;

                    forms.forEach(function (form, index) {
                        if (form.formId === formId) {
                            formFlag = true;
                            for (var p in form) {
                                form [p] = newForm[p]
                            }
                            updatedForm = form;
                        }
                    });

                    if (formFlag) {
                        return callback(null, updatedForm);
                    } else {
                        console.log("error in updateFormById");
                    }


                } else {
                    console.log("enter valid formId")
                }
            } catch (error) {
                console.log("error in method updateFormById")
            }
*/



        };


        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;


    }
})();