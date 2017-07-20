<?php

class Rack2 extends Query
{
    //Atributos  
	public $tableName="rack_2";
	public $moduleName="Rack #2";

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
			"matrix_status" => $data->value->v0,
			"matrix_smcs" => $data->value->v1,
			"dem_1_status" => $data->value->v2, 
			"dem_1_smcs" => $data->value->v3, 
			"dem_2_status" => $data->value->v4, 
			"dem_2_smcs" => $data->value->v5, 
			"dem_3_status" => $data->value->v6, 
			"dem_3_smcs" => $data->value->v7,
			"nota" => htmlentities($data->value->notes)
		);
	}

}

?>