(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

    console.log("Hi UserService is here");
        var users = [
        {
        			id: "4543473b-d068-1048-e846-f68e04ea5c61",
        			username: "ee",
        			password: "ee",
        			fname: "ee",
        			lname: "ee",
        			email: "ee@ee.com"
        		},
        		{
        			id: "4543473b-d068-1048-e846-f68e04ea5c62",
        			username: "ff",
        			password: "ff",
        			fname: "ff",
        			lname: "ff",
        			email: "ff@ff.com"
        		}

        ];



/*        function findUserByUsernameAndPassword(username,password,callback) {
        var usr, pswd, arrlength,i;
        arrlength = users.length

        for (i = 0; i < arrlength ; i++) {
            if (users[i].username===username && users[i].password===password){
            usr = users[i];
            console.log("user found")
            }

            if (usr){
            	return callback(null, usr);
            } else {
            	return callback("No User with (username,password) : ("+username+","+password+") Found", null);
            }
        }

        };*/

        function findUserByUsernameAndPassword(username,password){
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username="+username+"&password="+password)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
        };




        function findAllUsers(callback){
        try {
        	return callback(null, users);
            } catch(error){
        	console.log("error in find all users", error);
        	return callback(error);
            }

        };

        function createUser(user,callback){
        try{
        var guid1;
        /*Guid.create();*/
        guid1 = guid();

        if (typeof user != 'object')
            return callback("Enter a valid user");
        else {
                user.id = guid1;
                users.push(user);
                /*console.log(users)*/;
                return callback(null, user);
                }

        }
        catch(error){

        console.log("Error in create user method", error);
        return callback(error);

        }

        };

/*
        function deleteUserById(userid,callback){

        try{
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

        }

     */


        function updateUser(userId,changedUser,callback){

        try{
        var exist;
        /*var changedUser;*/
        /*var userId = changedUser.id;*/
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
        }
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
                findUserByUsernameAndPassword:findUserByUsernameAndPassword,
                findAllUsers:findAllUsers,
                createUser:createUser,
                updateUser:updateUser
                /*deleteUserById:deleteUserById*/

            };
            return service;


    }
})();