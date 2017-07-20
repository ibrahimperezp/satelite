<?php
class PassPre extends Query
{
    //Atributos  
	public $tableName="pass_pre";
	public $moduleName="Pass Mode";

    //Funcion Constructora
    public function __construct()
    {
        parent::__construct($this->tableName,$this->moduleName);
    }
	
	public function controller($data,$idpass)
	{
		switch ($data->action) 
		{
			case "save":
				return $this->saveOrEdit($this->settings($data),$idpass,"actividad ");
				
			case "select":
				return $this->selectModule($data->id);				
		}
	}
	
	public function settings($data)
	{
		$r=array("v","v","v","v","v");
		$r[$data->value->v0]="s";
		return array
		(
			"real_time" => $r[1],
			"cu_real_time" => $r[2],
			"playback" => $r[3],
			"backup_local_task" => $r[4],
			"nota" => htmlentities($data->value->notes)
		);
	}
	
}

?>