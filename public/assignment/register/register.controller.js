(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

        function RegisterController($scope, $location, UserService, $rootScope) {

                $scope.$location = $location;
                $scope.error = null;
                $scope.register = register;
                function register(user){

                if (user.username != null && user.password != null && user.cnfpassword!=null){
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

                    }

                    }





                };




})();