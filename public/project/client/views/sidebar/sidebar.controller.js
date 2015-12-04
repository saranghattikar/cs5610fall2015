(function(){
    'use strict';
    angular
        .module("TakeAwayApp")
        .controller("SidebarController", function($scope, $location){
            $scope.$location = $location;
            console.log($scope.$location);

    });
})();