/**
 * Created by SarangPC on 12/4/2015.
 */
(function () {
    angular
        .module("TakeAwayApp")
        .controller("followingController", function ($scope, $location, $rootScope,UserService, $q, $http) {
            //$scope.gotoprofile = gotoprofile;
            //function followingController($scope,$location, $rootScope,$q,$http) {

            $scope.$location = $location;
            //$scope.gotoprofile = gotoprofile;
            $scope.visitprofile = visitprofile;
            $scope.deleteuser = deleteuser;

            function deleteuser(user) {
                UserService.deletefollower($rootScope.user.id,user.id)
                    .then(function (updateduser) {
                        $scope.followings = updateduser.following;
                    })
                    .catch(function (error) {
                        $scope.error = error;
                    });
            }

            function visitprofile(user) {
                $location.path("/showprofile/" + user.id);
            }




            function getfollowing() {
                var deferred = $q.defer();
                $http.get("/api/project/user/followings/" + $rootScope.user.id)
                    .success(function (followings) {
                        $scope.followings = followings;
                    });
            }

            getfollowing();

        })
})();
