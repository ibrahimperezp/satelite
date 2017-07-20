app.controller("validate", function($scope,$timeout, $http,normalize,getData,dialog,setData,route,miscellaneous,declareInitialize,settingsDeclareInitialize,validate,settingsValidate ) 
{
	$scope.dialog=dialog;
	$scope.route=route;
	$scope.normalize=normalize;
	$scope.validate=validate;
	
	$scope.setData=setData;
	$scope.setData.init($scope,$http,$timeout,$scope.normalize);
	
	$scope.getData=getData;
	$scope.getData.init($scope,$http,$timeout,setData,$scope.normalize);
	
	$scope.miscellaneous=miscellaneous;
	$scope.miscellaneous.init($scope);
		
	//Declarar las variables a usar y sus valores predeterminados
	settingsDeclareInitialize.init($scope,declareInitialize);
	
	$scope.play=function()
	{
		var message=settingsValidate.init($scope,validate,$scope.currentModule.module);
		$scope.dialog.alert(message);
	}
	
	$scope.normalize.clearUrl();
});