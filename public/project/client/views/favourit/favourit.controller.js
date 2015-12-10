/**
 * Created by SarangPC on 12/4/2015.
 */
(function () {
    angular
        .module("TakeAwayApp")
        .controller("favouritController", favouritController);
    function favouritController($scope, $location,RestaurantService,$rootScope) {
        //console.log($rootParams.id);
        $scope.gotorestaurant=gotorestaurant;
        $scope.deleterestaurant=deleterestaurant;
        $scope.getfavourites=getfavourites;

        function getfavourites() {

            RestaurantService.getfavourits($rootScope.user.id)
                .then(function (restaurants) {
                    $scope.favrestaurants = restaurants;

                })
                .catch(function (error) {
                    $scope.error = error;
                });


/*            var deferred = $q.defer();
            //console.log(rest);
            $http.get("/api/project/user/" + $rootScope.user.id)
                .success(function (user) {
                    $scope.favrestaurants = user.favorites;
                    console.log($rootScope.favrestaurants);
                    //console.log("received restaurants");
                });*/
        }


        getfavourites();
        var loggedinUser = $rootScope.user;
        var resturants = $rootScope.user.favorites;
        //$scope.favrestaurants = resturants;

        //console.log($scope.favrestaurants);


        function gotorestaurant(rest) {
            RestaurantService.getrestaurantbyyelpId(rest.yelpId)
                .then(function (restaurant) {
                    $rootScope.restaurant = restaurant;
                    $location.path("/restaurant");
                })
                .catch(function (error) {
                    $scope.error = error;
                });






 /*           console.log(rest);
            $http.get("/api/project/res/" + rest.yelpId)
                .success(function (restaurant) {
                    $rootScope.restaurant = restaurant;
                    $rootScope.categories = rest.categories;
                    console.log("received restaurant");
                    //console.log(restaurant);

                });*/
        }


        function deleterestaurant(rest) {
            RestaurantService.deletefromfavourit(rest,$rootScope.user.id)
                .then(function (restaurants) {
                    $scope.favrestaurants = restaurants;
                    getfavourites();
                })
                .catch(function (error) {
                    $scope.error = error;
                });
        }
    }
})();


