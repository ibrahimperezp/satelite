<?php

class DemulatorPre extends Query
{
    //Atributos  
	public $tableName="demulator_pre";
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
			"dem" => $data->value->v0,
			"smcs" => $data->value->v1,
			"nota" => htmlentities($data->value->notes)
		);
	}

}

?>