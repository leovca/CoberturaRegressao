(function(){
    'use strict'

    angular.module("app").
        controller("SessionsController",SessionsController)

    SessionsController.$inject = ['$scope','applicationsList','testcases','socket','$http']

    function SessionsController($scope, applicationsList,testcases,socket,$http) {

        var session = this;
        session.applicationsList = applicationsList

        console.log(session)
        $scope.testcases = testcases.getTestCases();

        $scope.resultados=
                {esperadas:[],
                alcancadas:[],
                faltantes:[]}

        var testAtual;

        $scope.selectBase = function(commit){
            $scope.application.commitBase = commit.split('+')[0]
        }
    
        $scope.selectAlterado = function(commit){
            $scope.application.commitAlterado = commit.split('+')[0]
        }

        $scope.selelecionaApp = function(application){
            $scope.application = application;

            $http.post("/api/getCommits",application).then(function(data){
                $scope.commits = data.data

            })
        }

    function arrayUnique(array) {
        var a = array.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    function arr_diff(a1, a2)
    {
      var a=[], diff=[];
      for(var i=0;i<a1.length;i++)
        a[a1[i]]=true;
      for(var i=0;i<a2.length;i++)
        if(a[a2[i]]) delete a[a2[i]];
        else a[a2[i]]=true;
      for(var k in a)
        diff.push(k);
      return diff;
    }

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

    $scope.calcCoverage =  function(){


                $scope.resultados.esperadas =[]
                $scope.resultados.alcancadas = []
                $scope.resultados.faltantes = []

        var listaTests = testcases.getTestCases();

        for(var i=0;i<listaTests.length;i++){
            if(listaTests[i].results!=undefined){
                $scope.resultados.esperadas = arrayUnique($scope.resultados.esperadas.concat(listaTests[i].results.esperadas))
                $scope.resultados.alcancadas = arrayUnique($scope.resultados.alcancadas.concat(listaTests[i].results.alcancadas))
                $scope.resultados.faltantes = arr_diff($scope.resultados.esperadas,$scope.resultados.alcancadas)
            }
        }

        $scope.resultados.coverage = (($scope.resultados.esperadas.length-$scope.resultados.faltantes.length)*100)/$scope.resultados.esperadas.length

        return $scope.resultados.coverage

    }
    
    $scope.testar = function($index){
    
        var test = testcases.getTestCases()[$index]
        testAtual = test;
        var application = $scope.application;
        
        socket.emit("test",application)     
    }
    
    
    socket.on('data', function (data) {
        data = JSON.parse(replaceAll(data,"'",'"'))
        testAtual.coverage = data.coverage
        testAtual.results = data;
        console.log(data)
        
    });
    
    
   
        
}

})();