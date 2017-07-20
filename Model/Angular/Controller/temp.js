app.controller("pase", function($scope, $http,$rootScope) 
{
	//funcion que actualiza los registros  a mostrar de las opciones de satelite
	$scope.dialog=$rootScope.custom.dialog;
	
	
	$scope.statusTurno=false;
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
		$http.get("../Data/"+modulo+".php")
 		.then(function (data)
		{
			if(modulo==="satelite"){$scope.rSatelites=data.data;}			
			if(modulo==="paises"){$scope.rPaises=data.data;}
			if(modulo==="estados")
			{
				for(re=1;re<=$scope.opcionesEstados;re++){$scope["rEstados"+re]=data.data;}
			}
		});
 	} 
	
	
	$scope.seeTurno=function(b){$scope.statusTurno=b;}
	
	$scope.startTurno=function()
	{
		$scope.turno=
		{
			turno: 'v',
			satelite:0,
			pases:[1,2,3,4],
			pase:0
		};
		
		$scope.fecha=
		{
			mes: "",
			dia:"",
			year:""
		};
		
	}
	
	$scope.startDeviceRF=function()
	{
		$scope.deviceRF=
		{
			v1: 'v', //XData 720-1 status 
			v2: 'v', //XData 720-1 smcs
			v3: 'v', //XData 720-2 status
			v4: 'v', //XData 720-2 smcs  
			v5: 'v', //XData 720-1b status
			v6: 'v', //XData 720-1b smcs
			v7: 'v', //XData 720-2b status
			v8: 'v', //XData 720-2b smcs 
			v9: 'v', //Test 720-s status
			v10: 'v', //Test 720-s smcs
			v11: 'v', //XTrack 720-1 status
			v12: 'v', //XTrack 720-1b status
			v13: 'v', //STrack 720-1 status
			v14: 'v', //STrack 720-1b status
			v15: 'v' //N-port status
		};
		
		$scope.cDeviceRF=
		[
			{"name":"XData 720-1 status","index":"1"},
			{"name":"XData 720-1 smcs","index":"2"},
			{"name":"XData 720-2 status","index":"3"},
			{"name":"XData 720-2 smcs","index":"4"},
			{"name":"XData 720-1b status","index":"5"},
			{"name":"XData 720-1b smcs","index":"6"},
			{"name":"XData 720-2b status","index":"7"},
			{"name":"XData 720-2b smcs","index":"8"},
			{"name":"Test 720-s status","index":"9"},
			{"name":"Test 720-s smcs","index":"10"},
			{"name":"XTrack 720-1 status","index":"11"},
			{"name":"XTrack 720-1b status","index":"12"},
			{"name":"STrack 720-1 status","index":"13"},
			{"name":"STrack 720-1b status","index":"14"},
			{"name":"N-port status","index":"15"}
		];
	}
	
	
	$scope.startDeviceAcu=function()
	{
		$scope.deviceAcu=
		{
			v1: 'v', //STrack Rack nro-1 status
			v2: 'v', //XTrack Rack nro-1 status
			v3: 'v', //ACU software status 
			v4: 'v', //PDU software status 
			v5: 'v', //D/C X/S - 1
			v6: 'v', //D/C X/S - 2
			v7: 'v', //D/C X/S - 1b
			v8: 'v', //D/C X/S - 2b 
			v9: 'v', //TR-D/C X/S - 1 
			v10: 'v' //TR-D/C X/S - 2
		};
		
		$scope.cDeviceAcu=
		[
			{"name":"STrack Rack nro-1 status","index":"1"},
			{"name":"XTrack Rack nro-1 status","index":"2"},
			{"name":"ACU software status","index":"3"},
			{"name":"PDU software status","index":"4"},
			{"name":"D/C X/S - 1","index":"5"},
			{"name":"D/C X/S - 2","index":"6"},
			{"name":"D/C X/S - 1b","index":"7"},
			{"name":"D/C X/S - 2b ","index":"8"},
			{"name":"TR-D/C X/S - 1","index":"9"},
			{"name":"TR-D/C X/S - 2","index":"10"}
		];
	}
	
	$scope.startDevice=function()
	{
		$scope.device=
		{
			v1: 'v', //RDR 1 status
			v2: 'v', //RDR 1 smcs
			v3: 'v', //RDR 2 status 
			v4: 'v', //RDR 2 smcs 
			v5: 'v', //Matrix Base Band status 
			v6: 'v', //Matrix Base Band  smcs  
			v7: 'v', //San 1 status 
			v8: 'v' //San 2 status 
		};
		
		$scope.cDevice=
		[
			{"name":"RDR 1 status","index":"1"},
			{"name":"RDR 1 smcs","index":"2"},
			{"name":"RDR 2 status","index":"3"},
			{"name":"RDR 2 smcs ","index":"4"},
			{"name":"Matrix Base Band status","index":"5"},
			{"name":"Matrix Base Band  smcs","index":"6"},
			{"name":"San 1 status","index":"7"},
			{"name":"San 2 status ","index":"8"}
		];
	}
	
	$scope.startRack2=function()
	{
		$scope.rack2=
		{
			v1: 'v', //Matrix720 status
			v2: 'v', //Matrix720 smcs
			v3: 'v', //DEM 1 status 
			v4: 'v', //DEM 1 smcs
			v5: 'v', //DEM 2 status 
			v6: 'v', //DEM 2 smcs 
			v7: 'v', //DEM 3 status 
			v8: 'v' //DEM 3 smcs 
		};
		
		$scope.cRack2=
		[
			{"name":"Matrix720 status","index":"1"},
			{"name":"Matrix720 smcs","index":"2"},
			{"name":"DEM 1 status ","index":"3"},
			{"name":"DEM 1 smcs","index":"4"},
			{"name":"DEM 2 status","index":"5"},
			{"name":"DEM 2 smcs ","index":"6"},
			{"name":"DEM 3 status","index":"7"},
			{"name":"DEM 3 smcs ","index":"8"}
		];
	}
	
	
	$scope.startStatus=function()
	{
		$scope.status=
		{
			v1: 'v', //MOD status
			v2: 'v', //MOD smcs
			v3: 'v', //GPS lock status 
			v4: 'v', //N-port status
			v5: 'v', //Server smcs 1 status 
			v6: 'v' //Server smcs 2 status
		};
		
		$scope.cStatus=
		[
			{"name":"MOD status","index":"1"},
			{"name":"MOD smcs","index":"2"},
			{"name":"GPS lock status","index":"3"},
			{"name":"N-port status","index":"4"},
			{"name":"Server smcs 1 status ","index":"5"},
			{"name":"Server smcs 2 status","index":"6"}
		];
	}
	
	$scope.startUps=function()
	{
		$scope.ups=
		{
			v1: 'v', //UPS 160 kv
			v2: 'v', //UPS 40 kv1
			v3: 'v'
		};
		
		$scope.cUps=
		[
			{"name":"UPS 160 kv","index":"1"},
			{"name":"UPS 40 kv1","index":"2"},
			{"name":"UPS 40 kv2","index":"3"}
		];
	}
	
	$scope.startPass=function()
	{
		$scope.pass=
		{
			v1: 'n', //Real time
			v2: 'n'
		};
	}
	
	$scope.startSend=function()
	{
		$scope.send=
		{
			v1: 'v', //ACU
			v2: 'v', //RDR 1
			v3: 'v'//RDR 2
		};
		
		$scope.cSend=
		[
			{"name":"ACU","index":"1"},
			{"name":"RDR 1","index":"2"},
			{"name":"RDR 2","index":"3"}
		];
	}
	
	$scope.startTaskSmcs=function()
	{
		$scope.taskSmcs={};
		$scope.taskSmcs.id="";
		$scope.taskSmcs.utc={};
		$scope.taskSmcs.utc.horas="";
		$scope.taskSmcs.utc.minutos="";
		$scope.taskSmcs.utc.segundos="";
		$scope.taskSmcs.local={};
		$scope.taskSmcs.local.horas="";
		$scope.taskSmcs.local.minutos="";
		$scope.taskSmcs.local.segundos="";	
		$scope.taskSmcs.paises="";
		for(o=1;o<=$scope.opcionesEstados;o++){$scope.taskSmcs["estados"+o]="";}
		$scope.taskSmcs.image="";
		$scope.taskSmcs.type="v";
	}
	
	$scope.startAll=function(t)
	{
		var turno=t?t:'n';
		if(turno==="s"){$scope.startTurno();}	
		$scope.startDeviceRF();
		$scope.startDeviceAcu();
		$scope.startDevice();
		$scope.startRack2();
		$scope.startStatus();
		$scope.startUps();	
		$scope.startPass();	
		$scope.startSend();
		$scope.startTaskSmcs();
	}
	
	
	$scope.validar=function(modulo)
	{
		if($scope.validarCabeceraTurno()===true)
		{
			var visor=true;
			var arreglo=$scope[modulo];
			var length=Object.keys(arreglo).length;
			
			for(i=1;i<=length;i++){if(arreglo["v"+i]==="v"){visor=false;}}
			
			if(visor===true)
			{
				$scope.guardar
				(
					{
						id:arreglo,
						turno: $scope.turno.turno,
						fecha: $scope.fecha.year+"-"+$scope.fecha.mes+"-"+$scope.fecha.dia,
						satelite: $scope.turno.satelite,
						accion:modulo
					}
				);
			}
			else{$scope.dialog.alert("Todos los campos deben estar chequeados");}		
		}
	}
	
	$scope.validar2=function(modulo)
	{
		if($scope.validarCabeceraTurno()===true && (!isNaN($scope.turno.pase) && $scope.turno.pase>0))
		{
			var visor=true;
			var arreglo=$scope.pass;
			if(arreglo["v1"]==="n"){visor=false;}
			
			if(visor===true)
			{
				$scope.guardar
				(
					{
						id:arreglo,
						fecha: $scope.fecha.year+"-"+$scope.fecha.mes+"-"+$scope.fecha.dia,
						satelite: $scope.turno.satelite,
						turno:$scope.turno.turno,
						pase:$scope.turno.pase,
						accion:modulo
					}
				);
			}
			else{$scope.dialog.alert("Debe seleccionar alguna opción entre : Real Time, Cu-Real time y Playback");}		
		}
	}
	
	$scope.validar3=function(modulo)
	{
		if($scope.validarCabeceraTurno2()===true && (!isNaN($scope.turno.pase) && $scope.turno.pase>0))
		{
			var visor=true;
			var arreglo=$scope[modulo];
			var length=Object.keys(arreglo).length;
			
			for(i=1;i<=length;i++){if(arreglo["v"+i]==="v"){visor=false;}}
			
			if(visor===true)
			{
				$scope.guardar
				(
					{
						id:arreglo,
						fecha: $scope.fecha.year+"-"+$scope.fecha.mes+"-"+$scope.fecha.dia,
						satelite: $scope.turno.satelite,
						turno:$scope.turno.turno,
						pase:$scope.turno.pase,
						accion:modulo
					}
				);
			}
			else{$scope.dialog.alert("Todos los campos deben estar chequeados");}		
		}
	}
	
	$scope.validar4=function(modulo)
	{
		if($scope.validarCabeceraTurno2()===true && (!isNaN($scope.turno.pase) && $scope.turno.pase>0))
		{
			var visor=false;
			var respuesta=$scope.validarTaskSmcs();
			if(respuesta==='ok')
			{
				$scope.guardar
				(
					{
						id:$scope.taskSmcs,
						fecha: $scope.fecha.year+"-"+$scope.fecha.mes+"-"+$scope.fecha.dia,
						satelite: $scope.turno.satelite,
						turno:$scope.turno.turno,
						pase:$scope.turno.pase,
						accion:modulo
					}
				);
			}
			else{$scope.dialog.alert(respuesta);}		
		}
	}
	
	$scope.validarTaskSmcs=function()
	{
		var respuesta='ok';
		if($scope.taskSmcs.id===""){respuesta="Task id no puede estar vacio"}
		if(respuesta==='ok' && $scope.taskSmcs.type==="v"){respuesta="Seleccione un task type"}
		
		var timeUtc=$scope.validarTime($scope.taskSmcs.utc,"utc");
		var timeLocal=$scope.validarTime($scope.taskSmcs.local,"local");
		
		if(respuesta==='ok' && timeUtc!=="ok"){respuesta=timeUtc;}
		if(respuesta==='ok' && timeLocal!=="ok"){respuesta=timeLocal;}
		if(respuesta==='ok'){respuesta=$scope.validarArea();}
		if(respuesta==='ok' && $scope.taskSmcs.image===""){respuesta="El campo image data time esta vacio";}
		return respuesta;
		
	}
	
	$scope.validarArea=function()
	{
		var respuesta="bad";
		
		if($scope.taskSmcs.paises===""){respuesta="Debe seleccionar un país";}
		if($scope.taskSmcs.paises==="Venezuela")
		{
			var todosEstados="";
			for(mn=1;mn<=$scope.opcionesEstados;mn++)
			{
				console.log("estados"+mn+" : "+$scope.taskSmcs["estados"+mn]);
				todosEstados=todosEstados+$scope.taskSmcs["estados"+mn];
			}
			var vacio=0;
			for(mn=1;mn<=$scope.opcionesEstados;mn++)
			{
				if(parseInt($scope.taskSmcs["estados"+mn])!==0 && $scope.taskSmcs["estados"+mn]!=="")
				{
					var cadena = $scope.taskSmcs["estados"+mn];
					var expresion = new RegExp(cadena,"g");
					var repeticion=todosEstados.match(expresion).length;
					if(repeticion>1)
					{
						respuesta="Existen estados repetidos";
					}
				}
				else{++vacio;}
			}
			
			if(vacio===$scope.opcionesEstados)
			{
				respuesta="Al seleccionar Venezuela en el campo país, debe elegir al menos un estado";
			}
		}
		return respuesta;
	}
	
	$scope.validarTime=function(time,tipo)
	{
		var respuesta="ok";
		
		if(time.horas==="" && respuesta==='ok')
		{
			respuesta="Capture Time "+tipo+" tiene las horas vacías";
		}
		
		if(time.minutos==="" && respuesta==='ok')
		{
			respuesta="Capture Time "+tipo+" tiene los minutos vacíos";
		}
		
		if(time.segundos===""  && respuesta==='ok')
		{
			respuesta="Capture Time  "+tipo+" tiene los segundos vacíos";
		}
		
		if(isNaN(time.horas) && respuesta==='ok')
		{
			respuesta="La hora en Capture Time  "+tipo+"  no es un número";
		}
		
		if(isNaN(time.minutos) && respuesta==='ok')
		{
			respuesta="Los minutos en Capture Time  "+tipo+"  no son números";
		}
		
		if(isNaN(time.segundos)  && respuesta==='ok')
		{
			respuesta="Los segundos en Capture Time  "+tipo+"  no son números";
		}
		
		if(time.horas<0 && respuesta==='ok')
		{
			respuesta="Capture Time  "+tipo+"  tiene las horas menores a cero (0)";
		}
		
		if(time.minutos<0  && respuesta==='ok')
		{
			respuesta="Capture Time  "+tipo+"  tiene los minutos menores a cero (0)";
		}
		
		if(time.segundos<0 && respuesta==='ok')
		{
			respuesta="Capture Time  "+tipo+"  tiene los segundos menores a cero (0)";
		}
		
		if(tipo==="utc")
		{
			if(time.horas>24 && respuesta==='ok')
			{
				respuesta="Capture Time  "+tipo+"  tiene una hora mayor a veinticuatro (24)";
			}
		}
		
		else
		{
			if(time.horas>12 && respuesta==='ok')
			{
				respuesta="Capture Time  "+tipo+"  tiene una hora mayor a doce(12)";
			}
		}
		
		if(time.minutos>59 && respuesta==='ok')
		{
			respuesta="Capture Time  "+tipo+"  tiene los minutos mayores a cincuentinueve (59)";
		}
		
		if(time.segundos>59 && respuesta==='ok')
		{
			respuesta="Capture Time  "+tipo+"  tiene los segundos  mayores a cincuentinueve (59)";
		}
		
		return respuesta;
	}
	
	$scope.guardar=function(info)
	{		
		$scope.cargando();
		$http.post("../Assets/crud.php",info)
			.then(function (data)
			{
				if(data.data==="ok")
				{
					$scope.clearDialog();
					$scope.startAll();
					$scope.dialog.alert("Registro guardado");
				}
				else
				{
					$scope.clearDialog();
					$scope.dialog.alert(data.data);
				}
			},function()
			{
				$scope.clearDialog();
				$scope.dialog.alert("No se pudo establecer conexión con el servidor");
			})					
	}
	
	
	
	$scope.validarCabeceraTurno=function()
	{				
		if($scope.turno.satelite>0)
		{				
			if(!isNaN($scope.fecha.year) && $scope.fecha.year>0)
			{				
				if(!isNaN($scope.fecha.mes) && $scope.fecha.mes>0 && $scope.fecha.mes<=12)
				{				
					if(!isNaN($scope.fecha.dia)  && $scope.fecha.dia>0 && $scope.fecha.dia<=31)
					{				
						if($scope.turno.turno!='v')
						{				
							return true;
						}  
						else{$scope.dialog.alert("No se ha seleccionado un turno");} 
					}  
					else{$scope.dialog.alert("El dia debe ser un numero mayor a cero y menor a trentaidos");}
				}  
				else{$scope.dialog.alert("El mes debe ser un numero mayor que cero y menor a trece");}
			}  
			else{$scope.dialog.alert("El año debe ser un numero");}
		}
		else{$scope.dialog.alert("Debe seleccionar un satelite");}
	}
	
	$scope.validarCabeceraTurno2=function()
	{				
		if($scope.turno.satelite>0)
		{				
			if(!isNaN($scope.fecha.year) && $scope.fecha.year>0)
			{				
				if(!isNaN($scope.fecha.mes) && $scope.fecha.mes>0 && $scope.fecha.mes<=12)
				{				
					if(!isNaN($scope.fecha.dia)  && $scope.fecha.dia>0 && $scope.fecha.dia<=31)
					{				
									
							return true;
						 
						
					}  
					else{$scope.dialog.alert("El dia debe ser un numero mayor a cero y menor a trentaidos");}
				}  
				else{$scope.dialog.alert("El mes debe ser un numero mayor que cero y menor a trece");}
			}  
			else{$scope.dialog.alert("El año debe ser un numero");}
		}
		else{$scope.dialog.alert("Debe seleccionar un satelite");}
	}
	
	$scope.startAll('s');
});