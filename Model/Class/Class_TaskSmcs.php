<?php

class TaskSmcs extends Query
{
    //Atributos  
	public $tableName="task_smcs";
	public $moduleName="Task List Smcs";

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
	
	protected function settings($data)
	{
		return array
		(
			"orbit" => $data->value->orbit,
			"task_id" => $data->value->id,
			"task_type" => $data->value->type,
			"utc1" => $data->value->hour0.":".$data->value->minute0.":".$data->value->second0,
			"local1" => $data->value->hour1.":".$data->value->minute1.":".$data->value->second1,
			"meridium1" => $data->value->meridium0,
			"utc2" => $data->value->hour2.":".$data->value->minute2.":".$data->value->second2,
			"local2" => $data->value->hour3.":".$data->value->minute3.":".$data->value->second3,
			"meridium2" => $data->value->meridium1,
			"nota" => htmlentities($data->value->notes)
		);
	}
  
}

?>