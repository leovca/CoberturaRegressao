// public/core.js
var app = angular.module('app', []);

function mainController($scope, aplicacoes,testcases,socket) {
    
    
    $scope.aplicacoes = aplicacoes.getAplicaoes();
    $scope.testcases = testcases.getTestCases();
    
    var testAtual;
    
    $scope.selelecionaApp = function(application){
    	$scope.application = application;
    }
    
    $scope.testar = function($index){
    
    	test = testcases.getTestCases()[$index]
    	testAtual = test;
    	application = $scope.application;
    	
    	socket.emit("test",application)		
    }
    
    
    socket.on('data', function (data) {
    	//alert(data)
    	testAtual.coverage = data.coverage
    	
    	
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
			name:"Aplicação Teste",
			commitBase:"1543b6e5ab47332d82a0e7867a7d1f0ec3d884f9",
			commitAlterado:"10f0725cd99b3e676459625373fbf97422be9516"
		},
		{
			appMainClass:"android.cin.ufpe.br.aplicacaoteste/android.cin.ufpe.br.aplicacaoteste.AtivityTeste",
			repoDir:"~/Desktop/Monografia/AplicacaoTeste",
			name:"Galeria"
		},
		{
			appMainClass:"android.cin.ufpe.br.aplicacaoteste/android.cin.ufpe.br.aplicacaoteste.AtivityTeste",
			repoDir:"~/Desktop/Monografia/AplicacaoTeste",
			name:"Camera"
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