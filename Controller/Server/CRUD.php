<?php
require_once("../../Model/Class/Class_Route.php");
$Route=new Route();

$Route->includes("php","crud"); 

$data = json_decode(file_get_contents("php://input"));

if(isset($data->module) && $data->module!="") 
{
	switch ($data->module) 
	{
		case "satellite":	   		
	   	    $Satellite=new Satellite;
			echo $Satellite->controller($data);
			break;
			
		case "activity":
			$Activity=new Activity();
			if($data->action==="save")
			{
				$id=$Activity->controller($data);
				if(is_int($id))
				{
					$PassPre=new PassPre;
					echo $PassPre->controller($data,$id);
				}
				else{echo $id;}
			}
			else{echo $Activity->controller($data);}
			break;
			
		case "send":
			$Send=new Send();
			echo $Send->controller($data);
			break;
			
		case "acuSoftwarePre":
			$AcuSoftwarePre=new AcuSoftwarePre();
			echo $AcuSoftwarePre->controller($data);
			break;
			
		case "power":
			$Power=new Power();
			echo $Power->controller($data);
			break;
			
		case "device":
			$Device=new Device();
			echo $Device->controller($data);
			break;
			
		case "deviceAcu":
			$DeviceAcu=new DeviceAcu();
			echo $DeviceAcu->controller($data);
			break;		
			
		case "deviceRF":
			$DeviceRF=new DeviceRF();
			echo $DeviceRF->controller($data);
			break;
			
		case "demulatorPre":
			$DemulatorPre=new DemulatorPre();
			echo $DemulatorPre->controller($data);
			break;
			
		case "rack2":
			$Rack2=new Rack2();
			echo $Rack2->controller($data);
			break;
					
		case "status":
			$Status=new Status();
			echo $Status->controller($data);
			break;
			
		case "ups":
			$Ups=new Ups();
			echo $Ups->controller($data);
			break;
			
		case "taskRdrPre":
			$TaskRdrPre=new TaskRdrPre();
			echo $TaskRdrPre->controller($data);
			break;
			
		case "taskSmcs":
			$TaskSmcs=new TaskSmcs();
			echo $TaskSmcs->controller($data);
			break;
			
		case "acuSoftwareIn":
			$AcuSoftwareIn=new AcuSoftwareIn();
			echo $AcuSoftwareIn->controller($data);
			break;
			
		case "taskRdrIn":
			$TaskRdrIn=new TaskRdrIn();
			echo $TaskRdrIn->controller($data);
			break;
			
		case "demulatorIn":
			$DemulatorIn=new DemulatorIn();
			echo $DemulatorIn->controller($data);
			break;
			
		case "track":
			$Track=new Track();
			echo $Track->controller($data);
			break;
		
		case "acuSoftwarePost":
			$AcuSoftwarePost=new AcuSoftwarePost();
			echo $AcuSoftwarePost->controller($data);
			break;
			
		case "passPost":
			$PassPost=new PassPost();
			echo $PassPost->controller($data);
			break;
			
		case "raw1":
			$Raw1=new Raw1();
			echo $Raw1->controller($data);
			break;
			
		case "raw2":
			$Raw2=new Raw2();
			echo $Raw2->controller($data);
			break;		
			
		default:
			return "nada";
	}
}
?>