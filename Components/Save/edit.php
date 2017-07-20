<?php	
	$_GET["module"]="edit";
	include("../../Model/Class/Class_Route.php");
	$Route=new Route();	
	$Route->includes("php","save");
?>
