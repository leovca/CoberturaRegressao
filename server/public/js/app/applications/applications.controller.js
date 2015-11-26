(function(){
    'use strict'

    angular.module("app").
        controller("ApplicationsController",ApplicationsController)

    ApplicationsController.$inject = ['$scope','applicationsList','ApplicationDataService']

    function ApplicationsController($scope,applicationsList,ApplicationDataService){

        var application = this;
        application.applicationList  = applicationsList;
        application.remove = remove;

        ///////////

        function remove(app){
        	ApplicationDataService.remove(app._id)	
        }
        

    }
})();