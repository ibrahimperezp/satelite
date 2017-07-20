app.service("validate", function() 
{
	//Filtra cual de las fases (pre,in,post) se debe mostrar
	this.showStage=function(current,stage)
	{
		if(stage==="pre" && current.pass && !current.modules.pre){return true;}
		if(stage==="in" && current.pass && current.modules.pre && !current.modules.in){return true;}
		if(stage==="post" && current.pass && current.modules.pre && current.modules.in && !current.modules.post){return true;}
		if(stage==="error" && current.pass && current.modules.pre && current.modules.in && current.modules.post){return true;}
	}
	
	//Valida que un pase se pueda seleccionar sólo si alguna de sus tres fases (pre,in,post) esta incompleta  
	this.canSelect=function(current)
	{
		//Si todas las fases estan completadas, no se puede seleccionar
		if(current.pre && current.in && current.post){return false;}
		return true;
	}
		
	//Comprueba que un valor este en el siguiente rango: value > moreThan && value <= maxValue
	this.range=function(value,moreThan,maxValue,name)
	{
		//El valor del argumento 'value' debe ser mayor a 'moreThan'
		moreThan=Number(moreThan);
		//El valor del argumento 'value' debe ser menor o igual a 'moreThan'
		maxValue=Number(maxValue);
		
		//Se verifica si la variable es un número
		if(isNaN(value) || value.length<=0){return "El valor de "+name+" debe ser un número";}
		
		//Si es un un número		
		if(value > maxValue || value <= moreThan)
		{
			return "El valor de "+name+" debe ser un número mayor que "+moreThan+" y menor o igual a "+maxValue;
		}		
		
		return 'ok';
	}
	
	
	//Comprueba que los valores de un arreglo sean distinto de 'v', que es el valor por defecto dado a mayoría de las variables de selección 
	this.checking=function(scope,module,limit)
	{	
		limit=limit?limit:100;			
		//Se selecciona el arreglo en el objeto scope de acuerdo al modulo pasado como argumento
		var arreglo=scope[module];		
		//Longitud del arreglo
		var length=Object.keys(arreglo).length;	
		//Se recorre el arreglo y verifica que su valor sea distinto de 'v'
		for(i=0;i<length;i++)
		{
			//Si existe un arreglo con el valor v + un número		
			if(arreglo["v"+i]!==undefined && i<limit)
			{
				if(this.logicalEmpty(arreglo["v"+i])){return "Faltan campos por chequear";}
			}
		}				
				
		return 'ok';
	}
	
	this.logicalEmpty=function(value)
	{
		var emptyValue=[0,'0','',' ','v',undefined,null];
		var le=emptyValue.length;
		for(e=0;e<le;e++)
		{
			if(value===emptyValue[e]  || typeof value==="array" || typeof value==="object"){return true;}			
		}
		return false;
	}
	
	//Comprueba si hay BLT
	this.BLT=function(scope)
	{		
		//Variable del estado del BLT
		var backup=scope.currentPass.backup;
		
		//En caso que el campo de BLT se haya dejado vacío o se haya seleccionado 'n' de NO
		if(backup==='n' || backup==='v'){return false;}
		
		return true;
	}
	
	//Comprueba si un valor no esta vacío, no sea 0, no sea false, no es solo string de espacios no es undefined
	this.validString=function(value)
	{
		//Se comprueba si value es de tipo string
		var type=typeof value;
		type=type.toLowerCase();
		
		if(!type==="string"){return false;}
		if(value==="" || value===" "){return false;}
		if(!isNaN(value)){return false;}
		if((value.trim)==="" || (value.trim)===" "){return false;}
		
		return true;		
	}
	
	
	this.validDate=function(value)
	{	
		//Se comprueba que sea un string válido	
		if(!this.validString(value)){return false;}
		//Se comprueba que su longitud sea exacta de 10 caracteres
		if(value.length!==10){return false;}
		//Dividir en partes el string, deberia quedar primero el año, segundo el mes y último el día
		
		var parts=value.split("-");
		//Se comprueba que la longitud de año sea exacta de 4 caracteres
		if(parts[0].length!==4){return false;}
		//Se comprueba que año sea un número y sea mayor que cero
		if(isNaN(parts[0]) || parts[0]<=0){return false;}
		//Se comprueba que la longitud de mes sea exacta de 4 caracteres
		if(parts[1].length!==2){return false;}
		//Se comprueba que mes sea un número y sea mayor que cero
		if(isNaN(parts[1]) || parts[1]<=0){return false;}
		//Se comprueba que la longitud de día sea exacta de 4 caracteres
		if(parts[1].length!==2){return false;}
		//Se comprueba que día sea un número y sea mayor que cero
		if(isNaN(parts[1]) || parts[1]<=0){return false;}
		
		return true;
	}
	
	this.time=function(scope,variable,type,position)
	{
		//console.log(type);
		var range=this.range;
		var minus=position>1?1:0;
		var stage=function(position)
		{
			
			if(position===0){return "UTC Start";}
			else if(position===2){return "UTC End";}
			else if(position===1){return "Local Start";}
			else if(position===3){return "Local End";}
		}
		var name=" en Capture Time "+stage(position);
		var from=-1;
		var to=23;	
		var section="hour";
		var translate="hora ";
		
		for(o=0;o<=3;o++)
		{
			if(o===0){if(type==="local"){from=0;to=12;}}
			else if(o===1){from=-1;to=59;section="minute";translate="minuto ";}
			else if(o===2){section="second";translate="segundo ";}			
			else if(o===3 && type==="local")
			{				
				var time=scope[variable]['meridium'+minus];
				if(time!="am" && time!="pm"){return "El meridiano en "+stage(position)+" esta vacío";}
				else{return "ok";}
			}
			else{return "ok";}		
			
			var time=range(scope[variable][section+position],from,to,translate+name);
			if(time!=='ok'){return time;}
		}		
	}
	
	
	this.times=function(scope,module)
	{
		for(t=0;t<=3;t++)
		{
			var name="local";
			if(t===0 || t===2){name="utc";}
			
			var status=this.time(scope,module,name,t);
			if(status!=="ok"){return status;}
		}
		return "ok";
	}
	
	
	this.location=function(scope,module)
	{
		var once=true;
		var noRepeat=this.noRepeat;
		var subAreas=[];
		var areas=[];
		var area=scope[module].area;
		var le=area.length;
		for(a=0;a<le;a++)
		{
			if(!this.logicalEmpty(area[a]))
			{
				areas.push(area[a]);
				var next=true;
				if(!noRepeat(areas,area[a])){next=false;}
				
				if(scope[module].subArea[a] && next && area[a]==="Venezuela" && once)
				{
					once=false;;
					var subArea=scope[module].subArea[a];
					var leng=subArea.length;
					for(s=0;s<leng;s++)
					{
						if(!this.logicalEmpty(subArea[s]))
						{
							subAreas.push(subArea[s]);
							if(!noRepeat(subAreas,subArea[s])){return false;}
						}
					}	
				}
			}
		}
				
		if(next){return [areas,subAreas];	}
		else {return false;	}
	}
	
	
	
	this.noRepeat=function(arr,value)
	{
		var regex = new RegExp(value,"g");
		arr=arr.join();
		var count=arr.match(regex);
		count=count.length;
		
		if(count!==1){return false;}		
		return true;
	}
	
	
	this.message=function(scope)
	{
		scope.message=
		{
			notFound:"No se pudo establecer conexión con el servidor",
			moduleDisabled: "No se puede seleccionar un prepase completado al 100%, si desea modificarlo, dirigase a la seccion editar",
			savePassSuccessful:"Pase guardado"
		}
	}
	
	
	
	
	
	
	
	
});