<?php
class Pass
{
	//Atributos
	var $MySql;
	var $Message;
	
	function Pass()
	{
		$this->MySql=new MySql();
		$this->Message=array
		(
			"passDuplicated"=>"No se pudo guardar porque ya existe un registro para la fecha, turno, satélite y número de pase seleccionados",
			"passNumberDuplicated"=>"No se pudo guardar porque ya existe un registro para la fecha, satélite y número de pase seleccionados",
			"passNotFound"=>"No se consiguió registro para la fecha, turno, satélite y número de pase seleccionados",
			"unknownOption"=>"Opción desconocida",
			"saveSuccessful"=>"Registro guardado",
			"updateSuccessful"=>"Registro modificado"
		);
		
		
	}
	
	//buscar todos los pases disponibles para la fecha actal del sistema
	function getPasses($date,$stage)
	{		
	  	$query="SELECT * FROM pase WHERE fecha='".$date."';";
		if($this->Sql->existe_registro($query))
		{
			$reg=$this->Sql->retornar_reg($query);
			$len=count($reg);
			for($i=0;$i<$len;$i++)
			{
				$sat=$this->Sql->retornar_registro("SELECT * FROM satelite WHERE idsatelite=".$reg[$i]['idsatelite']." LIMIT 1;");
				$backup=$this->Sql->retornar_registro("SELECT * FROM pass_mode WHERE idpase=".$reg[$i]['idpase']." LIMIT 1;");
							
				$reg[$i]["satelite"]=$sat[1]["satelite_nombre"];
				$reg[$i]["backup"]="";
				if($backup[1]["backup_local_task"]==="s"){$reg[$i]["backup"]="si";}
				else{$reg[$i]["backup"]="no";}
				$reg[$i]["complete"]=$this->stageComponents($stage,$reg[$i]['idpase']);
			}
			echo json_encode($reg);				
		}
	}
	
	function stageComponents($stage,$pase)
	{ 
		$preComponents=array("pass_mode","device_rf");
		$components="";
		
		if($stage==="pre"){$components=$preComponents;}
		
		$counter=0;
		$length=count($components);
		for($c=0;$c<$length;$c++)
		{
			if($this->Sql->existe_registro("SELECT * FROM ".$components[$c]." WHERE idpase=".$pase." LIMIT 1;")){++$counter;}
		}
		
		return $this->threeRule($counter,$length);
	}
	
	
	
	function getPass($v)
	{
		$respuesta=array();
		$codigo="SELECT * FROM pase WHERE fecha ='".$v->fecha."' AND idsatelite='".$v->satelite."' AND local_time='".$v->turno."' AND nro_pase='".$v->pase."' LIMIT 1;";
		
		if($this->Sql->existe_registro($codigo))
		{			
			$pase=$this->Sql->retornar_registro($codigo);			
			$respuesta["status"]="ok";
			$respuesta["pase"]=$pase[1]['idpase'];
			$respuesta["backup"]="v";
			$respuesta["options"]="v";
			
			$codigo="SELECT * FROM pass_mode WHERE idpase ='".$pase[1]['idpase']."' LIMIT 1;";
			if($this->Sql->existe_registro($codigo))
			{
				$mode=$this->Sql->retornar_registro($codigo);				
				$respuesta["backup"]=$mode[1]['backup_local_task'];
				if($mode[1]['real_time']==="s"){$respuesta["options"]="real";}
				if($mode[1]['cu_real_time']==="s"){$respuesta["options"]="cu";}
				if($mode[1]['playback']==="s"){$respuesta["options"]="play";}
			}
						
			return json_encode($respuesta);
		}
		
		else
		{
			return json_encode($respuesta["status"]=$this->Error["passNotFound"]);
		}
	}
	
	
	function selectActivity($id)
	{
		$pase=$this->MySql->retornar_registro("SELECT * FROM pase WHERE idpase ='".$id."'  LIMIT 1;");	
		$blt=false;
	
		$passMode=$this->MySql->retornar_registro("SELECT * FROM pass_mode WHERE idpase ='".$id."'  LIMIT 1;");
		if($passMode[1]['backup_local_task']==='s'){$blt=true;}
		$array=array($id,$blt);
		return  json_encode($array);
	}
	
	
	function controller($data)
	{
		switch ($data->action) 
		{
			case "save":
				$status=$this->savePass($data->data);
				if($status==='ok')
				{
					return $this->getPassId($data->data->passDate,$data->data->satellite,$data->data->pass,$data->data->turn);
				}
				else{return $status;}
				
			case "delete":				
				return $this->deleteSatellite($data->id);
				
			case "read":
				return $this->readSatellite($data);
				
			case "activity":
				return "holis";
				
			default:
				return $this->Message["unknownOption"];
		}
	}
	
	function readActivity($fecha)
	{	
		$c=count($this->modules());
		if($this->MySql->existe_registro("SELECT * FROM pase WHERE fecha='".$fecha."';"))
		{
			$reg=$this->MySql->retornar_registro("SELECT * FROM pase WHERE fecha='".$fecha."';");
			for($i=1;$i<=$reg[0];$i++)
			{
				$name=$this->MySql->retornar_registro("SELECT * FROM satelite WHERE idsatelite='".$reg[$i]['idsatelite']."';");
				$reg[$i]["modules"]="";
				$reg[$i]["name"]=$name[1]['satelite_nombre'];
				$this->setPercentage($reg[$i]["modules"],$reg[$i]['idpase']);
				$reg[$i]['complete']=$this->threeRule($reg[$i]["modules"]['cantidad'],$c);
			}
			return json_encode($reg);			
		}
	}
	function threeRule($a,$b)
	{
		$result=(($a*100)/$b);
		$result=round($result);
		if($result>100){$result=100;}
		return round($result);
	}	
	
	function modules()
	{
		return array("send_guide","acu_software","power","device","device_acu","device_rf","rack_2","status","status_ups","task_list_rdr","task_list_smcs","demulator","track_receiver","raw_data","pass_mode");
	}
	
	function pre()
	{
		return array("send_guide","acu_software","power","device","device_acu","device_rf","rack_2","status","status_ups","task_list_rdr","task_list_smcs");
	}
	
	function in()
	{
		return array("acu_software","task_list_rdr","demulator","track_receiver");
	}
	
	function post()
	{
		return array("acu_software","raw_data","pass_mode");
	}
	
	function setPercentage(&$activity,$id)
	{
		$modules=$this->modules();
		$length=count($modules);
		$b=0;
		for($a=0;$a<$length;$a++)
		{
			
			$activity[$modules[$a]]=false;
			if($this->MySql->existe_registro("SELECT * FROM ".$modules[$a]." WHERE idpase='".$id."';"))
			{				
				$activity[$modules[$a]]=true;
				++$b;
			}
			
		}
		$activity["cantidad"]=$b;
		
		$pre=$this->pre();
		$length=count($pre);
		$b=0;
		for($a=0;$a<$length;$a++)
		{
			
			$activity[$pre[$a]]=false;
			if($this->MySql->existe_registro("SELECT * FROM ".$pre[$a]." WHERE idpase='".$id."';"))
			{				
				$activity[$pre[$a]]=true;
				++$b;
			}
			
		}
		if($b===$length){$activity["pre"]=true;}
		else{$activity["pre"]=false;}
		
		
		
		$in=$this->in();
		$length=count($in);
		$b=0;
		for($a=0;$a<$length;$a++)
		{
			
			$activity[$in[$a]]=false;
			if($this->MySql->existe_registro("SELECT * FROM ".$in[$a]." WHERE idpase='".$id."';"))
			{				
				$activity[$in[$a]]=true;
				++$b;
			}
			
		}
		if($b===$length){$activity["in"]=true;}
		else{$activity["in"]=false;}
		
		
		
		$post=$this->post();
		$length=count($post);
		$b=0;
		for($a=0;$a<$length;$a++)
		{
			
			$activity[$post[$a]]=false;
			if($this->MySql->existe_registro("SELECT * FROM ".$post[$a]." WHERE idpase='".$id."';"))
			{				
				$activity[$post[$a]]=true;
				++$b;
			}
			
		}
		if($b===$length){$activity["post"]=true;}
		else{$activity["post"]=false;}
		
		
		
	}
	
	
	function getPassId($fecha,$satelite,$pase,$turno)
	{
		$code="SELECT * FROM pase WHERE fecha ='".$fecha."' AND idsatelite='".$satelite."' AND local_time='".$turno."' AND nro_pase='".$pase."' LIMIT 1;";		
		$pase=$this->MySql->retornar_registro($code);
		return $pase[1]['idpase'];
	}
	
	function savePass($data)
	{
		
		if($this->MySql->existe_registro("SELECT * FROM pase WHERE fecha ='".$data->passDate."' AND local_time='".$data->turn."'  AND idsatelite='".$data->satellite."' AND nro_pase='".$data->pass."' LIMIT 1;"))
		{				
			return "Pase duplicado";			
		} 
		
		else
		{
			if($this->MySql->existe_registro("SELECT * FROM pase WHERE fecha ='".$data->passDate."'  AND idsatelite='".$data->satellite."' AND nro_pase='".$data->pass."' LIMIT 1;"))
			{				
				return "Número de pase duplicado";			
			} 
			
			else
			{
				$this->MySql->ejecucion("INSERT INTO pase(local_time,nro_pase,idsatelite,fecha) 
				VALUES('".$data->turn."','".$data->pass."','".$data->satellite."','".$data->passDate."')");
				return "ok";
				/*
				$id=$this->getPassId($data->passDate,$data->satellite,$data->pass,$data->turn);
				$this->savePassMode($data,"pass_mode",$id);*/
			}
		}
		return 'ok';
	}
	
}

?>