<?php

class Track extends Query
{
    //Atributos  
	public $tableName="track";
	public $moduleName="Track Receiver";

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
			"dpu_working_s" => $data->value->v0,
			"dpu_working_x" => $data->value->v1,
			"dtr_lock_s" => $data->value->v2,
			"dtr_lock_x" => $data->value->v3,
			"dem_lock_s" => $data->value->v4,
			"dem_lock_x" => $data->value->v5,
			"agc_volt_s" => $data->value->v6,
			"agc_volt_x" => $data->value->v7,
			"input_power_s" => $data->value->v8,
			"input_power_x" => $data->value->v9,
			"nota" => htmlentities($data->value->notes)
		);
	}
}

?>