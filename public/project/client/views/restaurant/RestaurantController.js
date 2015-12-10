/**
 * Created by SarangPC on 12/2/2015.
 */

(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .controller("RestaurantController", function ($scope, GoogleMapsService,$location, $rootScope,ReviewService) {
            $scope.$location = $location;
            $scope.user = $rootScope.user;
            $scope.postcomments = postcomments;
            $scope.showprofile = showprofile;
            var text='';
            var loc= [];
            var reviews=[];
            loc = $rootScope.restaurant.location.display_address;
            reviews= $rootScope.restaurant.reviews;

            var autocomplete;

            var infowindow;

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

            $scope.setFormScope= function(scope){
                this.formScope = scope;
            };

            function postcomments(comments) {
                //console.log(this.formScope.commentform);
                //$scope.comments = null;
                //this.commentform.$setPristine();
                this.formScope.commentform.$setPristine();
                $scope.comments={};
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
                review.restaurant_image_url = $rootScope.restaurant.image_url;
                review.restaurant_rating_img_url_large = $rootScope.restaurant.rating_img_url_large;
                review.restaurant_name = $rootScope.restaurant.name;
                review.restaurant_address = $rootScope.restaurant.location.display_address;
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

            $scope.showPosition = function () {
                console.log("Inside show position");
    /*            $scope.lat = position.coords.latitude;
                 $scope.lng = position.coords.longitude;*/

                var latlng = new google.maps.LatLng($rootScope.restaurant.location.coordinate.latitude,
                    $rootScope.restaurant.location.coordinate.longitude);
                $scope.myMap.setCenter(latlng);

                //create a marker for my location
                var iconBase = 'images/';

                var marker = new google.maps.Marker({
                    map: $scope.myMap,
                    position: latlng,
                    title:$rootScope.restaurant.name
                    //icon: iconBase + 'blue-icon.png'
                });

                infowindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker, 'click', function() {
                    console.log("inside infowindow");
                    infowindow.setContent('<p>' + marker.title + '</p>');
                    infowindow.open($scope.myMap, marker);
                });

                // $scope.getevents();
            };

 /*           $scope.getLocation = function () {
                console.log(">> Inside get location");
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
                }
                else {
                    $scope.error = "Geolocation is not supported by this browser.";
                }
            };*/



            var map;
            GoogleMapsService.mapsInitialized.
            then(function(){

                $scope.myMap = new google.maps.Map(document.getElementById('map'), { zoom: 12 });
                $scope.showPosition();

            });







        })
        .factory('GoogleMapsService',function($window,$q){

            //maps loader deferred object

            var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCiNpxTsuoDpGJS1aQOlLZ7038Lvkv05T8&signed_in=true&libraries=places&callback=';
            var mapsDefer = $q.defer();



            var asyncLoad = function(asyncUrl,callbackName){
                var script = document.createElement('script');

                script.src = asyncUrl + callbackName;
                document.body.appendChild(script);

            };

            $window.googleMapsInitialized = function(){
                mapsDefer.resolve();

            };

            asyncLoad(asyncUrl, 'googleMapsInitialized');

            return {
                // usage: Initializer.mapsInitialized.then(callback)
                mapsInitialized : mapsDefer.promise
            };
        });
})();



