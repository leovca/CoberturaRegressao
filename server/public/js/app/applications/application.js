(function(){
    'use strict'

    angular.module("app").
        factory('ApplicationDataService',ApplicationFactory)

    ApplicationFactory.$inject = ['$http']

    function ApplicationFactory($http){

        return {
            getAll:getAll,
            get:get
        }

        ////////////////////////////////////

        function get(id){
            return $http.get('/api/application/'+id)
                .then(getComplete,getFailed)

            function getComplete(response){
                return response.data;
            }

            function getFailed(erro){
                console.log("erro:"+erro.data)
            }
        }

        function getAll(){
            return $http.get('/api/application')
                .then(getAllComplete,getAllFailed)

            function getAllComplete(response){
                return response.data;
            }

            function getAllFailed(erro){
                console.log("erro:"+erro.data)
            }
        }




    }

})()
