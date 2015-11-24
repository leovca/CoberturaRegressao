(function(){
    'use strict'

    angular.module("app").config(configureReoutes)

    configureReoutes.$inject=['$stateProvider', '$urlRouterProvider']

    function configureReoutes($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('testcases',{
            url:"/testcases",
            templateUrl:"js/app/testcases/index.html",
            abstract:true
        })
        .state('testcases.list',{
            url:"/list",
            templateUrl:"js/app/testcases/testcases.html",
            controller: "TestCasesController",
            controllerAs:"testcases",
            resolve:{
                testcaseList:['TestCaseDataService',function testcaseList(TestCaseDataService){
                    return TestCaseDataService.getAll()
                }]
            }
        }).
        state('testcases.new',{
            url:"/new",
            templateUrl:"js/app/testcases/testcase.form.html",
            controller:"FormTestCaseController",
            controllerAs:"tc",
            resolve:{
                testcase:['TestCaseDataService','$stateParams',function testcaseList(TestCaseDataService,$stateParams){
                    return TestCaseDataService.getNew()
                }]
            }
        })
        .state('testcases.edit',{
            url:"/{id}",
            templateUrl:"js/app/testcases/testcase.form.html",
            controller:"FormTestCaseController",
            controllerAs:"tc",
            resolve:{
                testcase:['TestCaseDataService','$stateParams',function testcaseList(TestCaseDataService,$stateParams){
                    return TestCaseDataService.get($stateParams.id)
                }]
            }
        })

    }

})();