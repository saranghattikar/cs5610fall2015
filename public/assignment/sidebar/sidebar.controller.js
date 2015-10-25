(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", function($scope, $location){
        $scope.$location = $location;
    });
})();