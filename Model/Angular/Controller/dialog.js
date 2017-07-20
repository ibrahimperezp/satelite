app.controller("dialog", function($scope, dialog,route) 
{
	$scope.dialog=dialog;
	$scope.route=route;
	
	//$scope.dialog.confirm("desea continuar?");
	//$scope.dialog.alert("este es un alert");
	//$scope.dialog.loading();
});