(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

        function RegisterController($scope, $location, UserService, $rootScope,$q) {

                $scope.$location = $location;
                $scope.error = null;
                $scope.register = register;
                function register(current_user){

/*                if (user.username != null && user.password != null && user.cnfpassword!=null){
                    if(user.password===user.cnfpassword){
                        UserService.findAllUsers(function(error, users){
                        if (error){
                        			$scope.error = error;
                        			}
                        else {
                        var existflag;
                        var emailexist;
                        var uname= user.username;
                        var pswd= user.password;
                        var email = user.email;
                        users.forEach(function(user, index){
                        if (user.username===uname && user.password===pswd){
                        	existflag = true;
                        	}
                        if (user.email=== email){
                        emailexist= true;
                        }
                        })
                        if (emailexist&&existflag){
                        	$scope.error = "this user already exist";
                        	} else if (existflag){
                        	$scope.error = "this user usename and password is already present";
                        	} else if (emailexist){
                        	$scope.error = "thhis email already present";
                        	}

                        else{

                        var newUser = {
                        		username: user.username,
                                password: user.password,
                        		email: user.password
                        			}

                        UserService.createUser(newUser, function(error, newAddedUser){
                        	console.log("newly created user is ", newAddedUser);
                        	$rootScope.user = newAddedUser;
                        	$location.path( "/profile" );
                        });
                        }
                        }
                        })
                        }else{
                    $scope.error = "password and confirm password should match"
                    }

                    }*/

                    if (current_user.username != null && current_user.password != null && current_user.cnfpassword!=null){
                        console.log("In register controller");
                        if(current_user.password===current_user.cnfpassword){
                            UserService.findAllUsers()
                                .then(function(users){
                                    if (current_user.password !== current_user.cnfpassword){
                                        $scope.error = "both the password fields should match";
                                    } else {
                                        var exists = false;
                                        var emailExists = false;
                                        users.forEach(function(user, index){
                                            if (user && user.username===current_user.username && user.password===current_user.password){
                                                exists = true;
                                            }
                                            if (user && user.email === current_user.email){
                                                emailExists = true;
                                            }
                                        });
                                        if (emailExists&&exists){
                                            $scope.error = "User already exists with that email + username";
                                        } else if (exists){
                                            $scope.error = "User already exists with that username";
                                        } else if (emailExists){
                                            $scope.error = "User already exists with that email";
                                        } else {
                                            var newUserObject = {
                                                username: current_user.username,
                                                password: current_user.password,
                                                email: current_user.email
                                            };
                                            UserService.createUser(newUserObject)
                                                .then(function(newlyCreatedUser){
                                                    console.log("Newly created user in register controller");
                                                    console.log("newlyCreatedUser");
                                                    //update rootscope user
                                                    $rootScope.user = newlyCreatedUser;
                                                    console.log(newlyCreatedUser)
                                                    //broadcast login auth event for listeners to update loggedin user
                                                    $rootScope.$broadcast('auth', newlyCreatedUser);
                                                    //Navigate to profile
                                                    $location.path( "/profile" );
                                                })
                                                .catch(function(error){
                                                    $scope.error = error;
                                                });
                                        }
                                    }
                                })





                        }




                    }







                    }





                };




})();