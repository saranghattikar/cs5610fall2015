/**
 * Created by SarangPC on 11/13/2015.
 */
(function(){

    angular
        .module("TakeAwayApp")
        .config(TakeAwayRouteFunction)

    function TakeAwayRouteFunction($routeProvider,$locationProvider){
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when("/", {
                templateUrl : "/project/client/views/home/home.view.html"
                /*redirectTo : "/home"*/
            })
            .when("/home", {
                templateUrl : "/project/client/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl : "/project/client/views/register/register.view.html"
            })
            .when("/profile", {
                templateUrl : "/project/client/views/profile/profile.view.html"
            })
            .when("/following", {
                templateUrl : "/project/client/views/following/following.view.html"
            })
            .when("/login", {
                templateUrl : "/project/client/views/login/login.view.html"
            })
            .when("/checkout", {
                templateUrl : "/project/views/checkout/checkout.view.html"
            })
            .when("/showprofile/:id", {
                controller:'showProfileController',
                templateUrl : "/project/client/views/profile/showprofile/profile.view.html"

            })
            .when("/favourits", {
                //controller:'favouritController',
                templateUrl : "/project/client/views/favourit/favourit.view.html"

            })
            .when("/ownerprofile", {
                templateUrl : "/project/views/ownerprofile/ownerprofile.view.html"
            })
            .when("/placeorder", {
                templateUrl : "/project/views/order/placeorder/placeorder.view.html"
            })
            .when("/previousorder", {
                templateUrl : "/project/views/previousorder/previousorder.view.html"
            })
            .when("/restaurant", {
                templateUrl : "/project/client/views/restaurant/restaurant.view.html"
            })
            .when("/searchresults", {
                templateUrl : "/project/client/views/search/searchresults.view.html"
            })
/*            .when("/ownerprofile", {
                templateUrl : "/project/views/ownerprofile/ownerprofile.view.html"
            })*/
            .otherwise({
                redirectTo : "/"
            })
    };
})();
