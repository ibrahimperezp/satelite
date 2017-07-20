<?php

class Ups extends Query
{
    //Atributos  
	public $tableName="ups";
	public $moduleName="Status Ups Romm";

    //Funcion Constructora
    public function __construct()
    {
        parent::__construct($this->tableName,$this->moduleName);
    }
	
	public function controller($data)
	{
		switch ($data->action) 
		{
			case "saveOrEdit":
				return $this->saveOrEdit($this->settings($data),$data->pass,$this->moduleName);
				
			case "select":
				return $this->selectModule($data->id);
				
				
		}
	}
	
	function settings($data)
	{
		return array
		(
			"160_kv" => $data->value->v0, 
			"40_kv1" => $data->value->v1, 
			"40_kv2" => $data->value->v2,
			"nota" => htmlentities($data->value->notes)
		);
	}
  
}

?>