<?php
	$_GET["title"]="Encabezado";
	include("../../Model/Class/Class_Route.php");
	$Route=new Route();
	$Route->includes("php","normal"); 
	$Route->includes("css","header"); 
?>


<body>
    <div ng-include src="route.shortcut.header" ></div> 
</body>
</html>