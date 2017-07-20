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
	
	function threeRule($a,$b)
	{
		$result=(($a*100)/$b);
		$result=round($result);
		if($result>100){$result=100;}
		return round($result);
	}
	
	
	
	
	function getPassId($fecha,$satelite,$pase,$turno)
	{
		$code="SELECT * FROM pase WHERE fecha ='".$fecha."' AND idsatelite='".$satelite."' AND local_time='".$turno."' AND nro_pase='".$pase."' LIMIT 1;";		
		$pase=$this->Sql->retornar_registro($code);
		return $pase[1]['idpase'];
	}
	
	function savePassMode($data,$modulo,$id)
	{
		$r=array("v","v","v","v");
		$r[$data->value->v1]="s";
		
		$this->Sql->ejecucion("INSERT INTO ".$modulo."(`idpase`,`real_time`, `cu_real_time`, `playback`, `backup_local_task`) VALUES('".$id."','".$r[1]."','".$r[2]."','".$r[3]."','".$data->value->v2."')"); 
	}

	
	function getModule($module,$idpass,$return=false,$numbered=false)
	{
		$response=false;
		$complement=" LIMIT 1 ";
		if($return){$complement="";}
		$query="SELECT * FROM ".$module." WHERE idpase='".$idpass."' ".$complement.";";
		$isThere=$this->Sql->existe_registro($query);
		
		if($return)
		{
			if($isThere)
			{
				if($numbered){$response=$this->Sql->retornar_registro($query);}
				else{$response=$this->Sql->retornar_reg($query);}
			}
		}
		
		else
		{
			if($isThere){$response="update";}
			else{$response="save";}
		}
		
		return $response;
	}
	
	function defineModuleAction($action,$idpass,$module)
	{
		if($action==="save"){return $this->getModule($module,$idpass);}
		return $action;
	}
	
	function handleSend($data)
	{
		$module="send_guide";
		$action=$this->defineModuleAction($data->action,$data->pass,$module);
		
		switch ($action) 
		{
			case "save":
				$this->saveSend($data,$module);
				return $this->Message["saveSuccessful"];
				
			case "update":
				$this->updateSend($data,$module);
				return $this->Message["updateSuccessful"];
				
			case "read":
				return $this->readSend($data,$module);
				
			default:
				return $this->Message["unknownOption"];
		}
		
	}
	
	
	
	
	function saveSend($data,$module)
	{
		$this->Sql->ejecucion("INSERT INTO ".$module."(`idpase`,`send_guide_acu`, `send_guide_rdr1`, `send_guide_rdr2`) 
		VALUES('".$data->pass."','".$data->value->v1."','".$data->value->v2."','".$data->value->v3."') ;");	
	}
	
	function updateSend($data,$module)
	{
		$this->Sql->ejecucion("UPDATE ".$module." SET send_guide_acu='".$data->value->v1."', send_guide_rdr1='".$data->value->v2."', send_guide_rdr2='".$data->value->v3."' WHERE idpase= '".$data->pass."' LIMIT 1;");
	}
	
	function readSend($data,$module)
	{
		$response=array();
		$response['status']=$this->getModule($module,$data->pass);
	
		if($response['status']==="update")
		{
			$response['status']="ok";
			if($data->mode==="single")
			{
				$records=$this->getModule($module,$data->pass,true);
				$response['guide_acu']=$records[0]['send_guide_acu'];
				$response['guide_rdr1']=$records[0]['send_guide_rdr1'];
				$response['guide_rdr2']=$records[0]['send_guide_rdr2'];
			}
			return json_encode($response);
		}
		
		return "";		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function Duplicated($m)
	{
		return "No se pudo guardar porque ya existe un registro ".$m." para número de pase seleccionado";
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
	
	
	function controller($data)
	{
		switch ($data->action) 
		{
			case "save":
				return $this->savePass($data->data);
				
			case "delete":				
				return $this->deleteSatellite($data->id);
				
			case "read":
				return $this->readSatellite($data);
				
			default:
				return $this->Message["unknownOption"];
		}
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
	
	
	function handle($data,$modulo)
	{
		$respuesta="";
		//$id=$this->getPassId($data->fecha,$data->satelite,$data->pase,$data->turno);		
		$id=$data->pase;
		$action="save";
		
		if($this->Sql->existe_registro("SELECT * FROM ".$modulo." WHERE idpase='".$id."' LIMIT 1;")){$action="update";}
		
		switch ($modulo) 
		{
			case "send_guide":
				$respuesta=$this->handleSend($data,$modulo,$id,$action);
				break;
				
			case "device_rf":
				$respuesta=$this->saveDeviceRF($data,$modulo,$id);
				break;
				
			case "device_acu":
				$respuesta=$this->saveDeviceAcu($data,$modulo,$id);
				break;
			
			case "pass_mode":
				$respuesta=$this->savePassMode($data,$modulo,$id);
				break;
				
			case "device":
				$respuesta=$this->saveDevice($data,$modulo,$id);
				break;
				
			case "rack_2":
				$respuesta=$this->saveRack2($data,$modulo,$id);
				break;
				
			case "status":
				$respuesta=$this->saveStatus($data,$modulo,$id);
				break;
				
			case "status_ups":
				$respuesta=$this->saveUps($data,$modulo,$id);
				break;
			
			default:
				$respuesta=$this->Error["unknownOption"];
		}
		return $respuesta; 
		
	}
	
	
	
	
	
	
	function saveDeviceRF($v,$modulo,$id)
	{	
		$this->Sql->ejecucion("INSERT INTO ".$modulo."(`idpase`,`xdata_1_status`, `xdata_1_smcs`, `xdata_2_status`, `xdata_2_smcs`, `xdata_1b_status`, `xdata_1b_smcs`, `xdata_2b_status`, `xdata_2b_smcs`, `test_s_status`, `test_s_smcs`, `xtracking_1_status`, `xtracking_1b_status`, `stracking_1_status`, `stracking_1b_status`, `nport_status`) VALUES('".$id."','".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."','".$v->id->v9."','".$v->id->v10."','".$v->id->v11."','".$v->id->v12."','".$v->id->v13."','".$v->id->v14."','".$v->id->v15."')"); 			
		return "ok";
	}
	
	function saveRack2($v,$modulo,$id)
	{
		$this->Sql->ejecucion("INSERT INTO ".$modulo."( `idpase`,`matrix_status`, `matrix_smcs`, `dem_1_status`, `dem_1_smcs`, `dem_2_status`, `dem_2_smcs`, `dem_3_status`, `dem_3_smcs`) VALUES('".$id."','".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."')"); 
		
		return "ok";
	}
	
	
	function saveStatus($v,$modulo,$id)
	{
		$this->Sql->ejecucion("INSERT INTO ".$modulo."( `idpase`,`mod_status`, `mod_smcs`, `gps_lock_status`, `nport_status`, `smcs_1`, `smcs_2`) VALUES('".$id."','".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."')"); 
			
		return "ok";
	}
	
	function saveUps($v,$modulo,$id)
	{
		$this->Sql->ejecucion("INSERT INTO ".$modulo."(`idpase`,`160_kv`, `40_kv1`, `40_kv2`) VALUES('".$id."','".$v->id->v1."','".$v->id->v2."','".$v->id->v3."')"); 
			
		return "ok";
	}
	
	function saveDeviceAcu($v,$modulo,$id)
	{			
		$this->Sql->ejecucion("INSERT INTO ".$modulo."(`idpase`,`stracking_status`, `xtracking_status`, `acu_software_status`, `pdu_status`, `dcxs-1_status`, `dcxs-2_status`, `dcxs-1b_status`, `dcxs-2b_status`, `trdcxs-1_status`, `trdcxs-2_status`) VALUES('".$id."','".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."','".$v->id->v9."','".$v->id->v10."')");				
		
		return "ok";
	}
	
	function saveDevice($v,$modulo,$id)
	{
		$this->Sql->ejecucion("INSERT INTO ".$modulo."(`idpase`,`rdr_1_status`, `rdr_1_smcs`, `rdr_2_status`, `rdr_2_smcs`, `matrix_status`, `matrix_smcs`, `san_1_status`, `san_2_status`) VALUES('".$id."','".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."')"); 
		
		return "ok";
	}
	
	
	
	
	
	
	
	
	
	function saveTaskSmcs($v,$modulo)
	{
		$respuesta=$this->getPase($v->fecha,$v->satelite,$v->pase,$v->turno);
		
		if($respuesta!=="no")
		{	
			if($respuesta[1]['id'.$modulo]==="0")
			{
				$utc=$v->id->utc->horas.":".$v->id->utc->minutos.":".$v->id->utc->segundos;
				$local=$v->id->local->horas.":".$v->id->local->minutos.":".$v->id->local->segundos;
				
				$id=$this->Sql->retornar_id("INSERT INTO ".$modulo."(`task_id`, `task_type`, `capture_time_utc`, `capture_time_local`, `area_pais`, `image_data_time`, `area_estado1`, `area_estado2`, `area_estado3`, `area_estado4`, `area_estado5`, `area_estado6`) VALUES('".$v->id->id."','".$v->id->type."','".$utc."','".$local."','".$v->id->paises."','".$v->id->image."','".$v->id->estados1."','".$v->id->estados2."','".$v->id->estados3."','".$v->id->estados4."','".$v->id->estados5."','".$v->id->estados6."')"); 
				
				$this->Sql->ejecucion("UPDATE pase SET id".$modulo."='".$id."' WHERE idpase ='".$respuesta[1]['idpase']."' LIMIT 1;  ");
				
				$respuesta="ok";
			}
			else
			{
				$respuesta="Ya existen un registro de Task List Smcs para la fecha, satelite y número de pase seleccionados";
			}
		}
		else
		{
			$respuesta="No existe un pase para la fecha, satelite y número de pase seleccionados";
		}
		
		return $respuesta;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}

?>