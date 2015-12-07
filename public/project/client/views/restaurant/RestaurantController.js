/**
 * Created by SarangPC on 12/2/2015.
 */

(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .controller("RestaurantController", function ($scope, $location, $rootScope,ReviewService) {
            $scope.$location = $location;
            $scope.user = $rootScope.user;
            $scope.postcomments = postcomments;
            $scope.showprofile = showprofile;
            var text='';
            var loc= [];
            var reviews=[];
            loc = $rootScope.restaurant.location.display_address;
            reviews= $rootScope.restaurant.reviews;

            $scope.reviews = reviews;
            for (var i = 0; i < $rootScope.restaurant.location.display_address.length; i++) {
                text += $rootScope.restaurant.location.display_address[i]+" ";
            }
            $scope.text = text;
            //console.log(text);
            function showprofile(uid) {
                console.log(uid);
                $location.path("/showprofile/"+uid);
                console.log($location);

            }

            function postcomments(comments) {
                $scope.comments = null;
                var review ={};
                var user ={};
                var rest_id= $rootScope.restaurant.id;
                var u_id= $scope.user.id;
                var ufname=$scope.user.firstName;
                var lname = $scope.user.lastName;
                //var review;
                user.id = u_id;
                user.firstname = ufname;
                user.lastname = lname;
                review.excerpt = comments;
                review.restaurantId= rest_id;
                review.user= user;
                console.log(review);
                var reviews = [];
                reviews = $scope.reviews;
                ReviewService.postreview(review).then(function (review) {
                    console.log("in restaurant controller");
                    console.log(review);
                    reviews.push(review);
                    $scope.reviews=reviews;

                    })
                    .catch(function (error) {
                        $scope.error = error;
                    })

            }

        });
})();
