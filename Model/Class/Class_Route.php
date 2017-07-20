<?php

class Route
{
    //Atributos   
	
	//Dirección del dominio en su primer nivel de directorio	   
    private $base="";
	//Carpetas del dominio en su primer nivel de directorio
	private $baseFolders=array("Style","Fonts");
	//Limite de directorios a subir
	private $maxUp=10;
	
    //Funcion Constructora
    function Route()
	{
		$this->setBase();
	}
	
	//Muestra de mensajes mediante la función de javasript llamada console.log
	function ConsoleLog($message)
	{
		echo ("<script>console.log('".$message."');</script>");
	}
	
	//Define la dirección base, es decir, se ubica en la dirección base del dominio, ejem: http://localhost
	//Al colocar la dirección base manual colocando ejem: http://localhost, pero php lo reconoce como otro servidor
	//por lo que tendría que dar permisos para permitir scripts externos para que funcionase de ese modo, algo no deseado
	//por lo que se crea una función para determinar cuantos directorios hay que subir para estar en el dominio  base
	function setBase()
	{
		//Cantidad máxima de vueltas
		$maxUp=$this->maxUp;
		//Dirección del dominio en su primer nivel de directorio	
		$baseFolders=$this->baseFolders;
		//Cantidad de carpetas en $baseFolders
		$length=count($baseFolders);
		//Variable que cuenta la cantidad de aciertos de carpetas encontradas
		$checked=0;
		//String con la cantidad de directorios que haya que subir para estar en el primer nivel de carpetas
		$up="";
		//Contador de vueltas, sirve de auxiliar para aumentar la subida de directorios solo desde la segunda vuelta
		//Para que la primera vuelta no suba sino que compruebe el nivel actual de carpetas donde se invocó la función
		$c=0;
		//Ciclo que se repite mientras las carpetas encontradas en un nivel sean distintas a las existentes en $baseFolders
		//La segunda condición es limitar la cantidad de vueltas del ciclo, cada vuelta representa una subida de directorio
		//a patir de la segunda vuelta
		while($checked!==$length && $c<=$maxUp)
		{
			//Se aumenta la cantidad de vueltas
			++$c;
			//Se sube un directorio solo a partir de la segunda vuelta
			if($c>1){$up.="../";}
			//Se reinicia la cantidad de aciertos
			$checked=0;
			//Se recorren las carpetas
			for($i=0;$i<$length;$i++)
			{		
				//Si existe el directorio, $checked aumenta	
				if(file_exists($up.$baseFolders[$i])){++$checked;}
			}			
		}

		if($checked===$length){$this->base=$up;}
		else{$this->ConsoleLog("Error: No se pudo definir el directorio base");}		
	}
	
	//Funcion que incluye las importaciones
	function setScript($array,$type)
	{
		$result="";
		$l=count($array);
		for($a=0;$a<$l;$a++)
		{
			if($type==="js")
			{
				echo "<script src='".$array[$a]."' type='text/javascript'></script> \n";
			}
			if($type==="css")
			{
				echo "<link rel='stylesheet' href='".$array[$a]."' type='text/css'>  \n";
			}
			if($type==="php")
			{
				require_once($array[$a]);
			}
		}
	}
	
	//Añade la dirección base a las direcciones en un array
	function addBase($array)
	{
		if(gettype($array)==="string"){$array=array($array);};
		$l=count($array);
		for($a=0;$a<$l;$a++)
		{
			$array[$a]=$this->base.$array[$a];
		}
		return $array;
	}
	
	
	//Importa archivos a una página en php
	function includes($type,$module)
	{
		$script="";
		if($type==="js"){$script=$this->script($module);}
		if($type==="css"){$script=$this->css($module);}
		if($type==="php"){$script=$this->php($module);}
		$script=$this->addBase($script);
		$this->setScript($script,$type);
	}
	
	//Retorna un arreglo de direcciones dependiendo de la variable $mode, que indica el concepto de los archivos a importar
	function script($module)
	{
		$array=array();
		$directory=array
		(
			"base" => array
			(
				"Model/Angular/Core/angularV1.js",
				"Model/Angular/Dependency/angular-route.js",
				"Model/Angular/App/app.js",
				"Model/Angular/Service/dialog.js",
				"Model/Angular/Service/route.js",
				"Model/Angular/Service/declareInitialize.js",
				"Model/Angular/Service/validate.js",
				"Model/Angular/Service/miscellaneous.js",
				"Model/Angular/Service/setData.js",	
				"Model/Angular/Service/normalize.js",	
				"Model/Angular/Service/getData.js",			
				"Model/Angular/Settings/settingsDeclareInitialize.js",
				"Model/Angular/Settings/settingsValidate.js"
			),
			"declareInitialize" => "Model/Angular/Controller/declareInitialize.js",
			"dialog" => "Model/Angular/Controller/dialog.js",
			"validate" => "Model/Angular/Controller/validate.js",
			"save" => "Model/Angular/Controller/save.js"
		);
		
		
		
		
		return $directory[$module];
		
	}
	
	//Retorna un arreglo de direcciones dependiendo de la variable $mode, que indica el concepto de los archivos a importar
	function php($module)
	{
		$array=array();
		$directory=array
		(
			"crud" => array
			(
				"Model/Class/Class_MySql.php",
				"Model/Class/Class_Query.php",
				"Model/Class/Class_Activity.php",
				"Model/Class/Class_Satellite.php",	
				"Model/Class/Class_PassPre.php",
				"Model/Class/Class_DeviceAcu.php",
				"Model/Class/Class_Device.php",
				"Model/Class/Class_DeviceRF.php",
				"Model/Class/Class_AcuSoftwarePre.php",
				"Model/Class/Class_Rack2.php",
				"Model/Class/Class_Status.php",
				"Model/Class/Class_Ups.php",
				"Model/Class/Class_Send.php",
				"Model/Class/Class_Power.php",
				"Model/Class/Class_TaskRdrPre.php",
				"Model/Class/Class_TaskSmcs.php",
				"Model/Class/Class_AcuSoftwareIn.php",
				"Model/Class/Class_TaskRdrIn.php",
				"Model/Class/Class_DemulatorIn.php",
				"Model/Class/Class_Track.php",
				"Model/Class/Class_AcuSoftwarePost.php",
				"Model/Class/Class_PassPost.php",
				"Model/Class/Class_Raw1.php",
				"Model/Class/Class_Raw2.php",
				"Model/Class/Class_DemulatorPre.php"				
			),
			"head" => "View/Head/mockup.php",
			"normal" => "View/Head/normal.php",
			"view" => "View/Model/view.php",
			"validate" => "View/Model/validate.php",
			"save" => "View/Model/save.php"
			/*,
			"activities" => array
			(
				"Model/Class/Class_Device.php"
			)*/
		);
		
		
		return $directory[$module];
	}
	
	function disassociateArray($array)
	{
		$new=array();
		$l=count($array);
		$keys=array_keys($array);
		
		for($a=0;$a<$l;$a++)
		{
			array_push($new,$array[$keys[$a]]);
		}
		return $new;
	}
	
	function css($module)
	{
		$directory=array
		(
			"container" => "Style/container.css",
			"header" => "Style/header.css",
			"menu" => "Style/menu.css",
			"dialog" => "Style/dialog.css",
			"table" => "Style/table.css",
			"radio" => "Style/radio.css"
		);
		
		
		
		
		return $directory[$module];
		$array=array
		(
			"shared" => array
			(
				"trend" => "Style/trend.css",
				"binary" => "Style/binary.css",
				"dialog" => "Style/dialog.css",
				"menu" => "Style/menu.css",
				"header" => "Style/header.css"	
			),
			"prototype" => array
			(
				"activity" => "Style/activity.css"
			)
		);
		
		
		if($specific===false){return $this->disassociateArray($array[$module]);}
		return $array[$module][$specific];
	}
	
	function shortcut($shortcut,$controller)
	{
		if($shortcut==="base")
		{
			$_GET["controller"]=$controller;
			$this->includes("php","head");
			//$this->includes("php","activities"); 
			$this->includes("js","base");
			$this->includes("css","dialog"); 
			$this->includes("css","header"); 
			$this->includes("css","menu"); 
			$this->includes("css","container"); 
			$this->includes("css","table");
			$this->includes("css","radio");
		}
	}
	
	
}
/*

$position="";
		$keys=array_keys($directory);
		$length=count($module);
		for($i=0;$i<$length;$i++)
		{
			if($i>0){$array=$array[$module[$i]];}
			else{$array=$directory[$module[$i]];}
		}
if(gettype($array)==="array")
		{
			$still=true;
			$new=$directory;
			$cuenta=0;
			while($still)
			{
				++$cuenta;
				$keys=array_keys($new);
				$length=count($new);
				
				//Eliminar keys
				for($i=0;$i<$length;$i++)
				{
					if(isset($new[$keys[$i]]) && gettype($new[$keys[$i]])!=="array"){unset($new[$keys[$i]]);}
				}
				
				//Eliminar posiciones numericas
				for($i=0;$i<$length;$i++)
				{
					if(isset($new[$i]) && gettype($new[$i])!=="array"){unset($new[$keys[$i]]);}
				}
				
				$nl=count($new);
				$temp=array();
				
				if($nl>0)
				{
					//Conseguir el primer arreglo que sea array
					for($i=0;$i<$length;$i++)
					{
						if(isset($new[$keys[$i]]) && gettype($new[$keys[$i]])==="array")
						{$temp=$new[$keys[$i]]; unset($new[$keys[$i]]); break; }
					}
					
					//Eliminar posiciones numericas
					for($i=0;$i<$length;$i++)
					{
						if(isset($new[$i]) && gettype($new[$i])!=="array")
						{$temp=$new[$keys[$i]]; unset($new[$keys[$i]]); break; }
					}
				}
			}
		}*/

?>