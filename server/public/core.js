// public/core.js
var app = angular.module('app', []);

function mainController($scope, aplicacoes,testcases,socket,$http) {
    
    
    $scope.aplicacoes = aplicacoes.getAplicaoes();
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

		listaTests = testcases.getTestCases();

		for(i=0;i<listaTests.length;i++){
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
    
    	test = testcases.getTestCases()[$index]
    	testAtual = test;
    	application = $scope.application;
    	
    	socket.emit("test",application)		
    }
    
    
    socket.on('data', function (data) {
    	data = JSON.parse(replaceAll(data,"'",'"'))
    	testAtual.coverage = data.coverage
    	testAtual.results = data;
    	console.log(data)
    	
  	});
    
    
   
        
}


app.factory("testcases",[function(){
	
	var testcases = [
		{
			name:"Teste case 1",
			description:"Clique no botão 1, a messagem botão 1 deve aparecer, Clique no botão 2, a menssagem botao 2 deve aparecer"						
		},
		{
			name:"Teste case 2",
			description:"Clique no botão 1, a messagem botão 1 deve aparecer,Clique no botão 3, a messagem botão 3 deve aparecer"						
		},
		{
			name:"Teste case 3",
			description:"Clique no botão 1, a messagem botão 1 deve aparecer,Clique no botão 3, a messagem botão 3 deve aparecer, click na opçõa de configurações"						
		}
	]
	
	return {
		getTestCases:function (){return testcases}
	}
	
}])

app.factory("aplicacoes",[function(){
	
	var aplicacoes = [{
			appMainClass:"android.cin.ufpe.br.aplicacaoteste/android.cin.ufpe.br.aplicacaoteste.AtivityTeste",
			repoDir:"~/Desktop/Monografia/AplicacaoTeste",
			name:"Aplicação Teste"
		},
		{
			appMainClass:"android.cin.ufpe.br.aplicacaoteste/android.cin.ufpe.br.aplicacaoteste.AtivityTeste",
			repoDir:"~/Desktop/Monografia/AplicacaoTeste",
			name:"Galeria"
		},
		{
			appMainClass:"com.motorola.camera/com.motorola.camera.Camera",
			repoDir:"~/Desktop/Monografia/repo_moto/MotCamera",
			name:"Moto Camera"
		}	
	]
	
	return {
		getAplicaoes: function() {return aplicacoes}		
	}
	
}])


app.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();
    console.log("socket created");
 
    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }
 
            socket.on(eventName, wrapper);
 
            return function () {
                socket.removeListener(eventName, wrapper);
            };
        },
 
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);