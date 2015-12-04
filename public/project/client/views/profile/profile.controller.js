(function () {
    angular
        .module("TakeAwayApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location, UserService, $rootScope) {

        var loggedinUser = $rootScope.user;
        var changeduser;
        $scope.$location = $location;
        $scope.update = update;
        var username = $scope.username;
        var password = $scope.password;
        var fname = $scope.fname;
        var lname = $scope.lname;
        var email = $scope.email;

        /*          console.log($scope.username)
         console.log(username)
         console.log(password)
         console.log(fname)
         console.log(lname)

         $scope.user.username = username;
         $scope.user.username = password;
         $scope.user.fname = fname;
         $scope.user.lname = lname;
         $scope.user.email = email;*/


        function update() {
            console.log("hi from UPDATE method");
            /*                UserService.updateUser(loggedinUser.id,$scope.user,function(error, changeduser){
             if (error){
             $scope.error = error;
             console.log("error");
             }
             else{
             $scope.user = changeduser;
             console.log("successfully updated");


             }
             });*/
            console.log(loggedinUser.id);
            UserService.updateUser(loggedinUser.id, loggedinUser)
                .then(function (changeduser) {
                    console.log("in controller after receiving changeduser");
                    console.log(changeduser)
                    $scope.user = changeduser;
                    $scope.success = "Succesfully updated user profile";
                })
                .catch(function (error) {
                    $scope.error = error;
                })


        };
    };
})();