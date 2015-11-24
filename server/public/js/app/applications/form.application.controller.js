(function(){
    'use strict'

    angular.module('app').
        controller("FormApplicationController",FormApplicationController)

    FormApplicationController.$inject = ['$scope','app','ApplicationDataService']

    function FormApplicationController($scope,app,ApplicationDataService){
    	var fe = this;
        
        fe.app = app;        
        fe.save = save;

		/////////

		function save(){
			ApplicationDataService.save(fe.app)
		}

    }


})()