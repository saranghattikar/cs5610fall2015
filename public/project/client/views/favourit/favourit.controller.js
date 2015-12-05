/**
 * Created by SarangPC on 12/4/2015.
 */
(function () {
    angular
        .module("TakeAwayApp")
        .controller("favouritController", favouritController);
    function favouritController($scope, $location, $rootScope,$q,$http) {
        //console.log($rootParams.id);
        $scope.gotorestaurant=gotorestaurant;
        $scope.deleterestaurant=deleterestaurant;
        $scope.getfavourites=getfavourites;

        function getfavourites() {
            var deferred = $q.defer();
            //console.log(rest);
            $http.get("/api/project/user/" + $rootScope.user.id)
                .success(function (user) {
                    $scope.favrestaurants = user.favorites;
                    console.log($rootScope.favrestaurants);
                    //console.log("received restaurants");
                });
        }


        getfavourites();
        var loggedinUser = $rootScope.user;
        var resturants = $rootScope.user.favorites;
        //$scope.favrestaurants = resturants;

        //console.log($scope.favrestaurants);


        function gotorestaurant(rest) {
            var deferred = $q.defer();
            console.log(rest);
            $http.get("/api/project/res/" + rest.yelpId)
                .success(function (restaurant) {
                    $rootScope.restaurant = restaurant;
                    $rootScope.categories = rest.categories;
                    console.log("received restaurant");
                    //console.log(restaurant);
                    $location.path("/restaurant");
                });
        }

        function deleterestaurant(rest) {
            //var deferred = $q.defer();
            console.log(rest);
            $http.delete("/api/project/user/"+$rootScope.user.id+"/res/"+ rest.id)
                .success(function (restaurants) {
                    console.log(restaurants);
                    $scope.favrestaurants = resturants;
                });
            //return deferred.promise;
        }
    }
})();