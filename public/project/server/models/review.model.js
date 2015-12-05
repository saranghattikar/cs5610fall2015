/**
 * Created by SarangPC on 12/2/2015.
 */

var q = require("q");

var ReviewSchema = require('./review.schema.js');

mongoose = require("mongoose");

module.exports = function (app,appdb) {

    var api = {
        Create: Create,
        /*        FindAll: FindAll,
        FindById: FindById,*/
        FindByResId:FindByResId
 /*       Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials*/

    };
    var ReviewModel = appdb.model('ReviewModel', ReviewSchema);




    function Create(review) {
        var deferred = q.defer();
        try {

            review.id = review._id = mongoose.Types.ObjectId();
            ReviewModel.create(review, function(err, newureview){
                if (err){
                    console.log("Error while createreview : ", err);
                    deferred.reject(err);
                } else {
                    console.log("in else");
                    console.log(newureview);
                    deferred.resolve(newureview);
                }
            });

        } catch (error) {
            console.log("error in review.model.js in create", error);
        }
        return deferred.promise;
    }

 /*   function FindAll() {
        var deferred = q.defer();
        try {
            deferred.resolve(users);
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
    }*/



 /*   function FindById() {
        var deferred = q.defer();
        try {
            var usr, pswd, arrlength, i;
            arrlength = users.length;
            /!*           for (i = 0; i < arrlength; i++) {
             if (users[i].id == id) {
             usr = users[i];
             console.log("user found")
             }
             }*!/


            ResviewModel.findOne({id: objectId}, function(err, usr){

                if (usr) {
                    deferred.resolve(usr);
                    console.log(usr);
                } else {
                    deferred.reject(err);
                }

            });*/





    function FindByResId(resId) {
        console.log("In review model");
        console.log(resId);
        var deferred = q.defer();
        try {

            var review=
            {
                "id": mongoose.Types.ObjectId(),
                "excerpt":"this is seconf attempt from mongoose",
                "userId":mongoose.Types.ObjectId(),
                "restaurantId":resId
            };

            //review.id = review._id = mongoose.Types.ObjectId();

 /*           ReviewModel.create(review, function(err, newureview){
                if (err){
                    console.log("Error while createUser : ", err);
                    deferred.reject(err);
                    return reject(err);
                } else {
                    console.log("in else");
                    console.log(newureview);
                    //deferred.resolve(newuser);
                }
            });*/

 /*           ReviewModel.find({},function(err, reviews){
                console.log(reviews);

            });*/
            ReviewModel.find({restaurantId: resId}, function(err, reviews){

                if (reviews) {
                    deferred.resolve(reviews);
                    //console.log(reviews);
                } else {
                    deferred.reject(err);
                }

            });
        } catch (error) {
            console.log("error in review model js in FindByResId", error);
        }
        return deferred.promise;
    }



 /*   function findUserByUsername(uname) {
        var deferred = q.defer();
        try {
            var usr, pswd, arrlength, i;
            /!*           arrlength = users.length
             for (i = 0; i < arrlength; i++) {
             if (users[i].username == uname) {
             usr = users[i];
             console.log("user found")
             }
             }*!/

            UserModel.findOne({username: uname}, function(err, user){
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
    }*/


 /*   function findUserByCredentials(uname, pswd) {
        var deferred = q.defer();
        console.log("in findUserByCredentials");
        try {
            var usr, arrlength, i;

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
    }*/


    return api;


};
