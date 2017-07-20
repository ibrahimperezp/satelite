app.controller("save", function($scope,$timeout, $http,getData,dialog,setData,route,normalize,miscellaneous,declareInitialize,settingsDeclareInitialize,validate,settingsValidate ) 
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
	$scope.settingsDeclareInitialize=settingsDeclareInitialize;
	$scope.settingsDeclareInitialize.init($scope,declareInitialize);
	
	
	$scope.play=function(action)
	{
		//Ación por defecto en caso que no se llame esta función con argumento
		action=action?action:"saveOrEdit";
		//Se obtiene el módulo actual
		var module=$scope.currentModule.module;
		//Se validan los campos
		var status=settingsValidate.init($scope,validate,module);
		//Si la respuesa de la valicación es 'ok', se procede a guardar/editar/modificar/eliminar
		if(status==="ok")
		{
			//Campos totalmente prelados en blt
			if(module==="activity")
			{
				action="saveOrEdit";
				getData.crud("taskRdrPre",action);
				getData.crud("demulatorPre",action);
				getData.crud("taskRdrIn",action);
				getData.crud("demulatorIn",action);
				getData.crud("raw1",action);
				getData.crud("raw2",action);
				action="save";
			}
		}
		//En caso contrario se muestra el mesae obtenido
		else{$scope.dialog.alert(status);}
		
		$scope.dialog.clear();
		if(status==="ok")
		{
			getData.crud(module,action);
		}
	}
	
	//Pregunta si borrar
	$scope.askDelete=function(module,id,name)
	{
		$scope.dialog.confirm("¿Desea eliminar "+name+"?",function(){getData.crud(module,"delete",id);})
	}
	
	$scope.normalize.clearUrl();
});