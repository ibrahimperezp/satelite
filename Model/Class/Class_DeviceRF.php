<?php

class DeviceRF extends Query
{
    //Atributos  
	public $tableName="device_rf";
	public $moduleName="Device RF";

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
			"xdata_1_status" => $data->value->v0,
			"xdata_1_smcs" => $data->value->v1,
			"xdata_2_status" => $data->value->v2,
			"xdata_2_smcs" => $data->value->v3,
			"xdata_1b_status" => $data->value->v4,
			"xdata_1b_smcs" => $data->value->v5,
			"xdata_2b_status" => $data->value->v6,
			"xdata_2b_smcs" => $data->value->v7,
			"test_s_status" => $data->value->v8,
			"test_s_smcs" => $data->value->v9,
			"xtracking_1_status" => $data->value->v10,
			"xtracking_1b_status" => $data->value->v11,
			"stracking_1_status" => $data->value->v12,
			"stracking_1b_status" => $data->value->v13,
			"nport_status" => $data->value->v14,
			"nota" => htmlentities($data->value->notes)
		);
	}

}

?>
