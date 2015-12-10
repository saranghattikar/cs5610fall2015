
(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .controller("HeaderController", function ($scope,RestaurantService, $location, $rootScope) {
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

            $scope.search = function (terms,location) {
                RestaurantService.findRestaurantsBytermslocation(terms,location)
                    .then(function (restaurants) {
                    $rootScope.restaurants = restaurants;
                    $location.path("/searchresults");
                })
                .catch(function (error) {
                    $scope.error = error;
                });

};

            $scope.hello = "Hello"
        });
})();