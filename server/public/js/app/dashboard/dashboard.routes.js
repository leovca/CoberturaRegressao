(function(){
    'use strict'

    angular.module("app").config(configureReoutes)

    configureReoutes.$inject=['$stateProvider', '$urlRouterProvider']

    function configureReoutes($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider.state('dashboard',{
            url:"/dashboard",
            templateUrl:"js/app/dashboard/dashboard.html"
        })

    }

})();