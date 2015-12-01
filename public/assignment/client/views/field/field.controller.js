(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController($scope, $location, FormService, $rootScope,FieldService,$routeParams) {

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.fields = [];
        $scope.newFieldType = "";

        $scope.formID = $routeParams.formId || "";
        $scope.userID = $routeParams.userId || "";

        var options = {
            "label": "o1",
            "value": "o1"
        };



        var slt = {
                "id": null,
                "label": "New Text Field",
                "fieldType": "TEXT",
                "placeholder": "New Field"
            },
            mltf = {
                "id": null,
                "label": "New Text Field",
                "fieldType": "TEXTAREA",
                "placeholder": "New Field"
            },
            date = {
                "id": null,
                "label": "New Date Field",
                "fieldType": "DATE"
            },
            dropdown = {
                "id": null,
                "label": "New Dropdown",
                "fieldType": "OPTIONS",
                "options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
            },
            checkboxes = {
                "id": null,
                "label": "New Checkboxes",
                "fieldType": "CHECKBOXES",
                "options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
            },
            radio = {
                "id": null,
                "label": "New Radio Buttons",
                "fieldType": "RADIOS",
                "options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
            },
            email = {
                "id": null,
                "label": "New Email Field",
                "fieldType": "EMAIL",
                "placeholder": "New Field"
            },
            options = {
                "label": "",
                "value": ""
            };

        $scope.newField = {
            "type": $scope.newFieldType,
            "slt": clone(slt),
            "mltf": clone(mltf),
            "date": clone(date),
            "dropdown": clone(dropdown),
            "checkboxes": clone(checkboxes),
            "radio": clone(radio),
            "email": clone(email)
        };

        function clone(source){
            if (source && typeof source == "object"){
                return JSON.parse(JSON.stringify(source));
            } else {
                return null;
            }
        }

        var initForms = function(){
            if ($scope.selectedForm){
                FieldService.getFieldsForForm($scope.selectedForm.id)
                    .then(function(fields){
                        $scope.fields = fields;
                    })
                    .catch(function(error){
                        $scope.error = error;
                    });
            }
        };
        initForms();

        $scope.addField = function(fieldType){
            $scope.error = "";
            if (fieldType){
                console.log("fieldType",fieldType);
                $scope.newField.fieldType = fieldType;
                var newFieldObject = clone($scope.newField[fieldType]);
                $scope.fields.push(newFieldObject);

                FieldService.createFieldForForm($scope.selectedForm.id, newFieldObject)
                    .then(function(fields){
                        $scope.fields = fields;
                        console.log("$scope.fields", $scope.fields);
                    })
                    .catch(function(error){
                        $scope.error = error;
                    });
            } else {
                $scope.error = "Please select a field type to add";
            }
        };


        $scope.deleteField = function(field){
            $scope.error = "";
            if (field){
                FieldService.deleteFieldFromForm($scope.selectedForm.id, field.id)
                    .then(function(remainingFields){
                        $scope.fields = remainingFields;
                    })
                    .catch(function(error){
                        $scope.error = error;
                    });
            } else {
                $scope.error = "Please select a field type to delete";
            }
        };


        $scope.cloneField = function(field, index){
            var clonedField = clone(field);
            FieldService.cloneField(clonedField, index, $scope.selectedForm.id)
                .then(function(fields){
                    $scope.fields = fields;
                })
                .catch(function(error){
                    $scope.error = error;
                });
        }


        $rootScope.$on("selectedForm", function(event, form){
            $scope.error = null;
            $scope.selectedForm = $rootScope.selectedForm = form;
        });

    }
})();