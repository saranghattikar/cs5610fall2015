(function () {
    angular
        .module("TakeAwayApp")
        .controller("showProfileController", showProfileController);
    function showProfileController($scope, $location, UserService, $rootScope,$routeParams,$q,$http) {
        console.log($routeParams.id);
        var loggedinUser = $rootScope.user;
        $scope.addtolist = addtolist;
        var following_list;
        $scope.show = true;

        $scope.$location = $location;
        $scope.get = get;


        function addtolist(){
            var deferred = $q.defer();
            console.log("in addtolist");
            $http.get("/api/project/user/"+loggedinUser.id+"/follow/"+$routeParams.id)
                .success(function (user) {
                    console.log(user);
                });
            return deferred.promise;
        };

        function get() {

            if ($rootScope.user!=null){
            if (loggedinUser.id === $routeParams.id){
                $location.path("/profile");
            }
                following_list = loggedinUser.following;
                console.log(following_list);
                console.log($routeParams.id);
                var exist;
                for (var i = 0; i < following_list.length; i++) {
                    if (following_list[i]===$routeParams.id) {
                        exist = true;
                        $scope.show = false;
                        console.log("loggedin user follow this user");
                        break;
                    }
                }

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
                })
        }
        get();




    }
})();