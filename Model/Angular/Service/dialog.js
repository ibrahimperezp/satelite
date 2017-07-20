app.service("dialog", function() 
{	
	//mensaje de solo lectura del sistema 
	this.alert=function(message)
	{	
		this.clear();
		this.statusDialog=true;
		this.titleMessage=true;	
		this.statusMessage=true;	
		this.message=message;
		this.buttonContinue=true;	
	}
	
	//mensaje de pregunta entre aceptar y declinar
	this.confirm=function(message,accept,cancel)
	{
		cancel?cancel=cancel:cancel=this.clear;
		this.clear();
		this.statusDialog=true;
		this.titleMessage=true;
		this.statusMessage=true;		
		this.buttonOption=true;	
		this.message=message;
		this.accept=accept;
		this.cancel=cancel;
	}
	
	//mensaje de carga del sistema 
	this.loading=function()
	{
		this.clear();
		this.statusDialog=true;
		this.titleLoading=true;
		this.statusLoading=true;
	}
	
	//quita la pantalla de mensaje
	this.clear=function()
	{
		this.titleMessage=false;
		this.titleLoading=false;
		this.statusDialog=false;
		this.statusLoading=false;
		this.buttonOption=false;
		this.buttonContinue=false;			
		this.statusMessage=false;	
		this.message="";
		this.accept={};
		this.cancel={};
	}
	
	this.accept=function(){}
	this.cancel=function(){}
	//También se pueden crear así las variables
	this.clear();
});