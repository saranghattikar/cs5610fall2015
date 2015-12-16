(function () {
    angular
        .module("TakeAwayApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $location, UserService, $rootScope) {

        $scope.$location = $location;
        $scope.login = login;
        $scope.error = null;
        function login(user) {

            if (user.username != null && user.password != null) {
                UserService.findUserByUsernameAndPassword(user.username, user.password)
                    .then(function (user) {
                        if (user!= null && typeof (user)!= "undefined") {
                            $scope.user = $rootScope.user = user;
                            $rootScope.$broadcast('auth', user);
                            console.log($location);
                            $location.path("/profile");
                        }else{
                        $scope.error = "credentials not correct";
                        }

                    })
                    .catch(function (error) {
                        $scope.error = error;
                    })

            }
        }
    }
})();