(function () {
    angular
        .module("TakeAwayApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $location, UserService, $rootScope) {

        $scope.$location = $location;
        $scope.login = login;
        function login(user) {

            if (user.username != null && user.password != null) {
                UserService.findUserByUsernameAndPassword(user.username, user.password)
                    .then(function (user) {
                        $scope.user = $rootScope.user = user;
                        $rootScope.$broadcast('auth', user);
                        console.log($location);
                        $location.path("/profile");

                    })
                    .catch(function (error) {
                        $scope.error = error;
                    })

            }
        }
    }
})();