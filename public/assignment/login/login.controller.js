(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $location, UserService, $rootScope) {

                $scope.$location = $location;
                $scope.login = login;
                function login(user){

                if (user.username != null && user.password!=null){


                UserService.findUserByUsernameAndPassword(user.username,user.password,function(error, user){
                    if (error){
                            $scope.error = error;
                		        }
                    else{
                    $rootScope.user = user
                    $location.path( "/profile" );

                    }
                });
                }
                }
    }
})();