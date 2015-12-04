/**
 * Created by SarangPC on 12/1/2015.
 */
//require('body-parser');
(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http, $q) {

        console.log("Hi RestaurantService is here");

        var key = "5cb2786f4c597bc02592837edb2664f4425c9520";
        console.log($http);
        function findRestaurantsBylocation(location) {
            var deferred = $q.defer();
            $http.get("/api.locu.com/v1_0/venue/search/? api_key=" + key + "&locality=" + location)
                .success(function (results) {
                    console.log(results.objects)
                    deferred.resolve(results.objects);
                });
            return deferred.promise;
        };




   /*     function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .success(function (user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        };




        function findAllUsers() {
            console.log("In find all users");
            var deferred = $q.defer();
            try {
                $http.get("/api/assignment/user")
                    .success(function (user) {
                        deferred.resolve(user);
                    });
                return deferred.promise;
            } catch (error) {
                console.log("error in find all users", error);
                //return callback(error);
            }

        };


        /!*        function createUser(user,callback){
         try{
         var guid1;
         /!*Guid.create();*!/
         guid1 = guid();

         if (typeof user != 'object')
         return callback("Enter a valid user");
         else {
         user.id = guid1;
         users.push(user);
         /!*console.log(users)*!/;
         return callback(null, user);
         }

         }
         catch(error){

         console.log("Error in create user method", error);
         return callback(error);

         }

         };*!/

        function createUser(user) {
            var deferred = $q.defer();
            console.log("In createUser");
            console.log(user);

            /!*            $http({
             method: 'POST',
             url: 'request-url',
             data: "message=" + message,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             });*!/



            $http.post("/api/assignment/user", user)
                .success(function (nuser) {
                    console.log("New user created sucessfully");
                    console.log(nuser);
                    deferred.resolve(nuser);
                })

                .error(function (error) {
                    if (error && error.message) {
                        deferred.reject(error.message);
                    } else {
                        deferred.reject(error);
                    }
                });

            return deferred.promise;


            /!*try{
             var guid1;
             /!*Guid.create();*!/
             guid1 = guid();

             if (typeof user != 'object')
             return callback("Enter a valid user");
             else {
             user.id = guid1;
             users.push(user);
             /!*console.log(users)*!/;
             return callback(null, user);
             }

             }
             catch(error){

             console.log("Error in create user method", error);
             return callback(error);

             }*!/

        };


        function deleteUserById(userid) {
            console.log(userid);
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + userid)
                .success(function (user) {
                    deferred.resolve(user);
                })
                .error(function (error) {
                    if (error && error.message) {
                        deferred.reject(error.message);
                    } else {
                        deferred.reject(error);
                    }
                });

            return deferred.promise;

            /!*        try{
             if (typeof userid != 'string'){
             return callback("Enter valid userId");
             }else{
             users.forEach(function(user, index){
             if (user.id === userId){
             console.log("User deleted");
             users.splice(index, 1);
             }

             }
             }

             }catch(error){
             console.log("exception in delete userByID method", error);
             return callback(error);
             }
             *!/
        }


        function updateUser(userid, changedUser) {

            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + userid, changedUser)
                .success(function (user) {
                    console.log("in update User after user has been updated successfully");
                    console.log(user);
                    deferred.resolve(user);
                })
                .error(function (error) {
                    if (error && error.message) {
                        deferred.reject(error.message);
                    } else {
                        deferred.reject(error);
                    }
                });

            return deferred.promise;


            /!*        try{
             var exist;
             /!*var changedUser;*!/
             /!*var userId = changedUser.id;*!/
             var updatedUser;
             console.log(userId)
             console.log(changedUser)
             users.forEach(function(user){
             if (user.id===userId){
             exist = true;
             for(var prop in user){
             if (changedUser[prop]){
             user[prop] = changedUser[prop];
             }
             }
             user.id = userId;
             updatedUser = user;
             }
             });

             if (exist){
             return callback(null, updatedUser);
             }else{
             return callback("user with this id does not exist "+userId, null);
             }

             }
             catch(error){
             console.log("error on updateUser");
             return callback(error);
             }*!/
        };

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }*/

        var service = {
            findRestaurantsBylocation: findRestaurantsBylocation,
            /*deleteUserById:deleteUserById*/
        };
        return service;
    }
})();