(function(){
    'use strict'

    angular.module("app").
        controller("ApplicationsController",ApplicationsController)

    ApplicationsController.$inject = ['$scope','applicationsList']

    function ApplicationsController($scope,applicationsList){

        var application = this;
        application.applicationList  = applicationsList;

    }
})();