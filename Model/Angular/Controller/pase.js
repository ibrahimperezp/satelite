app.controller("pase", function($scope, $http,$rootScope,declareInitialize,validate) 
{
	$scope.dialog=$rootScope.custom.dialog;
	
	
	$scope.statusTurno=false;
	$scope.seeTurno=function(t){$scope.statusTurno=t;}
	$scope.statusTemplate=true;
	$scope.statusEstados=false;
	$scope.opcionesEstados=6;
	
	$scope.estados=function()
	{
		if($scope.taskSmcs.paises==="Venezuela"){$scope.statusEstados=true;}
		else{$scope.statusEstados=false;}
	}
	
	$scope.recordFrom=function (modulo)
	{
		$http.get("../Archivo/Data/"+modulo+".php")
 		.then(function (data)
		{		
			if(modulo==="paises"){$scope.rPaises=data.data;}
			if(modulo==="estados")
			{
				for(re=1;re<=$scope.opcionesEstados;re++){$scope["rEstados"+re]=data.data;}
			}
		});
 	} 
	
	$scope.readFecha=function(campo)
	{
		var f = new Date();
		
		if(campo==="cabecera")
		{
			$scope.fecha.dia=f.getDate();
			$scope.fecha.mes=(f.getMonth()+1);
			$scope.fecha.year=f.getFullYear();
		}
		
	}
	
	$scope.getSatelites=function()
	{
		var response={accion:"satelite"};		
		
		$http.post("../Controlador/Server/crud.php",response)
			.then(function (data)
			{
				$scope.dialog.clear();
				$scope.rSatelites=data.data;
				
			},function()
			{
				$scope.dialog.clear();
				$scope.dialog.alert("No se pudo establecer conexión con el servidor");
			})	
	
		
	}
	
	
	
	$scope.declareInitialize=function()
	{
		declareInitialize.turno($scope);
		declareInitialize.deviceRF($scope);
		declareInitialize.deviceAcu($scope);
		declareInitialize.device($scope);
		declareInitialize.rack2($scope);
		declareInitialize.status($scope);
		declareInitialize.ups($scope);
		declareInitialize.turno($scope);
		declareInitialize.pass($scope);	
		declareInitialize.send($scope);
		declareInitialize.taskSmcs($scope);
	}
	
	$scope.clear=function(modulo)
	{
		declareInitialize[modulo]($scope);
	}
	
	
	$scope.guardar=function(modulo)
	{	
		var turno=true;
		var pase=false;
		if(modulo==="pass"){pase=true;}
		if(modulo==="send" || modulo==="taskSmcs"){pase=true;turno=false;}
		
		var response=validate.check(modulo,$scope,turno,pase);
		
		if(response.status==="ok")
		{
			$scope.dialog.loading();
			
			$http.post("../Controlador/Server/crud.php",response)
				.then(function (data)
				{
					$scope.dialog.clear();
					if(data.data==="ok")
					{
						declareInitialize[modulo]($scope);
						$scope.dialog.alert("Registro guardado");
					}
					else
					{
						$scope.dialog.alert(data.data);
					}
				},function()
				{
					$scope.dialog.clear();
					$scope.dialog.alert("No se pudo establecer conexión con el servidor");
				})	
		}
		else{$scope.dialog.alert(response.status);}
	}
	
	
	$scope.declareInitialize();
});