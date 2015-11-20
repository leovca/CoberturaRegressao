(function(){
    'use strict'

    angular.module("app").config(configureReoutes)

    configureReoutes.$inject=['$stateProvider', '$urlRouterProvider']

    function configureReoutes($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('applications',{
            url:"/applications",
            templateUrl:"js/app/applications/index.html",
            abstract:true
        })
        .state('applications.list',{
            url:"/list",
            templateUrl:"js/app/applications/applications.html",
            controller: "ApplicationsController",
            controllerAs:"applications",
            resolve:{
                applicationsList:['ApplicationDataService',function applicationsList(ApplicationDataService){
                    return ApplicationDataService.getAll()
                }]
            }
        })
        .state('applications.new',{
            url:"/new",
            templateUrl:"js/app/applications/application.form.html",
            controller:"FormApplicationController",
            controllerAs:"application"
        })
        .state('applications.edit',{
            url:"/{appID}",
            templateUrl:"js/app/applications/application.form.html",
            controller:"FormApplicationController",
            controllerAs:"application",
            resolve:{
                app:['ApplicationDataService','$stateParams',function applicationsList(ApplicationDataService,$stateParams){
                    return ApplicationDataService.get($stateParams.appID)
                }]
            }
        })

    }

})();