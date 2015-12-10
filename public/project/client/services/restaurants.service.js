/**
 * Created by SarangPC on 12/1/2015.
 */
//require('body-parser');
(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http, $q) {

        console.log("Hi RestaurantService is here");

        function findRestaurantsBytermslocation(terms,location) {
            console.log("in findRestaurantsBytermslocation");
            console.log(terms);
            console.log(location);
            var deferred = $q.defer();
            $http.get("/api/project/search?terms=" + terms + "&location=" + location)
                .success(function (restaurants) {
                    deferred.resolve(restaurants);
                });
            return deferred.promise;
        }

        function deletefromfavourit(rest,userId){

            var deferred = $q.defer();
            console.log(rest);
            $http.delete("/api/project/user/"+userId+"/res/"+ rest.id)
                .success(function (restaurants) {
                    console.log(restaurants);
                    deferred.resolve(restaurants);
                });
            return deferred.promise;


        }

        function getrestaurantbyyelpId(restId){
            var deferred = $q.defer();
            $http.get("/api/project/res/" + restId)
                .success(function (restaurant) {
                    deferred.resolve(restaurant);
                });
            return deferred.promise;
        }

        function getfavourits(userId){
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userId)
                .success(function (user) {
                    deferred.resolve(user.favorites);
                });
            return deferred.promise;

        }

        function addtofavourite(userId,resId,favres){
            var deferred = $q.defer();
            $http.post("/api/project/user/"+userId+"/res/"+resId,favres)
                .success(function (user) {
                    deferred.resolve(user)
                });
            return deferred.promise;
        }


        var service = {
            findRestaurantsBytermslocation:findRestaurantsBytermslocation,
            deletefromfavourit:deletefromfavourit,
            getrestaurantbyyelpId:getrestaurantbyyelpId,
            getfavourits:getfavourits,
            addtofavourite:addtofavourite
        };
        return service;
    }
})();