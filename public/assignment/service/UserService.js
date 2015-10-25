(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

    console.log("Hi UserService is here");
        var users = [
        {
        			id: "4543473b-d068-1048-e846-f68e04ea5c61",
        			username: "aa",
        			password: "aa",
        			fname: "aa",
        			lname: "aa",
        			email: "aa@aa.com"
        		},
        		{
        			id: "4543473b-d068-1048-e846-f68e04ea5c62",
        			username: "zz",
        			password: "zz",
        			fname: "zz",
        			lname: "zz",
        			email: "zz@zz.com"
        		}

        ];



        function findUserByUsernameAndPassword(username,password,callback) {
        var usr, pswd, arrlength,i;
        arrlength = users.length

        for (i = 0; i < arrlength ; i++) {
            if (users[i].username===username && users[i].password===password){
            usr = users[i].username;
            }

            if (usr){
            	return callback(null, usr);
            } else {
            	return callback("No User with (username,password) : ("+username+","+password+") Found", null);
            }
        }

        };
/*
        function findAllUsers(callback){
        try {
        	return callback(null, users);
            } catch(error){
        	console.log("error in find all users", error);
        	return callback(error);
            }

        }

        function createUser(user,callback){
        try{
        var guid1;
        *//*= Guid.create();*//*
        guid1 = guid();

        if (typeof user != 'object')
            return callback("Enter a valid user");

        }else {
        user.id = guid1;
        users.push(user);
        return callback(null, user);
        }
        catch(error){

        console.log("Error in creat user method", error);
        return callback(error);

        }

        }

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

        function guid() {
        		 	function s4() {
        		 		return Math.floor((1 + Math.random()) * 0x10000)
        		 		.toString(16)
        		 		.substring(1);
        		 	}
        		 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        		 	s4() + '-' + s4() + s4() + s4();
        		 }*/


/*        function updateUser(userid,callback){


        }*/
      var service = {
                findUserByUsernameAndPassword:findUserByUsernameAndPassword
               /* findAllUsers:findAllUsers,
                createUser:createUser,
                deleteUserById:deleteUserById,
                updateUser:updateUser*/
            };
            return service;


    }
})();