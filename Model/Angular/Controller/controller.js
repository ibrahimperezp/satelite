app.controller("controller", function($scope, $http,$rootScope,declareInitialize,validate,setData,route,dialog,settingsDeclareInitialize) 
{	
	$scope.dialog=dialog;
	$scope.route=route;
	settingsDeclareInitialize.init($scope,declareInitialize);

	
	
	$scope.save=function(module)
	{
		//Validar
		var message=validate.init($scope,module);
		//Guardar
		$scope.dialog.alert(message);
		//Respuesta
	}
	
	$scope.validate=function(module)
	{
		//mensaje a mostrar
		var message=validate.checking($scope,module);;
		//Si son sólo de opciones binarias
		//if(settingsDeclareInitialize.toFormat.indexOf(module)>-1){message=validate.checking($scope,module);}
		//En caso contrario
		//else{message=validate[module]($scope,module);}
		//Mostrar Mensaje
		if(message==='ok')
		{
			$scope.currentPass.modules["power"]=true;
			var mo=$scope.currentPass.modules;
			var len=(Object.keys(mo).length)-1;
			console.log(len);
			$scope.currentPass.modules.cantidad+=1;
			var cantidad=$scope.currentPass.modules.cantidad;
			$scope.currentPass.complete=$scope.threeRule(cantidad,len);
			console.log($scope.currentPass);
			console.log($scope.currentPass.modules)
			//$scope.save(module);
		}
		else{$scope.dialog.alert(message);}
		$scope.dialog.alert(message);
		
	}

	$scope.threeRule=function(a,b)
	{	
		var result=((a*100)/b);
		result=parseInt(result);
		if(result>100){result=100;}
		return result;	
	}

	$scope.saves=function(module)
	{
		if(module==="satellite"){$scope.saveSatellite()}
		if(module==="pass"){$scope.savePass()}
		if(module==="passMode"){$scope.savePassMode()}
	}
	
	$scope.savePassMode=function()
	{
		var send=
		{
			module:"pass",
			action:"save",
			data:$scope.pass
		}
		$http.post($scope.route.shortcut.crud,send)
			.then(function(data)
			{
				if(data.data==="ok")
				{
					$scope.dialog.alert("Registro guardado con éxito");
					/*$scope.satellite.satellites=[];
					$scope.getSatellites();*/
				}
				else{$scope.dialog.alert(data.data);}
			});
	}
	
	$scope.menu=function()
	{
		$scope.dialog.loading();
		document.getElementById("menu_list").checked=false;
		$scope.dialog.clear();
	}
	
	$scope.savePass=function()
	{
		$scope.dialog.loading();
		
		$scope.dialog.loading();
		var check=validate.checking($scope,"passMode")
		if(check==='ok')
		{
			var arr=[$scope.pass,$scope.passMode];
			var sum=declareInitialize.concatObjects(arr);
			
			var send=
			{
				module:"pass",
				action:"save",
				data:sum
			}
			$http.post($scope.route.shortcut.crud,send)
				.then(function(data)
				{
					if(data.data==="ok")
					{
						$scope.dialog.alert("Registro guardado con éxito");
						/*$scope.satellite.satellites=[];
						$scope.getSatellites();*/
					}
					else{$scope.dialog.alert(data.data);}
				});
		}
		else{$scope.dialog.alert(check);}
	}
	$scope.getCountries=function(position)
	{
		$http.post($scope.route.shortcut.countries)
			.then(function(data){$scope.taskSmcs.country[position]=data.data;});
	}
	
	$scope.getStates=function(parent,position)
	{
		$http.post($scope.route.shortcut.states)
			.then(function(data){$scope.taskSmcs['states'+parent][position]=data.data;});
	}
	
	$scope.getSatellites=function()
	{
		$http.post($scope.route.shortcut.crud,{module:"satellite",action:"read"})
			.then(function(data){$scope.satellite.satellites=data.data;});
	}
	
	$scope.getTodayActivity=function()
	{
		$http.post($scope.route.shortcut.crud,{module:"activity",date:$scope.readDate2()})
			.then(function(data)
			{
				console.log(data.data[1].modules);
				//console.log(data.data[2]);
				$scope.pass.records=data.data;
			});
			
	}
	
	$scope.selectActivity=function(id,complete,modules)
	{
		$http.post($scope.route.shortcut.crud,{module:"selectActivity",id:id})
			.then(function(data)
			{
				$scope.currentPass.pass=true;
				$scope.currentPass.modules=modules;
				$scope.currentPass.complete=complete;
				$scope.currentPass.id=data.data[0];
				$scope.currentPass.blt=data.data[1];
			});
	}
	
	/*
	settingsDeclareInitialize.init("Este es otro texto");
	declareInitialize.init($scope);
	*/
	
	
	$scope.actualTime=function()
	{
		var d = new Date();
		
		var month=(d.getMonth()+1);
		month=$scope.normalizeDate(month);
		
		var day=d.getDate();
		day=$scope.normalizeDate(day);
		
		var year=d.getFullYear();
		var complete=year+"-"+month+"-"+day;
		
		return complete;
	}
	
	
	$scope.readDate=function()
	{
		var f = new Date();	
			
		var mes=(f.getMonth()+1);
		mes=$scope.normalizeDate(mes);
		
		var dia=f.getDate();
		dia=$scope.normalizeDate(dia);
		
		var year=f.getFullYear();
		var completo=year+"-"+mes+"-"+dia;		
		document.getElementById('passDate').value=completo;
	}
	
	$scope.readDate2=function()
	{
		var f = new Date();	
			
		var mes=(f.getMonth()+1);
		mes=$scope.normalizeDate(mes);
		
		var dia=f.getDate();
		dia=$scope.normalizeDate(dia);
		
		var year=f.getFullYear();
		var completo=year+"-"+mes+"-"+dia;		
		return completo;
	}
	
	$scope.normalizeDate=function(nro)
	{
		nro=String(nro);
		if(nro.length===1){nro="0"+nro;}
		return nro;
	}
	
	$scope.forceBLT=function()
	{
		if($scope.currentPass.blt===true){$scope.currentPass.blt=false}
		else{$scope.currentPass.blt=true}
	}
	
	$scope.cancelActivity=function()
	{
		$scope.currentPass.pass=false;
	}
	
	
	
	$scope.saveSatellite=function()
	{
		$scope.dialog.loading();
		$http.post($scope.route.shortcut.crud,{module:"satellite",action:"save",name:$scope.satellite.name})
			.then(function(data)
			{
				if(data.data==="ok")
				{
					$scope.dialog.alert("Registro guardado con éxito");
					$scope.satellite.satellites=[];
					$scope.getSatellites();
				}
				else{$scope.dialog.alert(data.data);}
			});
		
	}
	
	$scope.askDelete=function(id,name)
	{
		$scope.dialog.confirm("¿Desea eliminar el satélite "+name+"?",function(){$scope.deleteSatellite(id);})
	}
	
	$scope.deleteSatellite=function(id)
	{
		$scope.dialog.loading();
		$http.post($scope.route.shortcut.crud,{module:"satellite",action:"delete",id:id})
			.then(function(data)
			{
				if(data.data==="ok")
				{
					$scope.dialog.alert("Registro eliminado con éxito");
					$scope.getSatellites();
				}
				else{$scope.dialog.alert(data.data);}
			});
	}
	
});