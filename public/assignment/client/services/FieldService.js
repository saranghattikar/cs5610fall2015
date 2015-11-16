(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        console.log("Hi FieldService is here");


        //var forms = [];

        function createFieldForForm(formId, field){
            var deferred = $q.defer();

            $http.post("/api/assignment/form/"+formId+"/field", field)
                .success(function(updatedFields){
                    deferred.resolve(updatedFields);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };

        function getFieldsForForm(formId){
            var deferred = $q.defer();

            $http.get("/api/assignment/form/"+formId+"/field")
                .success(function(fields){
                    deferred.resolve(fields);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };

        function getFieldForForm(formId, fieldId){
            var deferred = $q.defer();

            $http.get("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(field){
                    deferred.resolve(field);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };


        function deleteFieldFromForm(formId, fieldId){
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(remainingFields){
                    console.log("remainingFields", remainingFields);
                    deferred.resolve(remainingFields);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        }

        function updateField(formId, fieldId, field){
            var deferred = $q.defer();

            $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field)
                .success(function(updatedField){
                    deferred.resolve(updatedField);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        }

        function cloneField(clonedField, index, formId){
            var deferred = $q.defer();

            $http.post("/api/assignment/form/"+formId+"/field/"+index, clonedField)
                .success(function(fields){
                    deferred.resolve(fields);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        }


        var fieldService = {
            "createFieldForForm": createFieldForForm,
            "getFieldsForForm": getFieldsForForm,
            "getFieldForForm": getFieldForForm,
            "deleteFieldFromForm": deleteFieldFromForm,
            "updateField": updateField,
            "cloneField":cloneField
        };

        return fieldService;


    }
})();