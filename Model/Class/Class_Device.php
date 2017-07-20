<?php

class Device extends Query
{
    //Atributos  
	public $tableName="device";
	public $moduleName="Device";

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
			"rdr_1_status" => $data->value->v0,
			"rdr_1_smcs" => $data->value->v1,
			"rdr_2_status" => $data->value->v2,
			"rdr_2_smcs" => $data->value->v3,
			"matrix_status" => $data->value->v4,
			"matrix_smcs" => $data->value->v5,
			"san_1_status" => $data->value->v6,
			"san_2_status" => $data->value->v7,
			"nota" => htmlentities($data->value->notes)
		);
	}
  
}

?>