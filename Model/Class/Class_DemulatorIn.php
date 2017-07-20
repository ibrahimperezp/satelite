<?php

class DemulatorIn extends Query
{
    //Atributos  
	public $tableName="demulator_in";
	public $moduleName="Demulator";

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
			"code_syn" => $data->value->v0,
			"carrier_capture" => $data->value->v1,
			"frame_syn" => $data->value->v2,
			"total_eb_no1" => $data->value->v3,
			"total_eb_no2" => $data->value->v4,
			"total_eb_no3" => $data->value->v5,
			"nota" => htmlentities($data->value->notes)
		);
	}

  
}

?>