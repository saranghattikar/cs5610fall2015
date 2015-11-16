(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        console.log("Hi FormService is here");
        var forms = [];

        function createFormForUser(userId, form, callback) {

            try {
                if (typeof  userId == 'string' && typeof form == 'object') {
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
            }
        };

        function findAllFormsForUser(userId, callback) {
            var uforms = [];

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
            }
        };

        function deleteFormById(formId, callback) {


            try {
                if (!formId || typeof formId !== "string"){
                    return callback("please provide a valid formId string");
                } else {
                    var found = false;
                    var userId ;
                    forms.forEach(function(form, index){
                        if (form && form.id == formId){
                            found = true;
                            userId = form.userid;
                            forms.splice(index, 1);
                        }
                    });
                    if (found){
                        var remaningForms = [];
                        forms.forEach(function(form, index){
                            if (form && form.userid == userId){
                                remaningForms.push(form);
                            }
                        })
                        return callback(null, remaningForms);
                    } else {
                        return callback("No form found with formId : "+formId);
                    }
                }
            } catch(error){
                console.log("catched an Exception in 'deleteFormById' method", error);
                return callback(error);
            }
            /*var formsRemaining = [];
            try {

                if (typeof formId == "string") {
                    console.log("in deleteFormById");
                    var formFlag;
                    var userId;

                    console.log(formId);
                    console.log(forms);

                    var i = forms.length;
                    while (i--) {
                        if (forms[i].id == formId) {
                            forms.splice[i, 1];
                        }
                    }
                    console.log(forms);
                    console.log("after if (form.formid===formId)");
                    if (formFlag) {
                        forms.forEach(function (form, index) {
                            if (form.userid == userId) {
                                console.log("userid matched");
                                formsRemaining.push[form];
                            }
                        });
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

        function updateFormById(formId, newForm, callback) {

            try {
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

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;


    }
})();