<?php

class PassPost extends Query
{
    //Atributos  
	public $tableName="pass_post";
	public $moduleName="Pass Mode";

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
			"efective_task" => $data->value->v0,
			"nota" => htmlentities($data->value->notes)
		);
	}

  
}

?>