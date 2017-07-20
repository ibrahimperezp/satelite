<?php
/*include("Class_MySql.php");*/
class Query extends MySql
{    	   
    //Atributos     	   
    protected $password="";
    protected $server="localhost";
    protected $user="root";
    protected $dataBase="satelite";
	protected $idPass="idpase";
	protected $tableName;
	protected $moduleName;
	
    //Función Constructora
    protected function __construct($tableName,$moduleName)
    {
		parent::__construct($this->server,$this->user,$this->password,$this->dataBase);
		$this->tableName=$tableName;
		$this->moduleName=$moduleName;
    }
	
	//Selecciona un modulo
	protected function selectModule($id)
	{
		if($this->check("SELECT * FROM ".$this->tableName." WHERE idpase ='".$id."'  LIMIT 1;"))
		{
			$send=$this->getArranged("SELECT * FROM ".$this->tableName." WHERE idpase ='".$id."'  LIMIT 1;");
			$array=$send[1];
			return  json_encode($array);
		}
		return false;
	}
	
	//Retorna un string con el codigo necesario para guardar en base de datos
	protected function insert($settings,$id="")
	{
		$insert="INSERT INTO ".$this->tableName." (";
		$values="VALUES (";
		
		if($id!=="")
		{
			$insert.="`idpase`,";
			$values.=$id.",";
		}
		
		$keys=array_keys($settings);
		$length=count($keys);
		
		for($i=0;$i<$length;$i++)
		{
			$insert.="`".$keys[$i]."`";
			$values.="'".$settings[$keys[$i]]."'";
			if(($i+1)<$length)
			{
				$insert.=",";
				$values.=",";
			}
		}
		
		$insert.=") ";
		$values.=");";
		return $insert.$values;
	}
	
	protected function update($settings,$id)
	{
		$update="UPDATE ".$this->tableName." SET ";
		
		$keys=array_keys($settings);
		$length=count($keys);
		
		for($i=0;$i<$length;$i++)
		{
			$update.="`".$keys[$i]."`";
			$update.="='".$settings[$keys[$i]]."'";
			if(($i+1)<$length){$update.=",";}
		}
		
		$update.=" WHERE `idpase`=".$id;
		return $update;
	}
	
	protected function saveOrEdit($settings,$id,$name)
	{
		$code="";
		$type="";
		if($this->checkModule($id)){$code=$this->update($settings,$id);$type="modificado";}
		else{$code=$this->insert($settings,$id);$type="guardado";}
		
		$this->execute($code);
		return json_encode(array("ok","Registro ".$name." ".$type." satisfactoriamente"));
	}
	
	protected function checkModule($id)
	{
		if($this->check("SELECT * FROM ".$this->tableName." WHERE idpase ='".$id."'  LIMIT 1;")){return true;}
		return false;
	}
	

	protected function pushing($a,$b)
	{
		$length=count($b);
		for($p=0;$p<$length;$p++)
		{
			array_push($a,$b[$p]);
		}
		return $a;
	}
	
	protected function modules()
	{
		$new=$this->pre();
		$new=$this->pushing($new,$this->in());
		$new=$this->pushing($new,$this->post());
		
		return $new;
	}
	
	protected function pre()
	{
		return array("send","acu_software_pre","power","device","device_acu","device_rf","rack_2","status","ups","task_rdr_pre","task_smcs","pass_pre","demulator_pre");
	}
	
	
	protected function in()
	{
		return array("acu_software_in","task_rdr_in","demulator_in","track");
	}
	
	protected function post()
	{
		return array("acu_software_post","pass_post","raw_1","raw_2");
	}
	
	protected function translateModule($module)
	{
		if($module==="acu_software_pre"){return "acuSoftwarePre";}
		else if($module==="demulator_in"){return "demulatorIn";}
		else if($module==="demulator_pre"){return "demulatorPre";}
		else if($module==="device_acu"){return "deviceAcu";}
		else if($module=="device_rf"){return "deviceRF";}
		else if($module==="rack_2"){return "rack2";}
		else if($module==="task_rdr_pre"){return "taskRdrPre";}
		else if($module==="task_smcs"){return "taskSmcs";}
		else if($module==="pass_pre"){return "passPre";}
		else if($module==="acu_software_in"){return "acuSoftwareIn";}
		else if($module==="task_rdr_in"){return "taskRdrIn";}
		else if($module==="acu_software_post"){return "acuSoftwarePost";}
		else if($module==="pass_post"){return "passPost";}
		else if($module==="raw_1"){return "raw1";}
		else if($module==="raw_2"){return "raw2";}
		else{return $module;}
	}
}

?>