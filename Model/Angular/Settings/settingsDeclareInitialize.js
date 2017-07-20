app.service("settingsDeclareInitialize", function() 
{
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////                            ////////////////////////////////////
	/////////////////////////////////    Variables del Script    /////////////////////////////////////
	////////////////////////////////                            //////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	//Módulos de pre pase
	this.pre=["send","acuSoftwarePre","power","device","deviceAcu","deviceRF","rack2","status","ups","taskRdrPre","taskSmcs","passPre","demulatorPre"];
	
	//Módulos de durante ase
	this.in=["acuSoftwareIn","taskRdrIn","demulatorIn","track"];
	
	//Módulos post pase
	this.post=["acuSoftwarePost","passPost","raw1","raw2"];
	
	this.pushing=function(a,b)
	{
		var len=b.length;
		for(p=0;p<len;p++)
		{
			a.push(b[p]);
		}
		return a;
	}
	
	//Unión de pre,in y post
	this.activityModules=function()
	{
		var arr=[];
		arr=this.pushing(arr,this.pre);
		arr=this.pushing(arr,this.in);
		arr=this.pushing(arr,this.post);
		return arr;
	}
	
	
	
	this.additional=["currentPass","activity","stages","currentModule"];
	
	this.complete=function()
	{
		var arr=this.activityModules();
		arr=this.pushing(arr,this.additional);
		return arr;
	}
	
	//Variables globales internas del script
	this.globals=
	{
		titleProperyNameConvention:"n",
		variableNameConvention:"v",
		initialString:"v",
		emptyString:"",
		initialNumber:0,
		variableIterationStart:0,
		namesToDeclareInicialize:this.complete()
	}
	
	//Variables a inicializar únicamente con nombres y valores iterativos
	this.toFormat=["send","power","device","deviceAcu","deviceRF","rack2","status","ups","acuSoftwareIn","taskRdrIn","demulatorIn","passPost","raw1","raw2","demulatorPre","track"];
	
	//Variables a inicializar en valor 'v', es decir, vacío lógico
	this.logical=["send","power","rack2","demulatorPre","deviceRF","track"];
	
	//Variables a inicializar en valor '', es decir, string vacío 
	this.empty=["acuSoftwareIn"];
	
	//Variables a inicializar en valor cero
	this.zero=["acuSoftwarePre","device","deviceAcu","status","ups","taskRdrPre","taskSmcs","demulatorIn","taskRdrIn","acuSoftwarePost","passPost","raw1","raw2","passPre","currentPass","activity","stages"];
	
	//Nombres de variables que harán uso de la creación iterativa de variables
	this.genericProperties=
	{
		power:["Emergency Button","Titl","Azimuth","Elevation","Antenna Position"],
		send:["ACU","RDR 1","RDR 2"],
		passPre:["Real time","Cu-real time","Playback","BLT"],
		device:["RDR 1 status","RDR 1 smcs","RDR 2 status","RDR 2 smcs","Matrix base band status","Matrix base band smcs","San  1 status","San 2 status"],
		deviceAcu:["STrack Rack status","XTrack Rack status","ACU software status","PDU software status","D/C X/S - 1","D/C X/S - 2","D/C X/S - 1b","D/C X/S - 2b ","TR-D/C X/S - 1","TR-D/C X/S - 2","LNA(A-B) X-RHCP","LNA(A-B) S-LHCP","Humidity","Temperature"],
		deviceRF:["XData 720-1 status","XData 720-1 smcs","XData 720-2 status","XData 720-2 smcs","XData 720-1b status","XData 720-1b smcs","XData 720-2b status","XData 720-2b smcs","Test 720-s status","Test 720-s smcs","XTrack 720-1 status","XTrack 720-1b status","STrack 720-1 status","STrack 720-1b status","N-port status"],
		rack2:["Matrix720 status","Matrix720 smcs","DEM 1 status ","DEM 1 smcs","DEM 2 status","DEM 2 smcs ","DEM 3 status","DEM 3 smcs "],
		status:["MOD status","MOD smcs","GPS lock status","N-port status","Server smcs 1 status ","Server smcs 2 status"],
		ups:["UPS 160 kv","UPS 40 kv1","UPS 40 kv2"],
		track:["Dpu Working s","Dpu Working  x","Dtr Lock s","Dtr Lock x","Dem Lock s","Dem Lock x","AGC Bolt s","AGC Bolt x","Input Power s","Input Power x"],
		acuSoftwareIn:["Max° El UAGC in X","Max° El UAGC in S ","S tracking start ° El","S tracking start UAGC","X tracking start ° El","X tracking start UAGC "],
		taskRdrIn:["CH1 Rate mbps","CH2 Rate mbps"],
		demulatorIn:["Code syn","Carrier Capture ","Frame Syn I","Total Eb/ N0 1","Total Eb/ N0 2","Total Eb/ N0 3 "],
		passPost:["Failed / Efective Task"],
		raw1:["Files Received CH1","Files CH1 Files 1","Files CH1 Files 2","Files CH1 Files 3","Files CH1 Files 4","Files Received CH2","Files CH2 Files 1","Files CH2 Files 2","Files CH2 Files 3","Files CH2 Files 4","Data size GB","Total Files ","Total Data size","Transmision to IPS"],
		raw2:["Files Received CH1","Files CH1 Files 1","Files CH1 Files 2","Files CH1 Files 3","Files CH1 Files 4","Files Received CH2","Files CH2 Files 1","Files CH2 Files 2","Files CH2 Files 3","Files CH2 Files 4","Data size GB","Total Files ","Total Data size","Transmision to IPS"],
		demulatorPre:["MacroConf Dem","Recieve MacroConf SMCS"],
		other:["Re-Transmision to IPS","Backup SCC"]
		
	}
	
	this.genericField=function(scope)
	{
		var modules=this.complete();
		var l=modules.length;
		for(var m=0;m<l;m++)
		{
			scope[modules[m]].notes="estas son las notas";
		}
	}
	
	this.stages=function(scope)
	{
		scope.stages=
		{
			pre:this.pre,
			in:this.in,
			post:this.post,
			complete:this.activityModules()
		}
	}
	
	
	this.settings={}
	
	
	this.config=function(declareInitialize)
	{
		//Valor de inicio en un rango, definido por una variable global, normalmente cero (0)
		var start=this.globals.variableIterationStart;
		//arreglo con los nombres que se convertiran en un objeto con propiedades en un formato genérico
		var generic=this.genericProperties;
		//Objeto que tendrá los valores de formato genérico
		var newObject={};
		//Arreglo con los valores del arreglo 'generic'
		var properties=Object.keys(generic);	
		//Longitud del arreglo'generic'
		var length=properties.length;	
		//Recorrer todos los nombres de propiedades genéricas para convertirlos en objetos y añadirlos en 'newObject'
		for(var i=0;i<length;i++){declareInitialize.setGenericValues(generic,newObject,properties[i],start);}
		//Retornar el nuevo objeto con todas las propiedades
		return newObject;
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////                            ////////////////////////////////////
	/////////////////////////////////     Variables axuliares    /////////////////////////////////////
	////////////////////////////////                            //////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	this.time=function(scope,declareInitialize)
	{
		scope.time={};
		scope.time=
		{
			_12h:declareInitialize.rangeNumbers(1,12),
			_24h:declareInitialize.rangeNumbers(0,23),
			_60:declareInitialize.rangeNumbers(0,59)
		}
	}
	
	this.dateTime=function(scope,declareInitialize)
	{
		declareInitialize.iteratePropery(scope,'meridium','taskSmcs',0,1,"");
		declareInitialize.iteratePropery(scope,'minute','taskSmcs',0,3,"");
		declareInitialize.iteratePropery(scope,'second','taskSmcs',0,3,"");
		declareInitialize.iteratePropery(scope,'hour','taskSmcs',0,3,"");
		
		declareInitialize.iteratePropery(scope,'meridium','taskRdrPre',0,1,"");
		declareInitialize.iteratePropery(scope,'minute','taskRdrPre',0,3,"");
		declareInitialize.iteratePropery(scope,'second','taskRdrPre',0,3,"");
		declareInitialize.iteratePropery(scope,'hour','taskRdrPre',0,3,"");
	}
	
	this.satellite=function(scope)
	{
		scope.satellite=
		{
			name:"",
			satellites:[],
			delete:""
		}
	}
	
	//////////////////////////////////  Funciones axiliares  ////////////////////////////////////////
	
	this.defineInitial=function(name)
	{
		if(this.zero.indexOf(name)>=0){return this.globals.initialNumber;}
		if(this.empty.indexOf(name)>=0){return this.globals.emptyString;}
		if(this.logical.indexOf(name)>=0){return this.globals.initialString;}
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////                         ///////////////////////////////////////
	/////////////////////////////////  Variables de Actividad ////////////////////////////////////////
	////////////////////////////////                         /////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	this.activity=function(scope,module)
	{
		//Alias de otras propiedades
		var local=this.settings[module];
		var globals=this.globals;
		
		scope.activity=
		{
			turn: globals.initialString,
			nombreTurno: "",
			satellite:'',
			satellites:[],
			nombreSatelite:"",
			passes:[1,2,3,4],
			pass:'',
			activityDate:'',
			records:[],
			v0:"v"
		};
	}
	
	
	this.currentPass=function(scope)
	{
		scope.currentPass=
		{
			blt: false,
			id:"",
			pass: false ,
			modules:"",
			complete:'' ,
			nro:0,
			date:"0000-00-00"
		};
	}
	
	this.currentModule=function(scope)
	{
		scope.currentModule=
		{
			title: "",
			module: ""
		};
	}
	
	/////////////////////////////////   variables de prepase  ////////////////////////////////////////
	
	this.passPre=function(scope,module,declareInitialize)
	{
		var globals=this.globals;
		var local=this.settings[module];
		
		scope.passPre={v0:globals.initialString};//Real time - Cu-real time - Playback - Backup local task
		
		declareInitialize.entitle(scope,globals.titleProperyNameConvention,globals.variableNameConvention,module,local.titles,local.start,local.end);		
	}
	
	this.acuSoftwarePre=function(scope){scope.acuSoftwarePre={v0: 0};}
	
	this.taskRdrPre=function(scope)
	{
		scope.taskRdrPre=
		{
			id: 0, //Task ID
			orbit: 0, //Orbit
			trans: 'a', //Trans mode	
			image:0, //Image Data Time
			area:[0],
			country:[],
			subArea:[[0],[0]],
			states:[]		
		};
	}
	
	this.taskSmcs=function(scope)
	{
		scope.taskSmcs=
		{
			orbit:0, //orbit en caso de blt true
			type:"v", //Task Type
			id:0 //Task ID			
		};
	}
	
	//////////////////////////////////  Variables de Postpase ////////////////////////////////////////
	
	this.acuSoftwarePost=function(scope)
	{
		scope.acuSoftwarePost=
		{
			v0: 'v', //Return to Zero
			record: 0 //Record Time 
			
		};
	}
	
	
	this.activities=function(scope,declareInitialize)
	{
		var names=this.globals.namesToDeclareInicialize;
		var keys=Object.keys(names);
		var length=Object.keys(names).length;
		
		for(var i=0;i<length;i++)
		{		
			//Definir el valor incial a las variables que sea de formato
			var initial=this.defineInitial(names[i]);
			
			if(!declareInitialize.toFormat(scope,this.settings,this.globals,names[i],this.toFormat,initial))
			{
				//Si no es de formato
				this[names[i]](scope,names[i],declareInitialize);
			}					
		}	
	}
	
	this.query=function(scope)
	{
		scope.query=
		{
			display:"",
			type:"",
			record:[],
			date:"0000-00-00"
		}
	}
	
	
		
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////                            ////////////////////////////////////
	/////////////////////////////////  Inicializar las variables /////////////////////////////////////
	////////////////////////////////                            //////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	this.init=function(scope,declareInitialize)
	{
		//Declarar e inicializar las variables de settings
		this.settings=this.config(declareInitialize);		
		//Declarar e inicializar las variables de uso en los formularios
		this.activities(scope,declareInitialize);	
		//Declarar e inicializar las variables de tiempo
		this.time(scope,declareInitialize);
		//Declarar e inicializar las variables de fecha
		this.dateTime(scope,declareInitialize);		
		//Declarar e inicializar las variables de fecha
		this.satellite(scope);
		//Declarar e inicializar el campo nota para las variables de this.complete()
		this.genericField(scope);
		//Declarar e inicializar el campo nota para las variables de consulta
		this.query(scope);
		
		
	}	
});