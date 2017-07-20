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