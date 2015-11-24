(function(){
    'use strict'

    angular.module("app").
        factory('TestCaseDataService',TestCaseFactory)

    TestCaseFactory.$inject = ['$http']

    function TestCaseFactory($http){

        return {
            remove:remove,
            get:get,
            getAll:getAll,
            getNew:getNew,
            save:save

        }

        ////////////////////////////////////

        function remove(id){
            $http.delete('/api/testcase/'+id)
                .then(getDeleteComplete,getDeleteFailed)

            function getDeleteComplete(response){
                return response.data
            }

            function getDeleteFailed(erro){
                console.log("erro:"+erro.data)
            }
        }

        function get(id){
            return $http.get('/api/testcase/'+id)
                .then(getComplete,getFailed)

            function getComplete(response){
                return response.data;
            }

            function getFailed(erro){
                console.log("erro:"+erro.data)
            }
        }

        function getAll(){
            return $http.get('/api/testcase')
                .then(getAllComplete,getAllFailed)

            function getAllComplete(response){
                return response.data;
            }

            function getAllFailed(erro){
                console.log("erro:"+erro.data)
            }
        }

        function getNew(){
            return {}
        }


        function save(object){

            var url = null;

            if(object._id==undefined){
                url = "api/testcase"
            }else{
                url = "api/testcase/"+object._id;
            }

            return $http.post(url,object).then(getSaveComplete,getSaveFailed)
            

            function getSaveComplete(response){
                return response.data
            }

            function  getSaveFailed(erro){
                console.log("erro:"+erro.data)
            }

        }

    }

})()
