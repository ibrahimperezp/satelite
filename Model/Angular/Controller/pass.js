app.controller("pre", function($scope, $http,$rootScope,declareInitialize,validate,setData) 
{
	//Agregar el controlador dialog a una variable, 
	//imitando el comportamiento de agregar un propotype en javascript
	$scope.dialog=$rootScope.custom.dialog;
	
	//funcion que muestra u oculta el menu de enlaces de [pre|in|post]
	$scope.menuDisplay=function(status)
	{
		if(status){document.getElementById('men').style.display="block";}
		else{document.getElementById('men').style.display="none";}
	}
	
	//Declarar las variables a usar y sus valores predeterminados
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
		declareInitialize.passMode($scope);	
		declareInitialize.send($scope);
		declareInitialize.taskSmcs($scope);
		declareInitialize.currentPass($scope);
		declareInitialize.time($scope);
		declareInitialize.route($scope);
		declareInitialize.message($scope);
	}
	
	//Funcion que crea o modifica un registro de los modulos [send_guide | passMode | etc.. ]
	$scope.saveModule=function(module)
	{	
		var validation=validate[module]($scope);
		
		var settings;
		
		if(validation==="ok"){settings=setData.saveModuleSettings($scope,module);}
		else{settings.status=validation;}
		
		if(settings.status==="ok")
		{
			$scope.dialog.loading();
			
			$http.post($scope.route.crud,settings)
				.then(function(data){$scope.dialog.alert(data.data);}
				,function(){$scope.dialog.alert($scope.message.notFound+"mas");});	
		}
		else{$scope.dialog.alert(response.status);}
	}
	
	
	$scope.selectPass=function(status,data,module)
	{
		if(status)
		{
			if(parseInt(data.complete)<100)
			{	
				$scope.dialog.loading();				
				setData.selectPass($scope,data,module);				
				$scope.menuDisplay(true);				
				if(module==="pre"){$scope.getPreRecords($scope.currentPass.id);}				
				$scope.dialog.clear();
			}
			else{$scope.dialog.alert($scope.message.moduleDisabled);}
		}
		else
		{
			$scope.declareInitialize();
			$scope.menuDisplay(false);
			$scope.clearUrl();
		}		
	}
	
	
	$scope.actualDate=function()
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
	
	
	
	
	$scope.normalizeDate=function(nro)
	{
		nro=String(nro);
		if(nro.length===1){nro="0"+nro;}
		return nro;
	}
	
	
	
	$scope.getPasses=function(stage)
	{
		var date=$scope.actualDate();
		var settings={module:"passes",actualDate:date,stage:stage};
		$http.post($scope.route.crud,settings)
			.then(function (data){$scope.rPasses=data.data;}
			,function(){$scope.dialog.alert($scope.message.notFound);});	
	}
	
	
	
	$scope.getModuleRecords=function(module,pass)
	{
		var settings=setData.readModuleSettings(module,"read","single",pass);
		
		$http.post($scope.route.crud,settings)
			.then(function (data){if(data.data.status==="ok"){setData[module]($scope,data.data);}}
			,$scope.dialog.alert($scope.message.notFound));
	}
	
	
	$scope.getPreRecords=function(pass)
	{
		$scope.getModuleRecords("send",pass);
		
		
		
		
	}
	
	
	$scope.clearUrl=function()
	{
		if(location.href.match(/#/g)!==null)
		{
			var dividedUrl=location.href.split("#");
			if(dividedUrl[1]!=="" && dividedUrl[1]!==" "){location.href=dividedUrl[0]+"#";}
		}
	}
	
	$scope.clearUrlModule=function()
	{
		if(!$scope.currentPass.pass)
		{
			$scope.clearUrl();
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$scope.savePass=function()
	{
		setData.date($scope,"pass");
		var validation=validate["pass"]($scope);
		
		if(validation==="ok")
		{
			validation=validate["passMode"]($scope);
			if(validation==="ok")
			{
				var settings=setData.savePassSettings($scope);
				
				$scope.dialog.loading();
			
				$http.post($scope.route.crud,settings)
					.then(function(data)
					{
						if(data.data==="ok"){$scope.dialog.alert($scope.message.savePassSuccessful);}
						else{$scope.dialog.alert(data.data);}
					}
					,function(){$scope.dialog.alert($scope.message.notFound);});	
			}
			else{$scope.dialog.alert(validation);}
		}
		else{$scope.dialog.alert(validation);}
	}
	
	
	$scope.getSatelites=function()
	{
		var settings={module:"satelite"};	
		$http.post($scope.route.crud,settings)
			.then(function (data){$scope.rSatelites=data.data;}
			,function(){$scope.dialog.alert($scope.message.notFound);})	
	}
	
	
	$scope.onlyBackup=function()
	{
		/*if($scope.passMode.v2==="s"){$scope.passMode.v1="n";}
		else{$scope.dialog.alert("Unicamente puede deseleccionar Real Time, Cu-Real Time y Playback si Backup Local Task está activado");}*/
		$scope.passMode.v1="n";
	}
	
	$scope.setActualDate=function(id)
	{
		document.getElementById(id).value=$scope.actualDate();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$scope.selectedBackup=function(save,backup,op)
	{
		if(save)
		{
			$scope.currentPass.backup=$scope.passMode.v2;
			if($scope.passMode.v1===1 || $scope.passMode.v1==="1"){scope.currentPass.options="real";}
			if($scope.passMode.v1===2 || $scope.passMode.v1==="2"){scope.currentPass.options="cu";}
			if($scope.passMode.v1===3 || $scope.passMode.v1==="3"){scope.currentPass.options="play";}
		}
		else
		{
			$scope.currentPass.backup=backup;
			$scope.currentPass.options=op;
		}
	}
	
	
	$scope.selectedPass=function(status,pase)
	{
		if(status)
		{
			$scope.currentPass.nro=pase;
			if($scope.turno.turno==="n"){$scope.turno.nombreTurno="nocturno";}
			else{$scope.turno.nombreTurno="nocturno";}
			$scope.turno.nombreSatelite="ABAE-VRSS"+$scope.turno.satelite;
			document.getElementById('men').style.display="block";
		}
		else
		{
			document.getElementById('men').style.display="none";
			$scope.clearUrl();
		}
		$scope.currentPass.pass=status;
	}
	
	
	$scope.readFecha=function(campo)
	{
		var f = new Date();
		
		var mes=(f.getMonth()+1);
		mes=String(mes);
		if(mes.length===1){mes="0"+mes;}
		var dia=f.getDate();
		var year=f.getFullYear();
		var completo=year+"-"+mes+"-"+dia;
		
		if(campo==="cabecera")
		{
			document.getElementById('fg').value=completo;
		}
		
	}
	
	
	
	
	
	
	$scope.normalizeFecha=function()
	{
		var c=document.getElementById('fg').value;
		
		var mes,dia,year=0;
		
		if(c!=="" && c.length===10)
		{
			mes=c[5]+""+c[6];
			dia=c[8]+""+c[9];
			year=+c[0]+""+c[1]+""+c[2]+""+c[3];
		}
		
		$scope.fecha.mes=mes;
		$scope.fecha.dia=dia;
		$scope.fecha.year=year;
		
	}
	
	$scope.readTime=function(formato,campo)
	{
		function convertString(t)
		{
			if(t<10){t="0"+t;}
			return t;
		}
		
		var t = new Date();
		var hora=(t.getHours()-0);
		
		var minuto=convertString((t.getMinutes()-0));
		var segundo=convertString((t.getSeconds()-0));
		var meridium="pm";
		
		if(formato===12 || formato==="12")
		{
			var temp;
			if(hora<12){meridium="am";}
			else{hora=hora-12;}
			$scope.taskSmcs[campo].meridium=meridium;
		}
		hora=convertString(hora);
		$scope.taskSmcs[campo].horas=String(hora);
		$scope.taskSmcs[campo].minutos=String(minuto);
		$scope.taskSmcs[campo].segundos=String(segundo);
	}
	
	
	
	
	
	
	
	
	
	
	$scope.clear=function(modulo)
	{
		declareInitialize[modulo]($scope);
		if(modulo==="turno"){document.getElementById('fg').value="0000-00-00";}
	}
	
	
	
	$scope.guardar=function(modulo)
	{	
		var settings;
		$scope.normalizeFecha();
		if(modulo!=="pass"){settings=validate.check(modulo,$scope);}	
		else{settings=validate.pass($scope);}
		
		if(settings.status==="nok")
		{
			$scope.dialog.loading();
			
			$http.post("../Controlador/Server/CRUD.php",settings)
				.then(function (data)
				{
					$scope.dialog.clear();
					if(data.data==="ok")
					{
						
						if(modulo==="pass"){$scope.selectedPass(true);}
						else{declareInitialize[modulo]($scope);}
						if(modulo==="passMode"){$scope.selectedBackup(true);}
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
		else{$scope.dialog.alert(settings.status);}
	}
	
	
	
	
	
	$scope.guarda=function(modulo)
	{
		var respuesta="todo ok";
		if(modulo==="taskSmcs")
		{
			var id=String($scope.taskSmcs.id);
			if(id.length!==14){respuesta="Faltan digitos en el task id";}
			if($scope.taskSmcs.type==="v"){respuesta="Debe seleccionar un task type";}
			for(i=1;i<2;i++)
			{
				var l="utc";
				alert("$scope["+l+i+"].minutos");
				if($scope.taskSmcs[l+i].minutos==""){respuesta="hay campos vacios en "+l;}
				if($scope.taskSmcs[l+i].segundos==""){respuesta="hay campos vacios en "+l;}
				if($scope.taskSmcs[l+i].horas==""){respuesta="hay campos vacios en "+l;}
				var l="local";
				if($scope.taskSmcs[l+i].minutos==""){respuesta="hay campos vacios en "+l;}
				if($scope.taskSmcs[l+i].segundos==""){respuesta="hay campos vacios en "+l;}
				if($scope.taskSmcs[l+i].horas==""){respuesta="hay campos vacios en "+l;}
			}
		}
		
		$scope.dialog.alert(respuesta);
	}
	
	
	
	
	
	
	
	$scope.clearUrl();
	$scope.declareInitialize();
	$scope.rPasses=$scope.getPasses("pre");
	
});