(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        console.log("Hi UserService is here");


        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username + "&password=" + password)
                .success(function (user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        };



        function findAllUsers() {
           console.log("In find all users");
            var deferred = $q.defer();
            try {
                $http.get("/api/project/user")
                    .success(function (user) {
                        deferred.resolve(user);
                    });
                return deferred.promise;
            } catch (error) {
                console.log("error in find all users", error);
                //return callback(error);
            }

        };


        function createUser(user) {
            var deferred = $q.defer();
/*            console.log("In createUser");
            console.log(user);*/

            $http.post("/api/project/user", user)
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

        };


        function getUserById(userid) {
            console.log(userid);
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userid)
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

        }





        function deleteUserById(userid) {
            console.log(userid);
            var deferred = $q.defer();
            $http.delete("/api/project/user/" + userid)
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

        }


        function updateUser(userid, changedUser) {

            var deferred = $q.defer();
            $http.put("/api/project/user/" + userid, changedUser)
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


            /*        try{
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
             }*/
        };

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
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser
            /*deleteUserById:deleteUserById*/

        };
        return service;


    }
})();