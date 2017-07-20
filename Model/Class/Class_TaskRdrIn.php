<?php

class TaskRdrIn extends Query
{
    //Atributos  
	protected $tableName="task_rdr_in";
	protected $moduleName="Task List Rdr";

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
				
			case "searchCh":
				return $this->searchCh($data);
				
				
		}
	}
	protected function arrangeDate($array,$type="month")
	{
		$return=array();
		for($i=1;$i<=$array[0];$i++)
		{
			if($this->check("SELECT * FROM ".$this->tableName." WHERE idpase= '".$array[$i]["idpase"]."'"))
			{
				$reg=$this->getArranged("SELECT * FROM ".$this->tableName." WHERE idpase= '".$array[$i]["idpase"]."' LIMIT 1");					
				$fecha=$array[$i]["fecha"];
				$date=explode("-",$fecha);
				$name=$date[0]."-".$date[1];
				if(!isset($return[$name]))	
				{
					$return[$name]=array
					(
						"ch1" =>0,
						"ch2" =>0,
						"total1" => 0,
						"total2" => 0,
						"media1" => 0,
						"media2" => 0,
						"dias" => array(),
						"mes" => $date[1],
						"year" => $date[0]					
					);
				}				
				
				
				$reg[1]["fecha"]=$fecha;
				
				$return[$name]["ch1"]+=$reg[1]["ch1_rate"];
				$return[$name]["ch2"]+=$reg[1]["ch2_rate"];
				
				++$return[$name]["total1"];
				++$return[$name]["total2"];
				
				$return[$name]["media1"]=($return[$name]["ch1"]/$return[$name]["total1"]);
				$return[$name]["media2"]=($return[$name]["ch2"]/$return[$name]["total2"]);					
				
				array_push($return[$name]["dias"],$reg[1]);
			}		
		}
		return $return;
	}
	
	
	protected function searchCh($data)
	{
		//Busca las fechas en los pases porque las activades no tienen fecha sino numero de pase
		if($this->check("SELECT * FROM pase WHERE fecha BETWEEN '".$data->start."' AND '".$data->end."' AND idsatelite=".$data->satellite.""))
		{
			$id=$this->getArranged("SELECT * FROM pase  WHERE fecha BETWEEN '".$data->start."' AND '".$data->end."'  AND idsatelite=".$data->satellite." ORDER BY fecha;");
			
			$dates=array();
				
			return json_encode($this->arrangeDate($id));
			
		}
		
		return "no";
	}
	
	protected function settings($data)
	{
		return array
		(
			"ch1_rate" => $data->value->v0,
			"ch2_rate" => $data->value->v1,
			"nota" => htmlentities($data->value->notes)
		);
	}

	
}

?>