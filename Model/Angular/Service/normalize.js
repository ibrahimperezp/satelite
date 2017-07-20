app.service("normalize", function() 
{
	//Completa con ceros un número en caso que sea de un sólo dígito	y mayor o igual cero, en caso contrario
	//retorna el valor original pasado como argumento
	//'n' : valor a comprobar
	//'zeroes' : cantidad de ceros a añadir, por defecto es 1
	this.fillZero=function(n,zeroes)
	{
		//Si no se pasó este argumento, se le da el valor de 1 por defecto
		zeroes=zeroes?zeroes:1;
		//Comprueba que sea un número
		if(isNaN(n) || isNaN(zeroes)){return n;}
		//Comprueba que sea un número mayor a cero y menor de diez
		if(n<0 || n>9){return n;}
		//Variable que contendrá los ceros a añadir
		var add="";
		//Añadir los ceros tantos como sea la cantidad del argumento 'zeroes'
		for(z=1;z<=zeroes;z++){add+="0";}
		//Retorna el valor como un dato de tipo string para que no se omitan los ceros
		return add+String(n);
	}
	
	
	//Arregla los valores de las fechas obtenidas del objeto fecha
	//type: si es mes, año o dia
	//value: valor a normalizar
	this.date=function(type,value)
	{
		//Se le suma 1 si es mes porque el objeto date representa cada mes con un numero por debajo, diciembre es 11
		if(type==="month"){	value+=1;}		
		//Se le llena con un cero en caso que la cifra sea de un sólo digito
		value=this.fillZero(value);
		return value;		
	}
	
	
	//Oculta o muestra el menu para guardar/editar un módulo
	this.menu=function()
	{
		if(!document.getElementById("show")){return false;}
		else if(document.getElementById("show").checked===true){document.getElementById("show").checked=false;}
		else{document.getElementById("show").checked=true;}
	}
	
	
	//La url al cargar no debe tener ningun numeral
	this.clearUrl=function()
	{
		var url=location.href;
		if(url.match(/#/g)!==null)
		{
			var split=url.split("#");
			location.href=split[0];
		}
	}
	
	
	//codifica direcciones para luego decodificar
	this.encode=function(string,dir)
	{
		if(string[dir])
		{
			var encode=string[dir].replace(/\//g, "-");
			return encode;
		}
	}
	
	
	//Retorna el nombre formal de un módulo
	this.name=function(name)
	{
		if(name==="send"){return "Send Guide File";}
		if(name==="acuSoftwarePre" || name==="acuSoftwareIn" || name==="acuSoftwarePost"){return "Acu Software";}
		if(name==="power"){return "Power";}
		if(name==="device"){return "Device";}
		if(name==="deviceAcu"){return "Device Acu";}
		if(name==="deviceRF"){return "Device RF";}
		if(name==="rack2"){return "Rack #2";}
		if(name==="status"){return "Status";}
		if(name==="ups"){return "Status Ups Room";}
		if(name==="taskRdrPre" || name==="taskRdrIn"){return "Task List RDR";}
		if(name==="taskSmcs"){return "Task List SMCS";}
		if(name==="demulatorPre" || name==="demulatorIn"){return "Demulator";}
		if(name==="passPre" || name==="passPost"){return "Pass Mode";}
		if(name==="track"){return "Track Receiver";}
		if(name==="raw1"){return "Data Raw 1";}
		if(name==="raw2"){return "Data Raw 2";}

		return "Desconocido";
	}
	
	
	//Toma un string y lo regresa con la primera letra en mayúscula
	this.upperFirst=function(string)
	{
		string = string[0].toUpperCase() + string.substr(1);
		return string;
	}
	
	
	
	
	this.month=function(m)
	{
		
		var k=(m-0);
		if(k==1){return "Enero";}
		if(k==2){return "Febrero";}
		if(k==3){return "Marzo";}
		if(k==4){return "Abril";}
		if(k==5){return "Mayo";}
		if(k==6){return "Junio";}
		if(k==7){return "Julio";}
		if(k==8){return "Agosto";}
		if(k==9){return "Septiembre";}
		if(k==10){return "Octubre";}
		if(k==11){return "Noviembre";}
		if(k==12){return "Diciembre";}
		return "este es el mes ";
	}
	
	
	
	
	this.opener=function()
	{
		window.open("http://localhost/sat/empty.php",true,true,true);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	
	
	
	
	this.serie1=[];
	this.serie2=[];
	this.categorias=[];
	
	this.addCategory=function(mes,year)
	{
		//Categorias
		console.log(mes);
		var c=document.getElementById("categorias");
		var ca=c.value;
		
		var m=this.month(mes);
		console.log(m);
		
		if(!ca==""){c.value=c.value+',';}
		c.value=c.value+'"'+m+'-'+year+'"';
	}
	
	this.addSeries=function(ch1,ch2)
	{
		ch1-=0;
		ch2-=0;
		
		//Categorias
		var c=document.getElementById("series");
		var ca=c.value;
		
		
		
		
		
		var r="{name: 'Tokyo', data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4] }";
	}
	
	*/
	
	
});