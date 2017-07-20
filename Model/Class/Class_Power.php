<?php

class Power extends Query
{
    //Atributos  
	public $tableName="power";
	public $moduleName="Power";

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
	
	public function settings($data)
	{
		return array
		(
			"emergency_button" => $data->value->v0,
			"tilt" => $data->value->v1,
			"azimut" => $data->value->v2,
			"elevation" => $data->value->v3,
			"antenna_position"  => $data->value->v4,
			"nota" => htmlentities($data->value->notes)
		);
	}
	
  
}

?>