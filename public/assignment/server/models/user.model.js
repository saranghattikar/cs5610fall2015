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
        var deferred = q.defer();
        try {
            users.push(user);
            deferred.resolve(users);
            return deferred.promise;
        } catch (error) {
            console.log("error in user.model.js in create", error);
        }
    }

    function FindAll() {
        var deferred = q.defer();
        try {
            deferred.resolve(users);
            return deferred.promise;
        } catch (error) {
            console.log("error in user.model.js in findall", error);
        }
    }


    function FindById(id) {
        var deferred = q.defer();
        //console.log("in FindById",id);
        try {
            var usr, pswd, arrlength, i;
            arrlength = users.length;
            //console.log(arrlength);
            for (i = 0; i < arrlength; i++) {
                if (users[i].id == id) {
                    usr = users[i];
                    console.log("user found")
                }
            }
            if (usr) {
                deferred.resolve(usr);
                console.log(usr);
                //return usr;

            } else {
                deferred.resolve(usr);
                //return null;
            }
            return deferred.promise;

        } catch (error) {
            console.log("error in user.model.js in FindById", error);
        }
    }

    function Update(id, changedUser) {
        var deferred = q.defer();
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
                deferred.resolve(updatedUser);
                //return updatedUser;
            } else {
                deferred.resolve(null);
                //return null;
            }
            return deferred.promise;
        }
        catch (error) {
            console.log("error on updateUser");
            return error;
        }
    }

    function Delete(userid) {
        var deferred = q.defer();
        try {
            if (typeof userid != 'string') {
                deferred.resolve(null);
                //return null;
            } else {
                users.forEach(function (user, index) {
                    if (user.id === userid) {
                        console.log("User deleted");
                        users.splice(index, 1);
                    }
                });
                deferred.resolve(users);
                return deferred.promise;
                //return users;
            }
        } catch (error) {
            console.log("exception in delete method in user.model.js", error);
            return error;
        }
    }

    function findUserByUsername(uname) {
        var deferred = q.defer();
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
                deferred.resolve(usr);
                //return usr;
            } else {
                deferred.resolve(null);
                //return null;
            }

            return deferred.promise;

        } catch (error) {
            console.log("error in user.model.js in FindById", error);
        }

    }


    function findUserByCredentials(uname, pswd) {
        var deferred = q.defer();
        console.log("in findUserByCredentials");
        try {
            var usr, arrlength, i;
            arrlength = users.length;
            for (i = 0; i < arrlength; i++) {
                if (users[i].username == uname && users[i].password == pswd) {
                    usr = users[i];
                    console.log("user found");
                }
            }
            if (usr) {

                console.log(usr);
                deferred.resolve(usr);
                //return usr;
            } else {
                deferred.resolve(null);
                //return null;
            }
            return deferred.promise;
        } catch (error) {
            console.log("error in user.model.js in FindById", error);
        }


    }


};