(function(){
    'use strict'

    angular.module("app").
        factory('ApplicationDataService',ApplicationFactory)

    ApplicationFactory.$inject = ['$http']

    function ApplicationFactory($http){

        return {
            remove:remove,
            get:get,
            getAll:getAll,
            getNew:getNew,
            save:save

        }

        ////////////////////////////////////

        function remove(id){
            $http.delete('/api/application/'+id)
                .then(getDeleteComplete,getDeleteFailed)

            function getDeleteComplete(response){
                return response.data
            }

            function getDeleteFailed(erro){
                console.log("erro:"+erro.data)
            }
        }

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

        function getNew(){
            return {}
        }


        function save(app){

            var url = null;

            if(app._id==undefined){
                url = "api/application"
            }else{
                url = "api/application/"+app._id;
            }

            return $http.post(url,app).then(getSaveComplete,getSaveFailed)
            

            function getSaveComplete(response){
                return response.data
            }

            function  getSaveFailed(erro){
                console.log("erro:"+erro.data)
            }

        }

    }

})()
