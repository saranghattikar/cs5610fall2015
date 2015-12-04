(function () {
    angular
        .module("TakeAwayApp")
        .controller("Searchresultcontroller", Searchresultcontroller);
    function Searchresultcontroller($scope, $location, $rootScope,$http,$q) {

       $scope.$location = $location;
        $scope.gotorestaurant = gotorestaurant;
        $scope.addtofav= addtofav;


        function gotorestaurant(rest) {

            var deferred = $q.defer();
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
            return deferred.promise;




        }

        function addtofav(res) {
            var deferred = $q.defer();
            console.log("in addtofav");
            console.log(res);
            var user = $rootScope.user;
            var userid = $rootScope.user.id;
            var favres = {};
            favres.yelpId = res.id;
            console.log(res.location.display_address);
            favres.address = res.location.display_address;
            favres.state = res.state_code;
            favres.phonenumber = res.display_phone;
            favres.name = res.name;
            console.log("Logging favres");
            console.log(favres);

            //user.favorites.push(favres);
            //console.log(favres);
            $http.post("/api/project/user/"+userid+"/res/"+res.id,favres)
                .success(function (user) {
                    //var cat=[];

                    console.log("In addtofav");
                    console.log(user);
                    //$location.path("/restaurant");
                });
            return deferred.promise;
        }

  /*      $http.get("/api.locu.com/v1_0/venue/search/? api_key=" + key + "&locality=" + location)
            .success(function (results) {
                console.log(results)
                $scope.restaunrts = results.objects;
                //deferred.resolve(results);
            });*/



        /*        function login(user) {

            if (user.username != null && user.password != null) {
                /!*          UserService.findUserByUsernameAndPassword(user.username,user.password,function(error, user){
                 if (error){
                 $scope.error = error;
                 console.log("Error in login controler");
                 }
                 else{
                 $rootScope.user = user
                 $location.path( "/profile" );

                 }
                 });*!/
                UserService.findUserByUsernameAndPassword(user.username, user.password)
                    .then(function (user) {
                        $scope.user = $rootScope.user = user;
                        $rootScope.$broadcast('auth', user);
                        $location.path("/profile");

                    })
                    .catch(function (error) {
                        $scope.error = error;
                    })

            }
        }*/
    }
})();