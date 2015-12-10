/**
 * Created by SarangPC on 11/27/2015.
 */
(function () {
    angular
        .module("TakeAwayApp")
        .controller("Homecontroller", Homecontroller);
    function Homecontroller($scope, $location,RestaurantService,$rootScope) {

        $scope.$location = $location;
        $scope.gotorestaurant = gotorestaurant;
        //$scope.addtofav= addtofav;

        function gotorestaurant(rest) {
            RestaurantService.getrestaurantbyyelpId(rest.id)
                .then(function (restaurant) {
                    $rootScope.restaurant = restaurant;
                    $location.path("/restaurant");
                })
                .catch(function (error) {
                    $scope.error = error;
                });
        }


        function search (terms,location) {
            RestaurantService.findRestaurantsBytermslocation(terms,location)
                .then(function (restaurants) {
                    $scope.restaurants = restaurants;
                })
                .catch(function (error) {
                    $scope.error = error;
                });
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
        function showPosition(position) {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);

        }
        search("lunch","boston");
        getLocation();
    }
})();
