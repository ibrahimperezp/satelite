<?php
class PassMode
{
    //Atributos     	   
    var $MySql="";

    //Funcion Constructora
    function PassMode()
    {
        
    }
	
	function controller($data,$idpass)
	{
		switch ($data->action) 
		{
			case "save":
				return $this->savePassMode($data->data,$idpass);
				
			case "delete":				
				return $this->deleteSatellite($data->id);
				
			case "read":
				return $this->readSatellite($data);
				
			default:
				return $this->Message["unknownOption"];
		}
	}

	function savePassMode($data,$id)
	{
		if(is_numeric($id))
		{
			$modulo="pass_mode";
			$r=array("v","v","v","v","v");
			$r[$data->v0]="s";
			
			$this->MySql->ejecucion("INSERT INTO ".$modulo."(`idpase`,`real_time`, `cu_real_time`, `playback`, `backup_local_task`) VALUES('".$id."','".$r[1]."','".$r[2]."','".$r[3]."','".$r[4]."')"); 
			return 'ok';
		}
		return $id;
	}
  
}

?>