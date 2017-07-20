app.service("getData", function() 
{
	//Realiza una peticion http
	this.request=function(url,data,action,args)
	{
		var postCrud=this.postCrud;
		//Variable con http de angular
		var http=this.http;
		//variable con action que es la acción a realizar con la respuesta recibida de esta petición
		var action=action;
		var scope=this.scope;
		//si no se da un argmento a arguments, se inicializa en un string vacío
		args=args?args:""; 
		//si no se da un argmento a action, se inicializa en una función vacía
		action=action?action:function(){};
		
		//url: dirección a la cual hacer la petición
		//data: información a enviar en formato de objeto
		http.post(url,data).then(function(response){action(scope,response,args);});
		
	}
	
	
	//Lee los satelites para crear una lista tipo select con ellos
	this.satellites=function()
	{	
		var url=this.shortcut.crud;
		var data={module:"satellite",action:"read"};
		var action=this.setData.satellites;
		
		this.request(url,data,action);	
	}
	
	
	//Obtener los paises a mostrar en task rdr pre
	this.countries=function()
	{
		var url=this.shortcut.countries;
		var data={};
		var action=this.setData.countries;
		
		this.request(url,data,action);
	}
		
	
	//Obtener los estados a mostrar en task rdr pre
	this.states=function()
	{
		var url=this.shortcut.states;
		var data={};
		var action=this.setData.states;
		
		this.request(url,data,action);
	}
	
	
	//Busca las actividad más antigua sin completar un 100%
	this.uncompletedActivity=function(date)
	{
		//En caso que ya se haya seleccionado una actividad, esta se cancela
		this.setData.cancelActivity();
		//Si no se pasa el argumento a esta función, se le da un valor predeterminado de un string vacío
		date=date?date:"";
		var url=this.shortcut.crud;
		var data={module:"activity",date:date,action:"read"};
		var action=this.setData.activity;
		
		this.request(url,data,action);
	}
	
	
	//Selecciona una actividad
	this.selectActivity=function(id,complete,modules,nro,date)
	{
		var url=this.shortcut.crud;
		var data={module:"activity",action:"select",id:id};
		var action=this.setData.pass;
		var scope=this.scope;
		var args={modules:modules,complete:complete,date:date,nro:nro}
		
		this.request(url,data,action,args);
	}
	

	
	//Guardar/Edita/Borra
	this.crud=function(module,action,id)
	{
		id=id?id:"";
		var setData=this.setData;
		var scope=this.scope;		
		var url=this.shortcut.crud;
		var data=setData.settings(scope,module,action,id);/*
		console.log("data");
		console.log(data);*/
		var action=this.postCrud;
		
		this.request(url,data,action);		
		
		this.isActivityComplete(scope,url);
	}
	
	
	//Comprueba si la actividad esta completa a un 100%
	this.isActivityComplete=function(scope,url)
	{
		if(location.href.match(/register/g)!==null || location.href.match(/edit/g)!==null)
		{
			var data={pass:scope.currentPass.id,module:'activity',action:'complete'};			
			this.request(url,data);
		}		
	}
	
	
	//Posibles acciones a realizar luego de un request
	this.postCrud=function(scope,response,args)
	{
		var scope=scope;
		var este=scope.getData;
		var module=scope.currentModule.module;
		var data=response.data[1];
		var cancel=scope.normalize.menu;
		var modules=scope.settingsDeclareInitialize.activityModules();
		var status=response.data[0];
		
		if(status==='ok')
		{			
			scope.dialog.alert(data);
				
			if(module==='satellite'){este.satellites();}	
			
			else if(module==='activity'){}
			
			else if(modules.indexOf(module>=0))
			{
				if(location.href.match(/register/g)!==null){cancel();}
				scope.currentPass.modules[module]=true;	
			}
			
			else{console.log(module+" has no success function");}					
		}
		
		else{scope.dialog.alert(response.data);}	
		
	}
	
	
	//Busca una actividad
	this.searchActivity=function()
	{
		var date=document.getElementById("searchDate").value;
		var url=this.shortcut.crud;
		var data={module:"activity",date:date,action:"read"};		
		var action=this.setData.searchActivity;
		var scope=this.scope;
		var args={date:date};	
	
		this.request(url,data,action,args);	
			
		if(date=="" || date==" ")
		{
			scope.dialog.alert("Se buscará con la fecha del primer pase sin terminar");
			//Quitar automaticamente el mensaje
			var clear=function(scope){scope.dialog.clear();}
			this.timeout(function(){clear(scope)}, 3000);
		}
		
	}
	
	
	
	//Seleccionar una actividad en edit	
	this.selectActivityComplete=function(id,complete,modules,nro,date)
	{
		var scope=this.scope;
		scope.dialog.loading()
		
		this.selectActivity(id,complete,modules,nro,date);
			
		var url=this.shortcut.crud;
			
		var modules=["send","acuSoftwarePre","power","device","deviceAcu","deviceRF","rack2","status","ups","demulatorPre","acuSoftwareIn","taskRdrIn","demulatorIn","track","acuSoftwarePost","passPost","raw1","raw2","taskRdrPre","taskSmcs"];
		
		var edit=modules.length;
		
		for(mod=0;mod<edit;mod++)
		{
			var actualModule=modules[mod];
			var upper=this.normalize.upperFirst(actualModule);		
			var data={module:actualModule,action:"select",id:id};
			var action=this.setData["select"+upper];
			
			this.request(url,data,action);
		}
		
		scope.dialog.clear()
	}
	
	

	
	this.query=function()
	{
		var scope=this.scope;
		
		if(document.getElementById("queryStart").value=="" || document.getElementById("queryEnd").value=="" || document.getElementById("queryStart").value=="0000-00-00" || document.getElementById("queryEnd").value=="0000-00-00")
		{scope.dialog.alert("Debe seleccionar un fecha de inicio y una de fin");return false;}
		
		if(scope.query.type==""){scope.dialog.alert("Debe seleccionar un tipo de busqueda");return false;}
		
		if(scope.activity.satellite==""){scope.dialog.alert("Debe seleccionar un satélite");return false;}
		
		var url=this.shortcut.crud;
		var data="";
		var action=this.setData.queryMbps;
		
		
		if(scope.query.type==="mbps")
		{
			data=
			{
				module:"taskRdrIn",
				start:document.getElementById("queryStart").value,
				end:document.getElementById("queryEnd").value,
				satellite:scope.activity.satellite,
				action:"searchCh"
			}
		}
		
		this.request(url,data,action);
	}	
	
	
	this.scope;
	this.http;
	this.shortcut;
	this.timeout;
	this.setData;
	this.normalize;
	
	this.init=function(scope,http,timeout,setData,normalize)
	{
		this.scope=scope;
		this.http=http;
		this.shortcut=scope.route.shortcut;
		this.timeout=timeout;
		this.setData=setData;
		this.normalize=normalize;
	}
});