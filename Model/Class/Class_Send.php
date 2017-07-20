<?php
class Send extends Query
{
    //Atributos  
	public $tableName="send";
	public $moduleName="Send Guide File";

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
		//Campos prelados por blt
		if($data->blt===false)
		{
			$data->value->v1="";
			$data->value->v2="";
		}
		
		return array
		(
			"send_guide_acu" => $data->value->v0,
			"send_guide_rdr1" =>  $data->value->v1,
			"send_guide_rdr2" =>  $data->value->v2,
			"nota" => htmlentities($data->value->notes)
		);
	}
	
	
}

?>