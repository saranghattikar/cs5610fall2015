(function () {
    angular
        .module("TakeAwayApp")
        .controller("showProfileController", showProfileController);
    function showProfileController($scope, $location, UserService,ReviewService, $rootScope,$routeParams) {
        console.log($routeParams.id);
        var loggedinUser = $rootScope.user;
        $scope.addtolist = addtolist;
        var following_list;
        $scope.show = true;

        $scope.$location = $location;
        $scope.get = get;


        function addtolist(){
            UserService.addfollowing(loggedinUser.id,$routeParams.id)
                .then(function (user) {
                    console.log(user);
                })
                .catch(function (error) {
                    $scope.error = error;
                });
        }

        function get() {

            if ($rootScope.user!=null){
            if (loggedinUser.id === $routeParams.id){
                $location.path("/profile");
            }
                UserService.getfollowings(loggedinUser.id)
                    .then(function (followings) {
                        following_list = followings;

                        var exist;
                        for (var i = 0; i < following_list.length; i++) {
                            if (following_list[i]===$routeParams.id) {
                                exist = true;
                                $scope.show = false;
                                console.log("loggedin user follow this user");
                                break;
                            }
                        }
                    })
                    .catch(function (error) {
                        $scope.error = error;
                    });

                //following_list = loggedinUser.following;
                console.log(following_list);
                console.log($routeParams.id);


            }



            UserService.getUserById($routeParams.id)
                .then(function (user) {
                    console.log(user);
                    //$scope.user = user;
                    $scope.displayUser = user;
                    $scope.favrestaurants = user.favorites;

                    $scope.success = "";
                })
                .catch(function (error) {
                    $scope.error = error;
                });

            ReviewService.getreviewsbyuserid($routeParams.id)
                .then(function (reviews) {
                    console.log(reviews);
                    //$scope.user = user;
                    $scope.reviews = reviews;
                })
                .catch(function (error) {
                    $scope.error = error;
                })
        }
        get();

}
})();