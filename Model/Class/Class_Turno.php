<?php
class Turno
{
	//Atributos
	var $Sql;
	
	function Turno()
	{
		$this->Sql=new Sql();
	}
	
	function fechaTurno($f,$t,$m,$s)
	{
		$respuesta="ok";
		if($this->Sql->existe_registro("SELECT * FROM turno WHERE fecha ='".$f."' AND local_time='".$t."' AND idsatelite='".$s."' LIMIT 1;"))
		{
			$t=$this->Sql->retornar_registro("SELECT * FROM turno WHERE fecha ='".$f."' AND local_time='".$t."' AND idsatelite='".$s."' LIMIT 1;");
			if(($t[1]['id'.$m]+0)!==0)
			{
				
				$respuesta="No se pudo guardar porque ya existe un registro ".$m." para la fecha, satelite y turno seleccionados";
			}
		} 
		else
		{
			$this->Sql->ejecucion("INSERT INTO turno(local_time,fecha,idsatelite) 
			VALUES('".$t."','".$f."','".$s."')");
		}
		return $respuesta;
	}
	
	function saveDeviceRF($v,$modulo)
	{
		$respuesta=$this->fechaTurno($v->fecha,$v->turno,$modulo,$v->satelite);
		
		if($respuesta==="ok")
		{
			$id=$this->Sql->retornar_id("INSERT INTO ".$modulo."(`xdata_1_status`, `xdata_1_smcs`, `xdata_2_status`, `xdata_2_smcs`, `xdata_1b_status`, `xdata_1b_smcs`, `xdata_2b_status`, `xdata_2b_smcs`, `test_s_status`, `test_s_smcs`, `xtracking_1_status`, `xtracking_1b_status`, `stracking_1_status`, `stracking_1b_status`, `nport_status`) VALUES('".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."','".$v->id->v9."','".$v->id->v10."','".$v->id->v11."','".$v->id->v12."','".$v->id->v13."','".$v->id->v14."','".$v->id->v15."')"); 
			
			$this->Sql->ejecucion("UPDATE turno SET id".$modulo."='".$id."' WHERE fecha='".$v->fecha."' AND local_time='".$v->turno."'");
		}		
		
		return $respuesta;
	}
	
	
	function saveDeviceA($v,$modulo)
	{
		$respuesta=$this->fechaTurno($v->fecha,$v->turno,$modulo,$v->satelite);
		
		if($respuesta==="ok")
		{
			$id=$this->Sql->retornar_id("INSERT INTO ".$modulo."(`stracking_status`, `xtracking_status`, `acu_software_status`, `pdu_status`, `dcxs-1_status`, `dcxs-2_status`, `dcxs-1b_status`, `dcxs-2b_status`, `trdcxs-1_status`, `trdcxs-2_status`) VALUES('".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."','".$v->id->v9."','".$v->id->v10."')"); 
			
			$this->Sql->ejecucion("UPDATE turno SET id".$modulo."='".$id."' WHERE fecha='".$v->fecha."' AND idsatelite='".$v->satelite."'  AND local_time='".$v->turno."'");
		}		
		
		return $respuesta;
	}
	
	
	function saveRack2($v,$modulo)
	{
		$respuesta=$this->fechaTurno($v->fecha,$v->turno,$modulo,$v->satelite);
		
		if($respuesta==="ok")
		{
			$id=$this->Sql->retornar_id("INSERT INTO ".$modulo."( `matrix_status`, `matrix_smcs`, `dem_1_status`, `dem_1_smcs`, `dem_2_status`, `dem_2_smcs`, `dem_3_status`, `dem_3_smcs`) VALUES('".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."')"); 
			
			$this->Sql->ejecucion("UPDATE turno SET id".$modulo."='".$id."' WHERE fecha='".$v->fecha."' AND idsatelite='".$v->satelite."'  AND local_time='".$v->turno."'");
		}		
		
		return $respuesta;
	}
	
	function saveStatus($v,$modulo)
	{
		$respuesta=$this->fechaTurno($v->fecha,$v->turno,$modulo,$v->satelite);
		
		if($respuesta==="ok")
		{
			$id=$this->Sql->retornar_id("INSERT INTO ".$modulo."( `mod_status`, `mod_smcs`, `gps_lock_status`, `nport_status`, `smcs_1`, `smcs_2`) VALUES('".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."')"); 
			
			$this->Sql->ejecucion("UPDATE turno SET id".$modulo."='".$id."' WHERE fecha='".$v->fecha."' AND idsatelite='".$v->satelite."'  AND local_time='".$v->turno."'");
		}		
		
		return $respuesta;
	}
	
	function saveDevice($v,$modulo)
	{
		$respuesta=$this->fechaTurno($v->fecha,$v->turno,$modulo,$v->satelite);
		
		if($respuesta==="ok")
		{
			$id=$this->Sql->retornar_id("INSERT INTO ".$modulo."(`rdr_1_status`, `rdr_1_smcs`, `rdr_2_status`, `rdr_2_smcs`, `matrix_status`, `matrix_smcs`, `san_1_status`, `san_2_status`) VALUES('".$v->id->v1."','".$v->id->v2."','".$v->id->v3."','".$v->id->v4."','".$v->id->v5."','".$v->id->v6."','".$v->id->v7."','".$v->id->v8."')"); 
			
			$this->Sql->ejecucion("UPDATE turno SET id".$modulo."='".$id."' WHERE fecha='".$v->fecha."' AND idsatelite='".$v->satelite."'  AND local_time='".$v->turno."'");
		}		
		
		return $respuesta;
	}
	
	function saveUps($v,$modulo)
	{
		$respuesta=$this->fechaTurno($v->fecha,$v->turno,$modulo,$v->satelite);
		
		if($respuesta==="ok")
		{
			$id=$this->Sql->retornar_id("INSERT INTO ".$modulo."(`160_kv`, `40_kv1`, `40_kv2`) VALUES('".$v->id->v1."','".$v->id->v2."','".$v->id->v3."')"); 
			
			$this->Sql->ejecucion("UPDATE turno SET id".$modulo."='".$id."' WHERE fecha='".$v->fecha."'  AND idsatelite='".$v->satelite."' AND local_time='".$v->turno."'");
		}		
		
		return $respuesta;
	}
	
	
	
}

?>