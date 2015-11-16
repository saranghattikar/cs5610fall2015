(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", function ($scope, $location, $rootScope) {
            $scope.$location = $location;
            $scope.user = $rootScope.user;
            $rootScope.$on("auth", function (event, user) {
                $scope.user = $rootScope.user = user;
            });

            $scope.logout = function () {
                console.log("in logout");
                $scope.user = $rootScope.user = null;
                //Navigate to home
                $location.path("/home");
            };
            $scope.hello = "Hello"
        });
})();