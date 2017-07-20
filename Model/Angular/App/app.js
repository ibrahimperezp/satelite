var app = angular.module('satelite', ["ngRoute"] );

app.config(function($routeProvider, $locationProvider)
{
  $routeProvider
  /*.when("/satellite", 
  {
    templateUrl : "satellite/index.html"
  })
  .when("/activity", 
  {
    templateUrl : "activity/index.html"
  })
  .when("/send", 
  {
    templateUrl : "send.html"
  })
  .when("/pass_mode", 
  {
    templateUrl : "Prepase/pass_mode.html"
  })
  .when("/send_guide", 
  {
    templateUrl : "Prepase/send_guide.html"
  })
   .when("/task_smcs", 
   {
    templateUrl : "Prepase/task_smcs.html"
  })
   .when("/task_rdr", 
   {
    templateUrl : "Prepase/task_rdr.html"
  })
   
   .when("/acu_software", 
   {
    templateUrl : "Prepase/acu_software.html"
  })
   .when("/device_rf", 
   {
    templateUrl : "Turno/device_rf.html"
  })
   .when("/device_acu", 
   {
    templateUrl : "Turno/device_acu.html"
  })
   .when("/device", 
   {
    templateUrl : "Turno/device.html"
  })
   .when("/rack_n2", 
   {
    templateUrl : "Turno/rack_n2.html"
  })
   .when("/status", 
   {
    templateUrl : "Turno/status.html"
  })
   .when("/status_ups", 
   {
    templateUrl : "Turno/status_ups_room.html"
  })
  
   .when("/task_rdr", 
   {
    templateUrl : "Pase/task_rdr.html"
  })
  
   .when("/track_receiver", 
   {
    templateUrl : "Pase/track_receiver.html"
  })
   .when("/acu_software", 
   {
    templateUrl : "Pase/acu_software.html"
  })
   .when("/demulator", 
   {
    templateUrl : "Pase/demulator.html"
  })
  
  .when("/raw1", 
   {
    templateUrl : "Postpase/raw1.html"
  })
  .when("/raw2", 
   {
    templateUrl : "Postpase/raw2.html"
  })
  .when("/pass_mode2", 
   {
    templateUrl : "Postpase/pass_mode.html"
  })
  .when("/acu_software2", 
   {
    templateUrl : "Postpase/acu_software.html"
  })*/
   .when("/module/:dir", 
  {
    templateUrl : function(dir) {return dir.dir.replace(/-/g, "/"); }
  })
  //.otherwise({ templateUrl: "../../../View/Pre/power/mockup.html"});
  .otherwise({ templateUrl: function(dir) { /*Some function*/ }});
  
   
 
})