<?php
	include("../../Model/Class/Class_Route.php");
	$Route=new Route();	
	$Route->shortcut("base","dialog");
	$Route->includes("js","dialog");
?>


<body >
	<div ng-include src="route.shortcut.dialog" ></div> 
    
	<div class="container">
    	<div ng-include src="route.shortcut.header" ></div> 
    
    	<div ng-include src="route.shortcut.menu" ></div> 		
    </div>
</body>
</html>