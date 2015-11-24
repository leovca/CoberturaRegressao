(function(){
    'use strict'

    angular.module('app').
        controller("FormTestCaseController",FormTestCaseController)

    FormTestCaseController.$inject = ['$scope','testcase','TestCaseDataService']

    function FormTestCaseController($scope,testcase,TestCaseDataService){
        var tc = this;
        
        tc.testcase = testcase;        
        tc.save = save;

        console.log(tc)

        /////////

        function save(){
            TestCaseDataService.save(tc.testcase)
        }

    }


})()