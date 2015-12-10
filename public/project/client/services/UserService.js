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
        }



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



        }


        function deletefollower(userid,followerid){
            var deferred = $q.defer();
            $http.delete("/api/project/user/"+userid+"/follow/"+ followerid)
                .success(function (updatedUser) {
                    console.log(updatedUser);
                    deferred.resolve(updatedUser);
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


        function getfollowings(userid){
            var deferred = $q.defer();
            $http.get("/api/project/user/followings/" + userid)
                .success(function (followings) {
                    deferred.resolve(followings)
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

        function addfollowing(loggedInId,followingId){
            var deferred = $q.defer();

            $http.get("/api/project/user/"+loggedInId+"/follow/"+followingId)
                .success(function (user) {
                    deferred.resolve(user)
                });

            return deferred.promise;

        }

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser,
            getUserById:getUserById,
            deletefollower:deletefollower,
            getfollowings:getfollowings,
            addfollowing:addfollowing
            /*deleteUserById:deleteUserById*/

        };
        return service;


    }
})();