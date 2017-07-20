app.service("route", function() 
{
	this.addRouteDomain=function(route,target)
	{
		//Arreglo con los nombres de las propiedades del objeto 'route' en la carpeta 'target'
		var keys=Object.keys(route[target]);
		//Longitud del arreglo keys
		var length=keys.length;
		//Recorrer los arreglos y añadir la dirección base a la carpeta
		for(i=0;i<length;i++){route[target][keys[i]]=route.domain+route[target][keys[i]];}
	}	
	
	//Dirección del dominio principal
	this.domain="http://localhost/satelite";
	
	//Direcciones en Controller, que es la carpeta de controladores
	this.controller={};
	this.controller.domain=this.domain+"/Controller";
	
	//Direcciones en Server, que es una arpeta de controladores
	this.controller.server={};
	this.controller.server.domain=this.controller.domain+"/Server";
	this.controller.server.crud=this.controller.server.domain+"/CRUD.php";
	
	//Direcciones de la carpeta file
	this.file={};
	this.file.domain=this.domain+"/File";
	this.file.json={};
	this.file.json.domain=this.file.domain+"/Json";
	this.file.json.countries=this.file.json.domain+"/countries.php";
	this.file.json.states=this.file.json.domain+"/states.php";	
	//this.addRouteDomain(this.file,'json');	
	
	//Direcciones en View, que es la carpeta de la vista
	this.view={};
	this.view.domain=this.domain+"/View";
	this.view.dialog=this.view.domain+"/Dialog/mockup.html";
	this.view.menu=this.view.domain+"/Menu/mockup.html";
	this.view.header=this.view.domain+"/Header/mockup.html";
	this.view.activity=this.view.domain+"/Activity/mockup.html";
	this.view.satellite=this.view.domain+"/Satellite/mockup.html";
	this.view.acuSoftwarePre=this.view.domain+"/Pre/acu_software/mockup.html";
	this.view.device=this.view.domain+"/Pre/device/mockup.html";
	this.view.deviceAcu=this.view.domain+"/Pre/device_acu/mockup.html";
	this.view.deviceRF=this.view.domain+"/Pre/device_rf/mockup.html";
	this.view.power=this.view.domain+"/Pre/power/mockup.html";
	this.view.ups=this.view.domain+"/Pre/ups/mockup.html";
	this.view.status=this.view.domain+"/Pre/status/mockup.html";
	this.view.send=this.view.domain+"/Pre/send/mockup.html";
	this.view.rack2=this.view.domain+"/Pre/rack2/mockup.html";
	this.view.taskRdrPre=this.view.domain+"/Pre/task_rdr/mockup.html";
	this.view.taskSmcs=this.view.domain+"/Pre/task_smcs/mockup.html";
	this.view.acuSoftwareIn=this.view.domain+"/In/acu_software/mockup.html";
	this.view.taskRdrIn=this.view.domain+"/In/task_rdr/mockup.html";
	this.view.demulatorIn=this.view.domain+"/In/demulator/mockup.html";
	this.view.track=this.view.domain+"/In/track/mockup.html";
	this.view.acuSoftwarePost=this.view.domain+"/Post/acu_software/mockup.html";
	this.view.passPost=this.view.domain+"/Post/pass/mockup.html";
	this.view.raw1=this.view.domain+"/Post/raw1/mockup.html";
	this.view.raw2=this.view.domain+"/Post/raw2/mockup.html";
	this.view.register=this.view.domain+"/Register/mockup.html";
	this.view.demulatorPre=this.view.domain+"/Pre/demulator/mockup.html";
	this.view.edit=this.view.domain+"/Edit/mockup.html";
	this.view.query=this.view.domain+"/Query/mockup.html";
	
	
	//Lista de shortcuts, es decir, variables con nombres más cortos para acceder más fácil a ella
	//en el momento de usarlas o simplemente que sean más fáciles de recordar, desinadas a usar
	//en otros scripts
	this.shortcut=
	{
		crud:this.controller.server.crud,
		states:this.file.json.states,
		countries:this.file.json.countries,
		dialog:this.view.dialog,
		menu:this.view.menu,
		header:this.view.header,
		activity:this.view.activity,
		satellite:this.view.satellite,
		acuSoftwarePre:this.view.acuSoftwarePre,
		device:this.view.device,
		deviceAcu:this.view.deviceAcu,
		deviceRF:this.view.deviceRF,
		power:this.view.power,
		ups:this.view.ups,
		status:this.view.status,
		send:this.view.send,
		rack2:this.view.rack2,
		taskRdrPre:this.view.taskRdrPre,
		taskSmcs:this.view.taskSmcs,
		acuSoftwareIn:this.view.acuSoftwareIn,
		taskRdrIn:this.view.taskRdrIn,
		demulatorIn:this.view.demulatorIn,
		track:this.view.track,
		acuSoftwarePost:this.view.acuSoftwarePost,
		passPost:this.view.passPost,
		raw1:this.view.raw1,
		raw2:this.view.raw2,
		register:this.view.register,
		demulatorPre:this.view.demulatorPre,
		edit:this.view.edit,
		query:this.view.query
	}	
	
	
	
});