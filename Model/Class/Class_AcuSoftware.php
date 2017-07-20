<?php


class AcuSoftware
{
    //Atributos        
    
    var $MySql="";  
	var $action;
	var $DB_name="`acu_software`";
	var $table_name="Acu Software";
    //Funcion Constructora
    function AcuSoftware()
    {
     /* $this->MySql=new MySql();*/
    }
	
	
	
	function controller($data)
	{
		switch ($data->action) 
		{
			case "save":
				return $this->saveAcuSoftware($data);
		}
	}
	
	function settings($data)
	{
		return array
		(
			"max_elev" => $data->value->v0,
		);
	}
	
	function match($data,$id)
	{
		$settings=$this->settings($data);
		$insert="INSERT INTO ".$this->DB_name." (`idpase`,";
		$values="VALUES ('".$id."',";
		$keys=array_keys($settings);
		$length=count($keys);
		
		for($i=0;$i<$length;$i++)
		{
			$insert.="`".$keys[$i]."`";
			$values.="'".$settings[$keys[$i]]."'";
			if(($i+1)<$length)
			{
				$insert.=",";
				$values.=",";
			}
		}
		
		$insert.=") ";
		$values.=");";
		return $insert.$values;
	}

	function saveAcuSoftware($data)
	{	
		$id=$data->pass;
		$query=$this->match($data,$id);	
		
		if(!$this->MySql->existe_registro("SELECT * FROM ".$this->DB_name." WHERE idpase='".$id."' LIMIT 1;"))
		{
			$this->MySql->ejecucion($query);
			return "ok";
		}
		else {return "Ya existe un registro ".$this->table_name." para esta actividad";}
	}
	
	
}
?>