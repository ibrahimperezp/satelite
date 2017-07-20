<?php

class TaskRdrPre extends Query
{
    //Atributos  
	public $tableName="task_rdr_pre";
	public $moduleName="Task List Rdr";

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
				if($data->pass!==""){return $this->saveOrEditTaskRdrPre($data,$data->pass);}
				else{return $this->saveOrEdit($this->settings($data),$data->pass,$this->moduleName);}
				
			case "select":
				return $this->selectTaskRdrPre($data->id);						
				
		}
	}
	
	protected function settings($data)
	{
		if($data->pass=="")
		{
			return array
			(
				"task_id" => $data->value->id,
				"orbit" => $data->value->orbit,
				"utc1" => NULL,
				"local1" => NULL,
				"meridium1" => $data->value->meridium0,
				"utc2" => NULL,
				"local2" => NULL,
				"meridium2" => $data->value->meridium1,
				"trans_mode" => $data->value->trans,
				"image" => $data->value->image,
				"nota" => htmlentities($data->value->notes)
			);
		}
		else
		{
			return array
			(
				"task_id" => $data->value->id,
				"orbit" => $data->value->orbit,
				"utc1" => $data->value->hour0.":".$data->value->minute0.":".$data->value->second0,
				"local1" => $data->value->hour1.":".$data->value->minute1.":".$data->value->second1,
				"meridium1" => $data->value->meridium0,
				"utc2" => $data->value->hour2.":".$data->value->minute2.":".$data->value->second2,
				"local2" => $data->value->hour3.":".$data->value->minute3.":".$data->value->second3,
				"meridium2" => $data->value->meridium1,
				"trans_mode" => $data->value->trans,
				"image" => $data->value->image,
				"nota" => htmlentities($data->value->notes)
			);
		}
	}
	
	//Guarda en base de datos el estado en caso de que sea requerido
	protected function saveState($data,$id,$i)
	{
		$l=count($data->value->subArea[$i]);
		
		for($w=0;$w<$l;$w++)
		{			
			if(isset($data->value->subArea[$i][$w]))
			{
				$state=$data->value->subArea[$i][$w];
				if(isset($state) && gettype($state)==="string" && $state!=="")
				{
					$this->execute("INSERT INTO state (idpase,state) VALUES('".$id."','".$state."');");
				}
			}
		}
	}
	
	//Guarda en base de datos el area en caso de que sea requerido
	protected function saveArea($data,$id)
	{
		$length=count($data->value->area);		
		for($i=0;$i<$length;$i++)
		{
			$area=$data->value->area[$i];
			if(gettype($area)==="string"  && $area!=="")
			{
				$this->execute("INSERT INTO area (idpase,pais) VALUES('".$id."','".$area."');");				
				if($area==="Venezuela"){$this->saveState($data,$id,$i);}
			}
		}
	}
	
	protected function saveTaskRdrPRe($data,$id)
	{
		$insert=$this->insert($this->settings($data),$id);
		$this->execute($insert);		
		$this->saveArea($data,$id);		
		return "ok";
	}
		
	//Borra un registro task list scms, con sus paises y estados en caso que existan
	protected function deleteAll($id)
	{
		if($this->checkModule($id))
		{
			$this->execute("DELETE FROM `state` WHERE `state`.`idpase` = ".$id.";");
			$this->execute("DELETE FROM `area` WHERE `area`.`idpase` = ".$id.";");
			$this->execute("DELETE FROM `".$this->tableName."` WHERE `idpase` = ".$id.";");
			return true;
		}
		return false;
	}
	
	
	//Selecciona un modulo
	protected function saveOrEditTaskRdrPRe($data,$id)
	{
		$code="";
		$type="guardado";
		
		//Si existe un registro para dicho pase, se borra para crear uno nuevo en lugar de modificar
		if($this->deleteAll($id)){$type="modificado";}	
	
		$this->saveTaskRdrPre($data,$id);
		return json_encode(array("ok","Registro ".$this->moduleName." ".$type." satisfactoriamente"));
	}
	
	
	protected function selectLocation(&$array,$id)
	{
		if($this->check("SELECT * FROM area WHERE idpase ='".$id."'"))
		{
			$area=$this->getArranged("SELECT * FROM area WHERE idpase ='".$id."';");
			$array["area"]=$area;
			
			if($this->check("SELECT * FROM state WHERE idpase ='".$id."'"))
			{
				$state=$this->getArranged("SELECT * FROM state WHERE idpase ='".$id."';");
				$array['state']=$state;
			}			
		}
	}
	
	//Selecciona un modulo
	protected function selectTaskRdrPre($id)
	{
		if($this->checkModule($id))
		{
			$send=$this->getArranged("SELECT * FROM ".$this->tableName." WHERE idpase ='".$id."'  LIMIT 1;");
			$array=$send[1];			
			$this->selectLocation($array,$id);
			
			return  json_encode($array);
		}
		return false;
	}
  
}

?>