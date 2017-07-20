app.service("declareInitialize", function() 
{	 	
	//Da un formato específico a un objeto
	//'generic' : arreglo con los nombres que se convertiran en un objeto con propiedades en un formato genérico
	//'newObject' : objeto al que se le asigna la propiedad creada
	//'propery' : nombre que tendrá la propiedad a crearle a 'newObject' y concuerda con una propiedad del objeto 'generic'
	//'start' : valor de inicio de un rango, normalmente cero (0)
	this.setGenericValues=function(generic,newObject,property,start)
	{
		//Se crea la propiedad
		newObject[property]={};
		//La propiedad titles es un arreglo del objeto 'generic' que concuerdan en nombre con  el argumento 'property'
		newObject[property].titles=generic[property];
		//La propiedad start es un valor de inicio en un rango, definido por una variable global
		newObject[property].start=start;
		//La propiedad end es un valor de fin en un rango, definido la longitud de 'newObject[property].titles'
		//Se le coloca -1 para simular que lenght empieza desde cero cuando en realidad lo hace desde 1
		newObject[property].end=((generic[property].length)-1);		
	}
	
	//Crea un objeto con un formato preestablecido
	//'scope' : objeto al que se le añadirán las propiedades
	//'settings' : objeto con valores a llenar el las propiedades a crear
	//'module' : nombre de la propiedad a crear
	//'toFormat' : arreglo en el que, si se encuentra el valor 'module', se crea la propiedad
	//'initial' : valor inicial que se le dará a una propiedad que se creará, llamada initial
	this.toFormat=function(scope,settings,globals,module,toFormat,initial)
	{
		//Comprueba si crear el objeto con el formato
		if(toFormat.indexOf(module)>=0)
		{
			//Abreviatura del objeto con valores a llenar el las propiedades a crear
			var local=settings[module];
			//Crear los objetos con valores iniciales
			this.iteratePropery(scope,globals.variableNameConvention,module,local.start,local.end,initial);
			//Crear el objeto con los títulos de cada valor del objeto creado en 'this.iterateVariable'
			this.entitle(scope,globals.titleProperyNameConvention,globals.variableNameConvention,module,local.titles,local.start,local.end);
			
			return true;
		}
		
		return false;
	}
	
	//Declara y define propiedades de nombres iguales en nombre excepto por un número en el que finaliza el nombre, que será
	//iterado desde un inicio hasta un final dado
	//'scope' : objeto que contiene el objeto al que se le crearán las propiedades
	//'globals' : propiedades con valores globales, se tomará el nombre de convención que tendrá la variable
	this.iteratePropery=function(scope,convention,extension,start,end,initial)
	{
		//Crea el objeto a iterarle las propiedades en caso que no exista
		if(!scope[extension]){scope[extension]={};}
		//Declara y define las variables
		for(i=start;i<=end;i++){scope[extension][convention+i]=initial;}
	}
	
	//Función que asigna nombre a las propiedades en creación
	this.entitle=function(scope,titleConvention,nameConvention,extension,titles,start,end)
	{
		//Obtener el primer caracter
		var char=extension.charAt(0);
		//Colocar en mayúscula el primer caracter
		var upperCase=char.toUpperCase();
		//Palabra que se le agregará el nombre de la extensión
		var addition=titleConvention+upperCase;
		//Remover el primer caracter ya que se le agregará en mayúscula
		var noFirstChar= extension.substr(1);
		//Nombre resultante del nuevo objeto
		var newProperty=addition+noFirstChar;
		//Declarar el nuevo objeto
		scope[newProperty]=[];
		//Recorrer y añadir los objetos a crear al objeto scope
		for(i=start;i<=end;i++)
		{
			var newObject=
			{
				title:titles[i],
				property:(nameConvention+i)
			}
			scope[newProperty].push(newObject);
		}
	}
	
	//Retorna un arreglo que contiene 
	this.rangeNumbers=function(start,end)
	{
		//Arreglo a retornar
		var arr=[];
		//Recorrer y añadir el valor desde un inicio y final pasados como argumentos
		for(r=start;r<=end;r++){arr.push(this.fillZero(r));}
		
		return arr;
	}
	
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
	
	
	//Concatena objetos, es decir, toma todas las propiedades de los objetos y las añade a un nuevo objeto a retornar
	//En caso de que tengan una propiedad con el mismo nombre, se sobreescribe la propiedad en el orden de los objetos
	//que se pasan como argumentos
	//'arr' : es un arreglo con los objetos a concatenar
	this.concatObjects=function(arr)
	{		
		//Declarar e inicializar el objeto a retornar que tendrá todas las propiedades
		var base={};
		//Longitud del arreglo pasado como argumento
		var l=arr.length;		
		for(var g=0;g<l;g++)
		{
			//Objeto a añadir a 'base'
			var toAdd=arr[g];
			//Arreglo con los nombres de las propiedades del objeto 'toAdd'
			var keys=Object.keys(toAdd);
			//Longitud de propiedades del objeto 'toAdd'
			var length=keys.length;			
			//Recorrer las propiedades de'toAdd' y añadirlas al objeto 'base'
			for(var j=0;j<length;j++)
			{
				//Nombre de la propiedad
				var name=keys[j];
				//Crear la propiedad en 'base' o sobreescribirla en caso que exista, y añadirle la propiedad del mismo nombre
				//En el objeto 'toAdd'
				base[name]=toAdd[name];
			}
		}
		return base;
	}	
});