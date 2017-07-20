<?php

class AcuSoftwarePre extends Query
{
    //Atributos  
	public $tableName="acu_software_pre";
	public $moduleName="Acu Software";

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
			"max_elev" => $data->value->v0,
			"nota" => htmlentities($data->value->notes)
		);
	}
  
}

?>