<!DOCTYPE html >
<html lang="es" ng-app="satelite" ng-controller="controller">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Prepase</title>
<script src="../../../../Model/Js/Angular/Core/angularV1.js"></script>
<script src="../../../../Model/Js/Angular/Dependency/angular-route.js"></script>
<script src="../../../../Model/Js/Angular/App/app.js"></script>
<script src="../../../../Model/Js/Angular/Service/dialog.js"></script>
<script src="../../../../Model/Js/Angular/Service/route.js"></script>
<script src="../../../../Model/Js/Angular/Service/declareInitialize.js"></script>
<script src="../../../../Model/Js/Angular/Service/validate.js"></script>
<script src="../../../../Model/Js/Angular/Service/setData.js"></script>
<script src="../../../../Model/Js/Angular/Controller/controller.js"></script>

<link rel="stylesheet" href="../../../../View/Style/trend.css" type="text/css">
<link rel="stylesheet" href="../../../../View/Style/binary.css" type="text/css">
<link rel="stylesheet" href="../../../../View/Style/dialog.css" type="text/css">
</head>


<body>
    <div ng-include src="route.shortcut.dialog" ></div>  
    
    <div >   
        <table border="1" align="center"   >
            <tr>
                <td >Satélite : </td>
                <td >
                    <select  ng-init="getSatellites()" ng-model="pass.satellite"  >
                        <option  ng-repeat="s in pass.satellites"  value="{{s.idsatelite}}" >{{s.satelite_nombre}}</option>
                    </select>
                </td>
            </tr>
        
            <tr>
                <td >Fecha : </td>
                <td >
                    <input id="passDate"  type="date"  >
                    <input type="button" ng-click="readDate();" value="Obtener"  > 
                </td>                
            </tr>
           
            <tr >
                <td >Local time : </td>
                <td >
   					<input type="radio"  ng-model="pass.turn" name="turn" id="diurnal" value="d">               
                	<label  for="diurnal"><img src="../../../../Image/sol.png"></label>
               
                	<input  type="radio"  ng-model="pass.turn"  name="turn" id="nocturnal" value="n">
                   	<label  for="nocturnal"><img src="../../../../Image/luna.png"></label>
               
               		<span  class="nocturnal">7:30 PM - 12:00 AM</span>
               		<span  class="diurnal">8:30 AM - 1:30 PM</span>                    
                </td>
      		</tr>
            
            <tr>
           		<td >Pase Nro. : </td>
                <td >
                    <select ng-model="pass.pass" >
                        <option ng-repeat="pa in pass.passes">{{pa}}</option>
                    </select> 
                </td>                
            </tr>
            
            <tr>
                <td colspan="2">
                    <input type="button" value="Limpiar" ng-click="clear('turno');" />
                    <input type="button" value="Guardar" ng-click="validate('pass');" />
                    <input type="button" value="Seleccionar" ng-click="buscar();" />
                </td>
            </tr>            
        </table>  
        
        
        <table border="1" align="center" >
        
        
         <tr>
        	<td colspan="2">Pass mode : </td>
        </tr>
        
         <tr  ng-repeat="pm in cPassMode"   >
        	<td >{{pm.name}} :   </td>
            <td >
            	 <input type="radio"  ng-model="passMode['v0']" name="passMode1" id="on_passMode{{$index+1}}" value="{{$index+1}}">
           
                   <label  for="on_passMode{{$index+1}}"></label>
  			</td>
            
        </tr>  
        
        <tr>
        	<td colspan="2">
            	<input type="button" value="Guardar Pass Mode" ng-click="validate('passMode');" />
            </td>
        </tr> 
        
       
   </table>
 
	</div>
</body>
</html>
