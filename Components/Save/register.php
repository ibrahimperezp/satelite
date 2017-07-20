<?php	
	$_GET["module"]="register";
	include("../../Model/Class/Class_Route.php");
	$Route=new Route();	
	$Route->includes("php","save");
?>
