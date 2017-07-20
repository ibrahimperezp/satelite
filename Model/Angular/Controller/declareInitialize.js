app.controller("declareInitialize", function($scope,$timeout,$http,normalize,getData,setData,route,miscellaneous,declareInitialize,settingsDeclareInitialize) 
{
	$scope.route=route;
	$scope.normalize=normalize;
	
	$scope.setData=setData;
	$scope.setData.init($scope,$http,$timeout,$scope.normalize);
	
	
	$scope.getData=getData;
	$scope.getData.init($scope,$http,$timeout,setData,$scope.normalize);
	
	$scope.miscellaneous=miscellaneous;
	$scope.miscellaneous.init($scope);
		
	//Declarar las variables a usar y sus valores predeterminados
	settingsDeclareInitialize.init($scope,declareInitialize);
	
});