app.controller("pre", function($scope, $http,$rootScope,declareInitialize,validate) 
{
	//Agregar el controlador dialog a una variable, 
	//imitando el comportamiento de agregar un propotype en javascript
	$scope.dialog=$rootScope.custom.dialog;
	
	$scope.statusTemplate=true;
	$scope.statusEstados=false;
	$scope.dir='menu.html';
	$scope.opcionesEstados=6;
	
	
	//Muestra/oculta los campos de estados cuando se selecciona venezuela como pais
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
	
	$scope.buscar=function()
	{	
		$scope.normalizeFecha();
		response=validate.pass($scope);		
		
		if(response.status==="ok")
		{
			$scope.dialog.loading();
			send=
			{
				turno: $scope.turno.turno,
				fecha: $scope.fecha.year+"-"+$scope.fecha.mes+"-"+$scope.fecha.dia,
				satelite: $scope.turno.satelite,
				pase:$scope.turno.pase,
				accion:"search"
			};
			
			$http.post("../Controlador/Server/CRUD.php",send)
				.then(function (data)
				{
					$scope.dialog.clear();
					if(data.data.status==="ok")
					{
						$scope.selectedPass(true,data.data.pase);
						$scope.selectedBackup(false,data.data.backup,data.data.options);
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
	
	$scope.go=function(dir)
	{
		location.href=dir;
	}
	
	$scope.selectPass=function(status,idpase,satelite,fecha,pase,turno,backup,complete)
	{
		if(status)
		{
			complete=parseInt(complete);
			if(complete<100)
			{	
				$scope.turno.nombreSatelite=satelite;
				$scope.fecha.completa=fecha;
				$scope.turno.pase=pase;
				$scope.turno.turno=turno;
				if(turno==="n"){$scope.turno.nombreTurno="Nocturno";}
				else{$scope.turno.nombreTurno="Diurno";}
				$scope.currentPass.backup=backup;
				$scope.currentPass.options="v";
				$scope.currentPass.nro=pase;
				$scope.currentPass.id=idpase;
				document.getElementById('men').style.display="block";
				$scope.currentPass.pass=status;
			}
			else
			{
				$scope.dialog.alert("No se puede seleccionar un prepase completado al 100%, si desea modificarlo, dirigase a la seccion editar");
			}
		}
		else
		{
			declareInitialize.currentPass($scope);
			declareInitialize.turno($scope);
			document.getElementById('men').style.display="none";
			$scope.clearUrl();
			$scope.currentPass.pass=status;
		}
		
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
	
	$scope.getPasses=function(stage)
	{
		var date=$scope.actualDate();
		var response={module:"passes",actualDate:date,stage:stage};
		$http.post("../Controlador/Server/CRUD.php",response)
			.then(function (data)
			{
				$scope.rPasses=data.data;
				
			},function()
			{
				$scope.dialog.alert("No se pudo establecer conexión con el servidor");
			})	
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
	
	$scope.getSatelites=function()
	{
		var response={accion:"satelite"};	
		$http.post("../Controlador/Server/CRUD.php",response)
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
		declareInitialize.passMode($scope);	
		declareInitialize.send($scope);
		declareInitialize.taskSmcs($scope);
		declareInitialize.currentPass($scope);
		declareInitialize.time($scope);
	}
	
	$scope.clear=function(modulo)
	{
		declareInitialize[modulo]($scope);
		if(modulo==="turno"){document.getElementById('fg').value="0000-00-00";}
	}
	
	
	$scope.clearUrl=function()
	{
		if(location.href.match(/#/g)!==null){location.href="prepase.html#";}
	}
	
	$scope.guardar=function(modulo)
	{	
		var response;
		$scope.normalizeFecha();
		if(modulo!=="pass"){response=validate.check(modulo,$scope);}	
		else{response=validate.pass($scope);}
		
		if(response.status==="nok")
		{
			$scope.dialog.loading();
			
			$http.post("../Controlador/Server/CRUD.php",response)
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
		else{$scope.dialog.alert(response.status);}
	}
	
	
	$scope.save=function(modulo)
	{	
		var response;
		//$scope.normalizeFecha();
		if(modulo!=="pass"){response=validate.check(modulo,$scope);}	
		else{response=validate.pass($scope);}
		
		if(response.status==="ok")
		{
			$scope.dialog.loading();
			
			$http.post("../Controlador/Server/CRUD.php",response)
				.then(function (data)
				{
					$scope.dialog.clear();
					if(data.data==="ok")
					{
						
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
	
	$scope.onlyBackup=function()
	{
		if($scope.passMode.v2==="s"){$scope.passMode.v1="n";}
		else{$scope.dialog.alert("Unicamente puede deseleccionar Real Time, Cu-Real Time y Playback si Backup Local Task está activado");}
	}
	
	
	
	$scope.clearUrl();
	$scope.declareInitialize();
	
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
	
	$scope.rPasses=$scope.getPasses("pre");
	
});