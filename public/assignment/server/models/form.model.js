var forms = require("./form.mock.json");
module.exports = function (app, db) {
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle:findFormByTitle
    };
    return api;

    function Create(form) {
        try {
            forms.push(form);
            return users;
        } catch (error) {
            console.log("error in form.model.js in create", error);
        }
    }


    function FindAll() {
        try {
            return forms;
        } catch (error) {
            console.log("error in user.model.js in findall", error);
        }
    }

    function FindById(id) {
        try {
            var found, pswd, arrlength, i;
            arrlength = forms.length
            for (i = 0; i < arrlength; i++) {
                if (forms[i].id === id) {
                    found = forms[i];
                    console.log("form found")
                }
            }
            if (found) {
                return found;
            } else {
                return null;
            }
        } catch (error) {
            console.log("error in form.model.js in FindById", error);
        }
    }

    function Update(id, changedForm) {
        try {
            var exist;
            var updatedForm;
            console.log(id);
            console.log(changedForm);
            forms.forEach(function (form) {
                if (form.id === id) {
                    exist = true;
                    for (var prop in form) {
                        if (changedForm[prop]) {
                            form[prop] = changedForm[prop];
                        }
                    }
                    form.id = id;
                    updatedForm = form;
                }
            });

            if (exist) {
                return updatedForm;
            } else {
                return null;
            }
        }
        catch (error) {
            console.log("error on updateForm");
            return
        }
    }

    function Delete(id) {
        try {
            if (typeof id != 'string') {
                return null;
            } else {
                forms.forEach(function (form, index) {
                    if (form.id === id) {
                        console.log("form deleted");
                        forms.splice(index, 1);
                    }
                });
            }
        } catch (error) {
            console.log("exception in delete Delete method in form.model.js", error);
            return;
        }
    }

    function findFormByTitle(title)
    {
        try {
            var form, arrlength, i;
            arrlength = forms.length
            for (i = 0; i < arrlength; i++) {
                if (forms[i].title === title) {
                    form = forms[i];
                    console.log("form found by title")
                }
            }
            if (form) {
                return form;
            } else {
                return null;
            }
        } catch (error) {
            console.log("error in form.model.js in findFormByTitle", error);
        }
    }




};
