
(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .controller("HeaderController", function ($scope, $location, $rootScope,$q,$http) {
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
                console.log("in search location");
                console.log(terms);
                console.log(location);

                var deferred = $q.defer();
                var key = "5cb2786f4c597bc02592837edb2664f4425c9520";
//                console.log($http);

/*                $http.get("/api.locu.com/v1_0/venue/search/? api_key=" + key + "&locality=" + location)
                    .success(function (results) {
                        console.log(results.objects)
                        $rootScope.restaunrts = results.objects;
                        $location.path("/searchresults");
                        //deferred.resolve(results);
                    });*/


                $http.get("/api/project/search?terms=" + terms + "&location=" + location)
                    .success(function (restaurants) {
                        //console.log(restaurants);
                        $rootScope.restaurants = restaurants;
                        //console.log($scope.restaurants);
                        $location.path("/searchresults");

                        //deferred.resolve(user);
                    });
                return deferred.promise;

};


            $scope.hello = "Hello"
        });
})();