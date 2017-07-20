<?php

/*include("Class_Query.php");*/
class Activity extends Query
{
	//Atributos
	protected $tableName="pase";
	protected $moduleName="activity";
	
	public function __construct()
	{
		parent::__construct($this->tableName,$this->moduleName);		
	}
	
	
	public function controller($data)
	{
		switch ($data->action) 
		{
			case "save":
				return $this->saveActivity($data);
				
			case "delete":				
				return $this->deleteSatellite($data->id);
				
			case "read":
				return $this->readActivity($data->date);
				
			case "select":
				return $this->selectActivity($data->id);
			
			case "complete":
				return $this->activityCompleted($data->pass);
				
			default:
				return "Opcion desconocida";
		}
	}
	
	protected function settings($data)
	{
		$notes="";
		if(isset($data->value->notes)){$notes=htmlentities($data->value->notes);}
		return array
		(
			"local_time" => $data->value->turn,
			"nro_pase" => $data->value->pass,
			"idsatelite" => $data->value->satellite,
			"fecha" => $data->value->activityDate,
			"nota" => $notes
		);
	}
	
	protected function saveActivity($data)
	{
		
		if($this->check("SELECT * FROM pase WHERE fecha ='".$data->value->activityDate."' AND local_time='".$data->value->turn."'  AND idsatelite='".$data->value->satellite."' AND nro_pase='".$data->value->pass."'"))
		{				
			return "Pase duplicado";			
		} 
		
		else
		{
			if($this->check("SELECT * FROM pase WHERE fecha ='".$data->value->activityDate."'  AND idsatelite='".$data->value->satellite."' AND nro_pase='".$data->value->pass."' "))
			{				
				return "Número de pase duplicado";			
			} 
			
			else
			{
				$insert=$this->insert($this->settings($data));
				$newId=$this->executeAndReturn($insert);
				return $newId;
			}
		}
	}
	
	//Ordena de forma ascendente los registros por su número de pase
	protected function orderAscendant($reg)
	{
		$new=array();
		$new[0]=$reg[0];
		$length=(count($reg)-1);
		
		for($i=1;$i<=$length;$i++)
		{			
			for($j=1;$j<=$length;$j++)
			{
				if($reg[$j]["nro_pase"]==$i){array_push($new,$reg[$j]);}				
			}			
		}
		return $new;
	}
	
	//Asigna cual es la actividad que tiene prioridad para completar, es decir, poder acceder a la primera incompleta
	//en orden de numero de pase
	protected function priority(&$reg)
	{
		$length=(count($reg)-1);		
		for($i=1;$i<=$length;$i++)
		{
			if($reg[$i]["complete"]<100)
			{
				$reg[$i]["enable"]=true;
				return $reg;
			}
		}
	}
	
	//Aplica la regla de tres a dos numeros a y b
	protected function threeRule($a,$b)
	{
		//Regla de tres
		$result=(($a*100)/$b);
		//Redondea para que no queden números decimales lagos
		$result=round($result);
		return round($result);
	}
	
	protected function moduleFilled(&$activity,$modules,$length,&$cantidad,$id)
	{	
		for($m=0;$m<$length;$m++)
		{
			//Traduce el nombre de la tabla en base de datos al nombre del campo en javascript
			$translate=$this->translateModule($modules[$m]);
			//Indica por defecto el valor del modulo como falso, es decir, que no ha sido completado
			$activity[$translate]=false;
			//Comprueba si existe el registro para cambiar el valor a true y aumenta el contador de modulos completados
			if($this->check("SELECT * FROM ".$modules[$m]." WHERE idpase='".$id."'"))
			{
				$activity[$translate]=true;
				++$cantidad;
			}
			//comprueba si es uno de los modulos que se prelan con blt
			else
			{
				$pa=$this->getArranged("SELECT * FROM pass_pre WHERE idpase='".$id."'");
				$check=$pa[1]["backup_local_task"];
				if($check==="s" && ($translate==="taskRdrPre" || $translate==="taskRdrIn" || $translate==="demulatorPre" || $translate==="demulatorIn" || $translate==="raw1" || $translate==="raw2"))
				{
					$activity[$translate]=true;
					++$cantidad;
				}
			}
		}
	}
	
	protected function activityCompleted($id)
	{
		$completed=array();
		$this->setPercentage($completed,$id);
		if($completed["pre"]===true && $completed["in"]===true && $completed["post"]===true)
		{
			$this->execute("UPDATE pase SET complete='s' WHERE idpase=".$id."");
		}
	}
	
	protected function setPercentage(&$activity,$id)
	{
		$concept=array($this->modules(),$this->pre(),$this->in(),$this->post());	
		$name=array("complete","pre","in","post");	
		
		//Vueltas por cantidad de modulos
		for($c=0;$c<=3;$c++)
		{
			//Contador de modulos completados
			$cantidad=0;
			//Modulo actual
			$modules=$concept[$c];	
			//Cantidad de actividades de modulo
			$length=count($modules);	
			//Revisar si el modulo ya esta registrado para este pase
			$this->moduleFilled($activity,$modules,$length,$cantidad,$id);			
			//Asignar la cantidad de registros completados		
			if($c===0){$activity["cantidad"]=$cantidad;}
			else
			{
				if($cantidad===$length){$activity[$name[$c]]=true;}
				else{$activity[$name[$c]]=false;}
			}
		}
	}
	
	protected function defineDate()
	{
		$fe="0000-00-00";
		if($this->check("SELECT * FROM pase WHERE complete='n' ORDER BY fecha ASC"))
		{
			$fech=$this->getArranged("SELECT * FROM pase WHERE complete='n' ORDER BY fecha ASC LIMIT 1;");
			$fe=$fech[1]['fecha'];
		}
		return $fe;
	}
	
	protected function readActivity($fecha)
	{	
		$c=count($this->modules());
		if($fecha===""){$fecha=$this->defineDate();}
		
		if($this->check("SELECT * FROM pase WHERE fecha='".$fecha."'"))
		{
			$reg=$this->getArranged("SELECT * FROM pase WHERE fecha='".$fecha."'");
			for($i=1;$i<=$reg[0];$i++)
			{
				$name=$this->getArranged("SELECT * FROM satelite WHERE idsatelite='".$reg[$i]['idsatelite']."';");
				$reg[$i]["modules"]="";
				$reg[$i]["name"]=$name[1]['satelite_nombre'];
				$this->setPercentage($reg[$i]["modules"],$reg[$i]['idpase']);
				$reg[$i]['complete']=$this->threeRule($reg[$i]["modules"]['cantidad'],$c);	
				$reg[$i]['enable']=false;	
			}
			//Ordena de forma ascendente los registros por su número de pase
			$reg=$this->orderAscendant($reg);
			//Asigna cual es la actividad que tiene prioridad para completar
			$this->priority($reg);
			return json_encode($reg);			
		}		
	}	
	
	
	protected function selectActivity($id)
	{
		$blt=false;	
		$passPre=$this->getArranged("SELECT * FROM pass_pre WHERE idpase ='".$id."'  LIMIT 1;");
		if($passPre[1]['backup_local_task']==='s'){$blt=true;}
		$array=array($id,$blt);
		return  json_encode($array);
	}
		
}

?>