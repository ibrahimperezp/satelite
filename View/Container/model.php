<?php
	$_GET["title"]="contenedor";
	include("../../Model/Class/Class_Route.php");
	$Route=new Route();
	$Route->includes("php","normal"); 
	$Route->includes("css","container"); 
?>


<body>
    <div class="container">      
    </div> 
</body>
</html>