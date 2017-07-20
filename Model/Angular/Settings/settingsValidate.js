app.service("settingsValidate", function() 
{
	this.config=function(scope)
	{
		this.scope=scope;
	}
	
	this.toFormat=["power","device","deviceRF","rack2","status","ups","passPost","demulatorPre"];
	
	this.send=function(scope,validate,module)
	{
		if(scope.currentPass.blt)
		{
			if(scope[module].v0==="v"){return "Falta un campo por chequear";}
			else{return "ok";}
		}
		else
		{
			var message=validate.checking(scope,module);
			if(message!=="ok"){return message;}			
			return "ok"
		}
	}
	
	this.scope={}
	
	this.satellite=function(scope,validate)
	{
		var satellite=scope.satellite.name;
		
		if(validate.validString(satellite))
		{
			if(satellite.length>4){return "ok";}
			else{return "El nombre del satélite debe tener al menos 5 caracteres";}
		}
		else{return "Debe ingresar un nombre válido";}
	}
	
	this.acuSoftwarePre=function(scope,validate,module)
	{
		//Se selecciona el valor en el arreglo $scope
		var value=scope[module]["v0"];
		//Valor mayor que, para la función range 
		var moreThan=0;
		//Valor menor o igual que, para la función range
		var maxValue=90;
		//Valor nombre, para la función range
		var name="Max El";
		
		//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante		
		return validate.range(value,moreThan,maxValue,name);
	}
	
	this.deviceAcu=function(scope,validate,module)
	{
		var check=validate.checking(scope,module,12)
		if(check==="ok")
		{
			var id=	validate.range(scope.deviceAcu.v12,0,100,"Humidity");
			if(id!=="ok"){return id;}
			
			var id=	validate.range(scope.deviceAcu.v13,0,100,"Temperature");
			if(id!=="ok"){return id;}
			
			return "ok";
		}
		else{return check;}
	}
	
	this.track=function(scope,validate,module)
	{
		for(var b=0;b<6;b++)
		{
			if(b===0 || b===2 || b===4)
			{
				if(scope[module]["v"+b]!=="s" && scope[module]["v"+b]!=="n")
				{return "Faltan campos por chequear";}
			}
		}
		
	
		var status=	validate.range(scope[module].v6,-50,50,"AGC Bolt s");
		if(status!=="ok"){return status}
		
		if(!scope.currentPass.blt)
		{
			var status=	validate.range(scope[module].v7,-50,50,"AGC Bolt x");
			if(status!=="ok"){return status}
		}
		
		var status=	validate.range(scope[module].v8,-100,100,"Input power s");
		if(status!=="ok"){return status}
		
		if(!scope.currentPass.blt)
		{
			var status=	validate.range(scope[module].v9,-100,100,"Input power x");
			if(status!=="ok"){return status}
		}
		
		return "ok";
	
	}
	
	this.passPre=function(scope)
	{
		if(scope.activity.v0==='v'){return "Seleccione un Pass Mode";}
		return "ok";
	}
	
	this.taskRdrPre=function(scope,validate,module)
	{
		//Valor mayor que, para la función range 
		var moreThan=0;
		//Valor menor o igual que, para la función range
		var maxValue=90;
		
		//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante	
		var id=	validate.range(scope.taskRdrPre.id,10000000000000,9999999999999999,"Task Id");
		if(id!=="ok"){return "El task id estar entre 14 y 16 dígitos numéricos";}
		
		
		var orbit=	validate.range(scope.taskRdrPre.orbit,0,99999,"Orbit Id");
		if(orbit!=="ok"){return orbit;}
		
		var times=validate.times(scope,module);		
		if(times!=="ok"){return times;}
		
		//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante	
		var image=validate.range(scope.taskRdrPre.image,0,1500,"Image Data");
		if(image!=="ok"){return image;}
		
		var areas=validate.location(scope,module);
		if(areas===false){return "Existe un error en la selección de áreas, puede que hayan países o estados repetidos";}
		
		return "ok";
	}
	
	this.taskSmcs=function(scope,validate,module)
	{
		var arr=scope[module];
		//Valor mayor que, para la función range 
		var moreThan=0;
		//Valor menor o igual que, para la función range
		var maxValue=90;
		
		//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante	
		
		var id=	validate.range(arr.id,10000000000000,9999999999999999,"Task Id");
		if(id!=="ok"){return "El task id debe estar entre 14 y 16 dígitos numéricos";}
		
		
		if(arr.type!=="r" && arr.type!=="l"){return "Debe seleccionar un Task Type";}
		
		if(scope.currentPass.blt)
		{
			var orbit=	validate.range(arr.orbit,0,99999,"Orbit Id");
			if(orbit!=="ok"){return orbit;}
		}
		
		var times=validate.times(scope,module);		
		if(times!=="ok"){return times;}
		
		return "ok";
	}
	
	this.activity=function(scope,validate)
	{	
		//Asignar el campo de la fecha a la variable en angular, se hace de esta manera porque angular
		//no lee bien el valor del input de tipo date
		scope.activity.activityDate=document.getElementById('activityDate').value;
		//Se verifica que se haya seleccionado un satelite
		if(isNaN(scope.activity.satellite) || scope.activity.satellite<=0){return "Seleccione un satelite";}	
		//Se verifica que se haya seleccionado una fecha válida
		if(!validate.validDate(scope.activity.activityDate)){return "Seleccione una fecha válida";}
		//Se verifica que se haya seleccionado un turno		
		if(scope.activity.turn==='v'){return "Seleccione un turno";}  
		//Se verifica que se haya seleccionado un nro de pase
		if(isNaN(scope.activity.pass) || scope.activity.pass<=0){return "Seleccione un Nro de pase";}
					
		return this.passPre(scope);	
	}	
	
	this.acuSoftwareIn=function(scope,validate,module)
	{
		var arr=scope[module];
		
		if(!scope.currentPass.blt)
		{
			var status=	validate.range(arr["v"+0],-11,20,"Max° El UAGC in X");
			if(status!=="ok"){return status;}
		}
		
		var status=	validate.range(arr["v"+1],-11,20,"Max° El UAGC in S");
		if(status!=="ok"){return status;}
		
		var status=	validate.range(arr["v"+2],-1,90,"S tracking start° El");
		if(status!=="ok"){return status;}
		
		var status=	validate.range(arr["v"+3],-11,20,"S tracking start UAGC");
		if(status!=="ok"){return status;}
		
		if(!scope.currentPass.blt)
		{
			var status=	validate.range(arr["v"+4],-1,90,"X tracking start° El");
			if(status!=="ok"){return status;}
			
			var status=	validate.range(arr["v"+5],-11,20,"X tracking start UAGC");
			if(status!=="ok"){return status;}
		}
		
		return "ok";
	}
	
	this.demulatorIn=function(scope,validate,module)
	{
		var check=validate.checking(scope,module,3);
		if(check!=="ok"){return check;}
		
		var arr=scope[module];
		for(c=0;c<3;c++)
		{
			//Valor mayor que, para la función range 
			var moreThan=0;
			//Valor menor o igual que, para la función range
			var maxValue=90;
			
			//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante				
			var status=	validate.range(arr["v"+(c+3)],moreThan,maxValue,"total "+(c+1));
			if(status!=="ok"){return status;}
		}
		
		return "ok";
	}
	
	this.taskRdrIn=function(scope,validate,module)
	{
		var arr=scope[module];
		for(c=0;c<2;c++)
		{
			//Valor mayor que, para la función range 
			var moreThan=0;
			//Valor menor o igual que, para la función range
			var maxValue=1000;
			
			//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante				
			var status=	validate.range(arr["v"+c],moreThan,maxValue,"CH "+(c+1)+" RATE ");
			if(status!=="ok"){return status;}
		}
		
		return "ok";
	}
	
	this.raw1=function(scope,validate,module)
	{
		var arr=scope[module];
		
		for(c=0;c<=9;c++)
		{
			//Valor mayor que, para la función range 
			var moreThan=0;
			//Valor menor o igual que, para la función range
			var maxValue=199;
			
			//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante				
			var status=	validate.range(arr["v"+c],moreThan,maxValue,scope["nRaw1"][c].title);
			if(status!=="ok"){return status;}
		}
		
		
		var status=	validate.range(arr["v"+10],0,49,scope["nRaw1"][10].title);
		if(status!=="ok"){return status;}
		
		var status=	validate.range(arr["v"+11],0,399,scope["nRaw1"][11].title);
		if(status!=="ok"){return status;}
		
		var status=	validate.range(arr["v"+12],0,99,scope["nRaw1"][12].title);
		if(status!=="ok"){return status;}		
		
		if(arr['v'+13]==0){return "Debe seleccionar una opción en Transmision to IPS";}
		
		return "ok";
	}
	
	this.raw2=this.raw1;
	
	this.acuSoftwarePost=function(scope,validate,module)
	{
		if(scope[module].v0==="v"){return "Debe seleccionar una opción en Return to zero";}
		
		//Valor mayor que, para la función range 
		var moreThan=0;
		//Valor menor o igual que, para la función range
		var maxValue=1000;
		
		//Verificar que el campo  Max El tenga una rango de grados válido y retornar el mensaje resultante				
		var status=	validate.range(scope[module].record,moreThan,maxValue,"Record");
		if(status!=="ok"){return status;}
		return "ok";
	}
	
	this.init=function(scope,validate,module)
	{
		//mensaje a mostrar
		var message="";
		//Si son sólo de opciones binarias
		if(this.toFormat.indexOf(module)>-1){message=validate.checking(scope,module);}
		//En caso contrario		
		else{message=this[module](scope,validate,module);}
		//Mostrar Mensaje
		return message;
	}
});