
var q = require("q");
var UserSchema = require('./user.schema.js');
mongoose = require("mongoose");

module.exports = function (app,appdb) {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        getfollowings:getfollowings

    };

    //var UserSchema = require('user.schema.js');
    var UserModel = appdb.model('ProjectUserModel', UserSchema);

    function getfollowings(uid) {

        var deferred = q.defer();
        try {


            UserModel.find({followers: uid}, function (err, ufollowings) {
                    console.log(ufollowings);

                if(err){
                    console.log("Error while getfollowings : ", err);
                    deferred.reject(err);
                }else {
                    deferred.resolve(ufollowings);
                }
            });


            /*        User.findById(uid).populate({ path:'following'}).exec(function(err, user) {
             if (err) {
             // handle err
             }
             if (user) {
             // user.following[] <-- contains a populated array of users you're following
             }
             });*/

        }catch (error){
            console.log(error)
        }
        return deferred.promise;
    }





    function Create(user) {
        //console.log("printing UserSchema");
        //console.log(UserModel);
        var deferred = q.defer();
        try {
 /*           user.id = guid();
            user.role = [];
            users.push(user);
            deferred.resolve(user);
            return deferred.promise;*/

            user.id = user._id = mongoose.Types.ObjectId();
            user.role = [];

            UserModel.create(user, function(err, newuser){
                if (err){
                    console.log("Error while createUser : ", err);
                    deferred.reject(err);
//                    return reject(err);
                } else {
 /*                   console.log("in else");
                    console.log(newlyCreatedUser);*/
                    deferred.resolve(newuser);
                }
            });

        } catch (error) {
            console.log("error in user.model.js in create", error);
        }
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        try {
            //deferred.resolve(users);
            //return deferred.promise;

            UserModel.find({}, function(err, users){
                if (err){
                    console.log("Error while findAllUsers : ", err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                    //resolve(dbUsers);
                }
            });
        } catch (error) {
            console.log("error in user.model.js in findall", error);
        }
        return deferred.promise;
    }


    function FindById(objectId) {
        var deferred = q.defer();

        try {
            UserModel.findOne({id: objectId}, function(err, usr){

                if (usr) {
                    deferred.resolve(usr);
                    console.log(usr);
                } else {
                    console.log("in else of FindById")
                    deferred.reject(err);
                }

            });
        } catch (error) {
            console.log("error in user.model.js in FindById", error);
        }
        return deferred.promise;
    }

    function Update(objectId, changedUser) {
        var deferred = q.defer();
        try {
/*            var exist;
            var updatedUser;
/!*            console.log(id)
            console.log(changedUser)*!/
            users.forEach(function (user) {
                if (user.id == id) {
                    console.log("in if")
                    exist = true;
                    console.log("updated user coming in method from client");
                    console.log(changedUser);
                    for (var prop in changedUser) {
                        if (changedUser[prop]) {
                            user[prop] = changedUser[prop];
                        }
                    }
                    user.id = id;
                    console.log("user in list after changing");
                    console.log(user);
                    updatedUser = user;
                }
            });*/

            UserModel.findOne({id: objectId}, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for (var prop in user) {
                        if (!(typeof changedUser[prop] == 'undefined')) {
                            user[prop] = changedUser[prop];
                        }
                    }
                    user.save(function (err) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(user);
                        }
                    });
                }
            });

        }
        catch (error) {
            console.log("error on updateUser");
            deferred.reject(error);
        }
        return deferred.promise;
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
 /*           arrlength = users.length
            for (i = 0; i < arrlength; i++) {
                if (users[i].username == uname) {
                    usr = users[i];
                    console.log("user found")
                }
            }*/

            UserModel.findOne({username: uname}, function(err, user){
                if (err) {
                    deferred.reject(err);
                }else{
                    console.log(user);
                    deferred.resolve(user);
                }
            });


 /*           if (usr) {
                deferred.resolve(usr);
                //return usr;
            } else {
                deferred.resolve(null);
                //return null;
            }*/



        } catch (error) {
            console.log("error in user.model.js in FindById", error);
            deferred.reject(error);
        }

        return deferred.promise;
    }


    function findUserByCredentials(uname, pswd) {
        var deferred = q.defer();
        console.log("in findUserByCredentials");
        try {
            var usr, arrlength, i;
 /*           arrlength = users.length;
            for (i = 0; i < arrlength; i++) {
                if (users[i].username == uname && users[i].password == pswd) {
                    usr = users[i];
                    console.log("user found");
                }
            }*/


            UserModel.findOne({username:uname, password: pswd}, function(err, user){

                if (err) {
                    deferred.reject(err);
                }else{
                    console.log(user);
                    deferred.resolve(user);
                }

            });

        } catch (error) {
            console.log("error in user.model.js in FindById", error);
            deferred.reject(error);
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