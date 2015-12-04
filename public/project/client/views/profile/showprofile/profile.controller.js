(function () {
    angular
        .module("TakeAwayApp")
        .controller("showProfileController", showProfileController);
    function showProfileController($scope, $location, UserService, $rootScope,$rootParams) {



        console.log($rootParams.id);


        var loggedinUser = $rootScope.user;
        var changeduser;
        $scope.$location = $location;
        $scope.update = update;
        var username = $scope.username;
        var password = $scope.password;
        var fname = $scope.fname;
        var lname = $scope.lname;
        var email = $scope.email;

        function get() {
            UserService.getUserById(loggedinUser.id)
                .then(function (user) {
                    console.log("in controller after receiving user");
                    console.log(user)
                    $scope.user = user;
                    $scope.success = "Succesfully retrieved user profile";
                })
                .catch(function (error) {
                    $scope.error = error;
                })


        };
        get();

    };
})();