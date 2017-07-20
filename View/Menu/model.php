<?php
	$_GET["controller"]="declareInitialize";
	
	include("../../Model/Class/Class_Route.php");
	$Route=new Route();	
	$Route->includes("php","head"); 
	$Route->includes("js","base");
	$Route->includes("js","declareInitialize");  
	$Route->includes("css","menu"); 
	$Route->includes("css","container");
?>
<body>


<div class="container">
    
   <div ng-include src="route.shortcut.menu" ></div> 
    
    
</div>
</body>
</html>
