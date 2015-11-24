// public/core.js
angular.module('app', ['ui.router']);


angular.module('app').factory("testcases",[function(){
	
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

angular.module('app').factory("aplicacoes",[function(){
	
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


angular.module('app').factory('socket', ['$rootScope', function ($rootScope) {
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