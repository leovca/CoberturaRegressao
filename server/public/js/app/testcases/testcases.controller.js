(function(){
    'use strict'

    angular.module("app").
        controller("TestCasesController",TestCasesController)

    TestCasesController.$inject = ['$scope','testcaseList','TestCaseDataService']

    function TestCasesController($scope,testcaseList,TestCaseDataService){

        var testcase = this;
        testcase.testcaseList  = testcaseList;


        testcase.remove = remove;

        ///////////

        function remove(testecase){
        	TestCaseDataService.remove(testecase._id)	
        }
        

    }
})();