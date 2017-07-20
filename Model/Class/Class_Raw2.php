<?php

class Raw2 extends Query
{
    //Atributos  
	public $tableName="raw_2";
	public $moduleName="Raw Data 2";

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
			"files_received_ch1" => $data->value->v0,			
			"files_ch1_1" => $data->value->v1,
			"files_ch1_2" => $data->value->v2,
			"files_ch1_3" => $data->value->v3,
			"files_ch1_4" => $data->value->v4,
			"files_received_ch2" => $data->value->v5,
			"files_ch2_1" => $data->value->v6,
			"files_ch2_2" => $data->value->v7,
			"files_ch2_3" => $data->value->v8,
			"files_ch2_4" => $data->value->v9,
			"data_size" => $data->value->v10,
			"total_received" => $data->value->v11,
			"total_data_size" => $data->value->v12,
			"transmisition_ips" => $data->value->v13,
			"nota" => htmlentities($data->value->notes)
		);
	}
	
}

?>