app.service("miscellaneous", function() 
{	
	this.scope;
	
	this.turn=function(turn)
	{
		if(turn==='n'){return "Nocturno"}
		return "Diurno";
	}
	
	this.init=function(scope)
	{
		this.scope=scope;
	}
	
});