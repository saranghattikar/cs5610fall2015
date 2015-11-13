var users = require("./user.mock.json");
var q = require("q");

module.exports = function (app) {
    /*    var PageSchema = mongoose.Schema({
     "label": String,
     "created": {type: Date, default: Date.now},
     "content": [{
     "contentType": {
     type: String,
     enum: ["HEADING","LABEL", "PARAGRAPH", "LIST", "FORM"]
     },
     "heading": {
     "size" : {type: Number, default:2},
     "content" : {type: String, default: "Heading"}
     },
     "label" : {
     "content" : {type: String, default: "Label"}
     },
     "paragraph" : {
     "content" : {type: String, default: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"}
     },
     "list" : {
     "listType" : {type: String, enum: ["ORDERED", "UNORDERED"], default: "ORDERED"},
     "items": [String]
     },
     "form" : {
     "formId" : String
     }
     }]
     }, {collection: "lecture.mongo.pageEditor.pages"});

     var PageModel = mongoose.model("PageModel", PageSchema);*/

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials

    };
    return api;

    function Create(user) {
        try {
            users.push(user);
            return users;
        } catch (error) {
            console.log("error in user.model.js in create", error);
        }
    }

    function FindAll() {
        try {
            return users;
        } catch (error) {
            console.log("error in user.model.js in findall", error);
        }
    }


    function FindById(id) {
        try {
            var usr, pswd, arrlength, i;
            arrlength = users.length
            for (i = 0; i < arrlength; i++) {
                if (users[i].id === id) {
                    usr = users[i];
                    console.log("user found")
                }
            }
            if (usr) {
                return usr;
            } else {
                return null;
            }
        } catch (error) {
            console.log("error in user.model.js in FindById", error);
        }
    }

    function Update(id, changedUser) {
        try {
            var exist;
            var updatedUser;
            console.log(id)
            console.log(changedUser)
            users.forEach(function (user) {
                if (user.id === id) {
                    exist = true;
                    for (var prop in user) {
                        if (changedUser[prop]) {
                            user[prop] = changedUser[prop];
                        }
                    }
                    user.id = id;
                    updatedUser = user;
                }
            });

            if (exist) {
                return updatedUser;
            } else {
                return null;
            }
        }
        catch (error) {
            console.log("error on updateUser");
            return
        }
    }

    function Delete(userid) {
        try {
            if (typeof userid != 'string') {
                return null;
            } else {
                users.forEach(function (user, index) {
                    if (user.id === userid) {
                        console.log("User deleted");
                        users.splice(index, 1);
                    }
                });
                return users;
            }
        } catch (error) {
            console.log("exception in delete method in user.model.js", error);
            return;
        }
    }

    function findUserByUsername(uname) {
        try {
            var usr, pswd, arrlength, i;
            arrlength = users.length
            for (i = 0; i < arrlength; i++) {
                if (users[i].username === uname) {
                    usr = users[i];
                    console.log("user found")
                }
            }
            if (usr) {
                return usr;
            } else {
                return null;
            }
        } catch (error) {
            console.log("error in user.model.js in FindById", error);
        }

    }


    function findUserByCredentials(uname, pswd) {
        try {
            var usr, arrlength, i;
            arrlength = users.length;
            for (i = 0; i < arrlength; i++) {
                if (users[i].username === uname && users[i].password == pswd) {
                    usr = users[i];
                    console.log("user found");
                }
            }
            if (usr) {
                return usr;
            } else {
                return null;
            }

        } catch (error) {
            console.log("error in user.model.js in FindById", error);
        }


    }


};