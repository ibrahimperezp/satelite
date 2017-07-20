<?php

class Status extends Query
{
    //Atributos  
	public $tableName="status";
	public $moduleName="Status";

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
			"mod_status" => $data->value->v0, 
			"mod_smcs" => $data->value->v1, 
			"gps_lock_status" => $data->value->v2, 
			"nport_status" => $data->value->v3, 
			"smcs_1" => $data->value->v4, 
			"smcs_2" => $data->value->v5,
			"nota" => htmlentities($data->value->notes)
		);
	}

}

?>