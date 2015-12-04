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
            var text='';
            var loc= [];
            var reviews=[];
 /*           var rev={rating: 5,
                excerpt: 'This place is great! It looks very old world; it\'s been around since 1932. The current owner has worked in the shop for nearly 30 years and when the owner...',
                time_created: 1447963988,
                rating_image_url: 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png',
                rating_image_small_url: 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/c7623205d5cd/ico/stars/v1/stars_small_5.png',
                user: [Object],
                rating_image_large_url: 'http://s3-media3.fl.yelpcdn.com/assets/2/www/img/22affc4e6c38/ico/stars/v1/stars_large_5.png',
                id: 'wBBfYmxxIejXV_JV1sdELQ'};*/
            loc = $rootScope.restaurant.location.display_address;
            reviews= $rootScope.restaurant.reviews;
            //reviews.push(rev);
            console.log(reviews);
            $scope.reviews = reviews;
            for (var i = 0; i < $rootScope.restaurant.location.display_address.length; i++) {
                text += $rootScope.restaurant.location.display_address[i]+" ";
            }
            $scope.text = text;
            //console.log(text);

            function postcomments(comments) {
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
                ReviewService.postreview(review).then(function (review) {
                    console.log("in restaurant controller");
                    console.log(review);
                    $scope.reviews.push(review);
                    })
                    .catch(function (error) {
                        $scope.error = error;
                    })

            }

        });
})();
