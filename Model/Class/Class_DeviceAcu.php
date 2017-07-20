<?php

class DeviceAcu extends Query
{
    //Atributos  
	public $tableName="device_acu";
	public $moduleName="Device Acu";

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
			"stracking_status" => $data->value->v0,
			"xtracking_status" => $data->value->v1,
			"acu_software_status" => $data->value->v2,
			"pdu_status" => $data->value->v3,
			"dcxs-1_status" => $data->value->v4,
			"dcxs-2_status" => $data->value->v5,
			"dcxs-1b_status" => $data->value->v6,
			"dcxs-2b_status" => $data->value->v7,
			"trdcxs-1_status" => $data->value->v8,
			"trdcxs-2_status" => $data->value->v9,
			"lna-x" => $data->value->v10,
			"lna-s" => $data->value->v11,
			"humidity" => $data->value->v12,
			"temperature" => $data->value->v13,
			"nota" => htmlentities($data->value->notes)
		);
	}
	
	public function saveDeviceAcu($data,$id)
	{
		$insert=$this->insert($this->settings($data),$id);
		$this->execute($insert);
		return "ok";
	}  
}

?>