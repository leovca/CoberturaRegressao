(function(){
    'use strict'

    angular.module('app').
        controller("FormApplicationController",FormApplicationController)

    FormApplicationController.$inject = ['$scope','app']

    function FormApplicationController($scope,app){
        var application = this;
        angular.extend(application,app)
    }

})()