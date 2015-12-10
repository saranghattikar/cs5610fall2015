/**
 * Created by SarangPC on 12/4/2015.
 */
(function () {
    angular
        .module("TakeAwayApp")
        .controller("followingController", function ($scope, $location, $rootScope,UserService) {
            $scope.$location = $location;
            $scope.visitprofile = visitprofile;
            $scope.deleteuser = deleteuser;

            function deleteuser(user) {
                UserService.deletefollower($rootScope.user.id,user.id)
                    .then(function (updateduser) {
                        getfollowing();
                    })
                    .catch(function (error) {
                        $scope.error = error;
                    });
            }
            function visitprofile(user) {
                $location.path("/showprofile/" + user.id);
            }
            function getfollowing() {
                UserService.getfollowings($rootScope.user.id)
                    .then(function (followings) {
                        $scope.followings = followings;
                    })
                    .catch(function (error) {
                        $scope.error = error;
                    });
            }
            getfollowing();
        })
})();
