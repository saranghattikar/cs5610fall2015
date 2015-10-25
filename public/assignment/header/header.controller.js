(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", function($scope, $location){
        $scope.$location = $location;
        $scope.hello="Hello"
    });
})();