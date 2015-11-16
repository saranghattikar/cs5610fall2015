(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController($scope, $location, FormService, $rootScope) {

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        console.log($scope);
        console.log("in form controller");
        var formsinit = function () {
            console.log("in formsinit");
            if ($scope.user != null) {
                /*FormService.findAllFormsForUser($scope.user.id, function (error, userForms) {
                 if (error) {
                 $scope.error = error;
                 } else {
                 $scope.forms = userForms;
                 }
                 })*/
                FormService.findAllFormsForUser($scope.user.id)
                    .then(function(userForms){
                        $scope.forms = userForms;
                        console.log("in formsinit");
                        console.log(userForms);
                    })
                    .catch(function(error){
                        $scope.error = error;
                    });
            }
        };
        formsinit();

        $scope.addForm = addForm;

        function addForm(formname) {

            var _this = this;
            $scope.error = null;
            if (!formname){
                $scope.error = "Please provide the form name";
            } else if ($scope.user){
                FormService.findAllFormsForUser($scope.user.id)
                    .then(function(userForms){
                        $scope.forms = userForms;
                        var exists = false;
                        userForms.forEach(function(form, index){
                            if (form.title == formname){
                                exists = true;
                            }
                        });
                        if (exists){
                            $scope.error = "The entered form name for given user already exists. Please enter a different name";
                        } else {
                            var newFormObject = {
                                title: formname
                            }
                            FormService.createFormForUser($scope.user.id, newFormObject)
                                .then(function(newlyCreatedForm){
                                    $scope.forms.push(newlyCreatedForm);
                                    formname = _this.formname = "";
                                })
                                .catch(function(error){
                                    $scope.error = error;
                                });
                        }
                    })
                    .catch(function(error){
                        $scope.error = error;
                    });
            } else {
                $scope.error = "Please login to add a new form";
            }

        };

        /*       function addForm(formname) {
         console.log(formname);
         var _this = this;

         $scope.error = null;
         if (!formname) {
         $scope.error = "Please give valid the form name";
         }
         else if ($scope.user) {

         FormService.findAllFormsForUser($scope.user.id, function (error, userForms) {
         console.log("after findAllFormsForUser");
         if (error) {
         $scope.error = error;
         console.log("after findAllFormsForUser in error");

         }
         else {
         console.log("in else");
         $scope.forms = userForms;
         /!*console.log(userForms);*!/
         var formflag = false;
         userForms.forEach(function (form, index) {
         if (form.name === formName) {
         formflag = true;
         }
         });
         console.log("before formflag check");
         if (formflag) {
         $scope.error = "this from already exists";
         console.log("in error")
         } else {
         console.log("in else")

         var newForm = {
         name: formname
         }
         console.log("new form created")
         FormService.createFormForUser($scope.user.id, newForm, function (error, updatedlistforms) {

         if (error) {
         $scope.error = error;
         console.log("printing error")
         console.log(error);
         } else {
         $scope.forms = updatedlistforms;
         $scope.ex = "ascfg";
         console.log($scope.forms)
         _this.conforms = $scope.forms;
         formname = _this.formname = "";

         }
         });
         }
         }
         })

         }
         };*/

        $scope.updateForm = updateForm;
        function updateForm(index) {
            $scope.error = null;
            if (typeof index != "undefined") {
                var currentform = $scope.forms[index];
                alert(currentform.name + "is currently unselected");
            } else {
                console.log("index is not defined");
            }
        };

        $scope.deleteForm = deleteForm;
        function deleteForm(index) {
            console.log("in delete controller")
            $scope.error = "";
            if (typeof index == "undefined"){
                $scope.error = "Please provide an formId to delete";
            } else {
                console.log($scope.forms[index].id);
                FormService.deleteFormById($scope.forms[index].id)
                    .then(function(newFormList){
                        $scope.forms = newFormList;
                        console.log("in delete controller");
                        console.log(newFormList);
                    })
                    .catch(function(error){
                        $scope.error = error;
                    })
            }



 /*           console.log("after deleteFormById");
            $scope.error = null;
            if (typeof index != "undefined") {

                FormService.deleteFormById($scope.forms[index].id, function (error, remainingForms) {
                    console.log("after deleteFormById");
                    console.log(remainingForms);
                    if (error) {
                        console.log("in error");
                        $scope.error = error;
                    } else {
                        console.log("in else")
                        $scope.forms = remainingForms;
                        console.log(remainingForms);
                    }
                });
            } else {
                console.log("index is not valid")
            }
*/

        };
        $scope.gotoFormFields=gotoFormFields
        function gotoFormFields(form){
            $scope.error = $scope.success = "";
            $scope.selectedForm = $rootScope.selectedForm = form;
            $rootScope.$broadcast('selectedForm', form);
            $location.path( "/user" );
        };

        $scope.selectForm = selectForm;
        function selectForm(formname) {
            if (formname != null) {
                var sform;
                console.log($scope.forms);
                $scope.forms.forEach(function (form, index) {
                    if (form.name === formname) {
                        sform = form;
                    }
                });
                if (sform) {
                    alert("selected form is : " + JSON.stringify(sform));
                } else {
                    $scope.error = "no form found with name " + formName;
                }
            }
        };


    }
})();