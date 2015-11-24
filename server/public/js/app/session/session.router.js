(function(){
    'use strict'

    angular.module("app").config(configureReoutes)

    configureReoutes.$inject=['$stateProvider', '$urlRouterProvider']

    function configureReoutes($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider.state('sessions',{
            url:"/session",
            templateUrl:"js/app/session/index.html",
            controller:"SessionsController"
        })

    }

})();