// public/core.js
angular.module('app', ['ui.router']);


angular.module('app').factory("testcases",[function(){
	
	var testcases = [
	{name:"MCA-120230"},
	{name:"MCA-119930"},
	{name:"MCA-120231"},
	{name:"MCA-119964"},
	{name:"MCA-120111"},
	{name:"MCA-120175"},
	{name:"MCA-120452"},
	{name:"MCA-120453"},
	{name:"MCA-120223"},
	{name:"MCA-120227"},
	{name:"MCA-120221"},
	{name:"MCA-120226"},
	{name:"MCA-120168"},
	{name:"MCA-120171"},
	{name:"MCA-119959"},
	{name:"MCA-120187"},
	{name:"MCA-120176"},
	{name:"MCA-119933"},
	{name:"MCA-120454"},
	{name:"MCA-120237"},
	{name:"MCA-120229"},
	{name:"MCA-120493"},
	{name:"MCA-120492"},
	{name:"MCA-120491"},
	{name:"MCA-120451"},
	{name:"MCA-120220"},
	{name:"MCA-119943"},
	{name:"MCA-120495"},
	{name:"MCA-120497"}
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