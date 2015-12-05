(function () {
    angular
        .module("TakeAwayApp")
        .controller("showProfileController", showProfileController);
    function showProfileController($scope, $location, UserService, $rootScope,$routeParams) {
        console.log($routeParams.id);
        var loggedinUser = $rootScope.user;

        $scope.$location = $location;
        $scope.get = get;
        function get() {
            if (loggedinUser.id === $routeParams.id){
                $location.path("/profile");
            }
            UserService.getUserById($routeParams.id)
                .then(function (user) {
                    console.log(user);
                    //$scope.user = user;
                    $scope.displayUser = user;
                    $scope.favrestaurants = user.favorites;
                    $scope.success = "Succesfully retrieved user profile";
                })
                .catch(function (error) {
                    $scope.error = error;
                })
        }
        get();

    }
})();