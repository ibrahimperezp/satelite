<?php

class AcuSoftwareIn extends Query
{
    //Atributos  
	public $tableName="acu_software_in";
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
			"uagc_x" => $data->value->v0,
			"uagc_s" => $data->value->v1,
			"stracking_el" => $data->value->v2,
			"stracking_uagc" => $data->value->v3,
			"xtracking_el" => $data->value->v4,
			"xtracking_uagc" => $data->value->v5,
			"nota" => htmlentities($data->value->notes)
		);
	}
	
  
}

?>