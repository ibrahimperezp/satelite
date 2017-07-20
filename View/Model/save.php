<?php	
	$Route=new Route();	
	$Route->shortcut("base","save");
	$Route->includes("js","save");
?>


<body>
	<!--Vista de dialog-->
    <div ng-include src="route.shortcut.dialog" ></div> 
    
    <div class="container">
    	<!--Vista de header-->
        <div ng-include src="route.shortcut.header" ></div> 
        
        <!--Vista de menu-->
        <div ng-include src="route.shortcut.menu" ></div> 
       
        <!--Vista de activity-->
        <div ng-include src="route.shortcut.<?php echo $_GET["module"]; ?>" ></div> 
      
    </div>
</body>
</html>
