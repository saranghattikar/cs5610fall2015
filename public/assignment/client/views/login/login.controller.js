(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $location, UserService, $rootScope) {

        $scope.$location = $location;
        $scope.login = login;
        function login(user) {

            if (user.username != null && user.password != null) {
                /*          UserService.findUserByUsernameAndPassword(user.username,user.password,function(error, user){
                 if (error){
                 $scope.error = error;
                 console.log("Error in login controler");
                 }
                 else{
                 $rootScope.user = user
                 $location.path( "/profile" );

                 }
                 });*/
                UserService.findUserByUsernameAndPassword(user.username, user.password)
                    .then(function (user) {
                        $scope.user = $rootScope.user = user;
                        $rootScope.$broadcast('auth', user);
                        $location.path("/profile");

                    })
                    .catch(function (error) {
                        $scope.error = error;
                    })

            }
        }
    }
})();