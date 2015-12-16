/**
 * Created by SarangPC on 12/3/2015.
 */

/**
 * Created by SarangPC on 12/1/2015.
 */
//require('body-parser');
(function () {
    'use strict';
    angular
        .module("TakeAwayApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {


        function postreview(review){
                var deferred = $q.defer();
                $http.post("/api/project/rev", review)
                    .success(function (newlycreatedreview) {
                        console.log("New review created sucessfully");
                        console.log(newlycreatedreview);
                        deferred.resolve(newlycreatedreview);
                    })

                    .error(function (error) {
                        if (error && error.message) {
                            deferred.reject(error.message);
                        } else {
                            deferred.reject(error);
                        }
                    });

                return deferred.promise;

        }

        function getreviewsbyuserid(id){
            var deferred = $q.defer();
            $http.get("/api/project/reviews/"+ id)
                .success(function (userReviews) {
/*
                    console.log("Reviews Retrived for user");
                    console.log(userReviews);
*/
                    deferred.resolve(userReviews);
                })

                .error(function (error) {
                    if (error && error.message) {
                        deferred.reject(error.message);
                    } else {
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        }




        var service = {
            postreview: postreview,
            getreviewsbyuserid:getreviewsbyuserid
        };
        return service;
    }
})();
