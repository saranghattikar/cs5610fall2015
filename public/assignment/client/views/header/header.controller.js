(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);
            function HeaderController ($scope, $location, $rootScope) {
            $scope.$location = $location;
            $scope.user = $rootScope.user;
            console.log("in header Controller");

            $rootScope.$on("auth", function (event, user) {
                $scope.user = $rootScope.user = user;
            });

            $scope.logout = function () {
                console.log("in logout");
                $location.path("/home");
                console.log(location.path);
                $scope.user = $rootScope.user = null;
                //Navigate to home

            };
            $scope.hello = "Hello"
        };
})();