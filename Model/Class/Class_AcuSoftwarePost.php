<?php

class AcuSoftwarePost extends Query
{
    //Atributos  
	public $tableName="acu_software_post";
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
			"record_time" => $data->value->record,
			"return_zero" => $data->value->v0,
			"nota" => htmlentities($data->value->notes)
		);
	}
	
	
}

?>