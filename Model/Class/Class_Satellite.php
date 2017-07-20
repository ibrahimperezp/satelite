<?php


class Satellite extends Query
{
    //Atributos 
	var $action;
	public $tableName="satelite";
	public $moduleName="satelite";
	
    //Funcion Constructora
    function Satellite()
    {
     	parent::__construct($this->tableName,$this->moduleName);
    }
	
	function controller($data)
	{
		switch ($data->action) 
		{
			case "save":
				return $this->saveSatellite($data->value->name);
				
			case "delete":				
				return $this->deleteSatellite($data->id);
				
			case "read":
				return $this->readSatellite($data);
				
			default:
				return "Opcion desconocida";
		}
	}

	function saveSatellite($name)
	{		
		if(!$this->check("SELECT * FROM satelite WHERE satelite_nombre='".$name."' LIMIT 1;"))
		{
			$this->execute("INSERT INTO satelite(satelite_nombre)VALUES('".$name."');");
			return json_encode(array("ok","Satélite guardado"));
		}
		else {return "Ya existe un satélite con ese nombre";}
	}
	
	function satelliteName($id)
	{			
		$reg=$this->getRaw("SELECT * FROM satelite WHERE idsatelite='".$id."' LIMIT 1;");
		return $reg[0]["satellite_nombre"];
	}
	
	
	
	function readSatellite()
	{	
		if($this->check("SELECT * FROM satelite"))
		{
			$reg=$this->getRaw("SELECT * FROM satelite ORDER BY idsatelite ASC;");
			return json_encode($reg);				
		}
	}
	
	function deleteSatellite($id)
	{
		if($this->check("SELECT * FROM pase WHERE idsatelite =".$id." LIMIT 1;"))
		{
			return "No se puede eliminar porque existen pases asociados a dicho satélite";			
		}
		else
		{		
			$this->execute("DELETE FROM satelite WHERE idsatelite=".$id.";");
			return json_encode(array("ok","Satélite borrado"));	
		}
	}
	
	
}
?>