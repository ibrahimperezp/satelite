<?php
	$_GET["controller"]="dialog";
	
	include("../../Model/Class/Class_Route.php");
	$Route=new Route();	
	$Route->includes("php","head"); 
	$Route->includes("js","base");
	$Route->includes("js","dialog");
	$Route->includes("css","dialog"); 
?>


<body >
	<div class="container">
		<div ng-include src="route.shortcut.dialog" ></div> 
    </div>
</body>
</html>