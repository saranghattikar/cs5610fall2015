(function () {
    angular
        .module("TakeAwayApp")
        .controller("Searchresultcontroller", Searchresultcontroller);
    function Searchresultcontroller($scope, $location,RestaurantService, $rootScope) {

       $scope.$location = $location;
        $scope.gotorestaurant = gotorestaurant;
        $scope.addtofav= addtofav;


        function gotorestaurant(rest) {


            RestaurantService.getrestaurantbyyelpId(rest.id)
                .then(function (restaurant) {
                    $rootScope.restaurant = restaurant;
                    $location.path("/restaurant");
                })
                .catch(function (error) {
                    $scope.error = error;
                });




/*            var deferred = $q.defer();
            console.log("in gotorestaurant");
            console.log(rest);

            $http.get("/api/project/res/" + rest.id)
                .success(function (restaurant) {
                    //var cat=[];
                    $rootScope.restaurant = restaurant;
                    $rootScope.categories = rest.categories;
                    console.log("In gotorestaurant");
                    console.log(restaurant);
                    $location.path("/restaurant");
                });
            return deferred.promise;*/
        }

        function addtofav(res) {

            console.log("in addtofav");
            console.log(res);
            var user = $rootScope.user;
            var userid = $rootScope.user.id;
            var favres = {};
            favres.yelpId = res.id;
            console.log(res.location.display_address);
            favres.address = res.location.display_address;
            favres.state = res.location.state_code;
            favres.phonenumber = res.display_phone;
            favres.name = res.name;
            console.log("Logging favres");
            console.log(favres);


            RestaurantService.addtofavourite(userid,res.id,favres)
                .then(function (user) {
                    console.log("Added to favourits successfully")
                })
                .catch(function (error) {
                    $scope.error = error;
                });

            //user.favorites.push(favres);
            //console.log(favres);
 /*           $http.post("/api/project/user/"+userid+"/res/"+res.id,favres)
                .success(function (user) {
                    //var cat=[];

                    console.log("In addtofav");
                    console.log(user);
                    //$location.path("/restaurant");
                });
            return deferred.promise;*/
        }
    }
})();