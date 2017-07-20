app.service("setData", function() 
{	
	this.scope;
	this.http;
	this.shortcut;
	this.timeout;
	this.normalize;
	
	this.init=function(scope,http,timeout,normalize)
	{
		this.scope=scope;
		this.http=http;
		this.shortcut=scope.route.shortcut;
		this.timeout=timeout;
		this.normalize=normalize;
	}
	
	
	//Asigna a las variables el nombre del modulo actual para mostrar en el titulo de la pagina
	//y el modulo para usarla en funciones internas que leen cual es el modulo actual mostrandose
	this.current=function(title,module)
	{
		var scope=this.scope;
		//Asigna el nombre en el titulo y en el boton guardar en caso que haya
		scope.currentModule.title=title;
		//Variable para leer cual es el modulo actual
		scope.currentModule.module=module;
	}
	
	
	//Asigna el valor de los satelites retornados
	this.satellites=function(scope,response){scope.satellite.satellites=response.data;}	
	
	
	//Lee la fecha
	//type: tipo de asignación de valor de la fecha actual
	//name: nombre del campo en caso que type sea 'id'
	this.readDate=function(action)
	{
		var scope=this.scope;
		var normalize=this.normalize;
		
		//Objeto fecha
		var f = new Date();	
		//Obtiene el valor del mes actual
		var mes=normalize.date("month",f.getMonth());
		
		//Obtiene el valor del dia actual
		var dia=this.normalize.date("day",f.getDate());
		
		//Obtiene el valor del año actual
		var year=f.getFullYear();
		
		//Coloca el formato de fecha año-mes-dia
		var actualDate=year+"-"+mes+"-"+dia;	
		
		//Si type es return, devuelve el valor, en caso contrario, lo asigna a un campo de id del valor de action
		if(action==="return"){return actualDate;}
		else{document.getElementById(action).value=actualDate;}
	}
	
	
	//Asigna el valor de los paises en task rdr pre
	this.countries=function(scope,response){scope.taskRdrPre.country=response.data;}	
	
	
	//Añade un campos en país o estados en el módulo tas rdr pre
	//type: indica si es pais o estado
	//index: posición a añadir en caso que sea un estado
	this.addition=function(type,index)
	{
		var scope=this.scope;
		//Si es estado añadre un arreglo vacío que se llenará luego de los estados
		if(type==="state"){scope.taskRdrPre.subArea[index].push([0]);}
		//Si es país añadre un arreglo vacío que se llenará luego de los países
		if(type==="country"){scope.taskRdrPre.area.push([0]);}
	}
	
	
	//Asigna el valor de los estados en task rdr pre
	this.states=function(scope,response){scope.taskRdrPre.state=response.data;}
	
	
	//Incializa el valor de un estado al darle el boton añadir en task rdr pre en caso que no exista
	//Indice a revisar si existe y a crear en caso que no exista
	this.inicializateState=function(index)
	{
		var scope=this.scope;
		//Si no existe se crea la variable con un arreglo vacío
		if(!scope.taskRdrPre.subArea[index]){scope.taskRdrPre.subArea[index]=[];}
	}
	
	
	//Asigna el valor de las actividades en la función uncompletedActivity en getData 
	this.activity=function(scope,response){scope.activity.records=response.data;}	
	
	
	//Tendrá los números de pases y el porcentaje de completado
	this.controls={};
	
	
	//Da valor a controls, que tiene los números de pases y el porcentaje de completado
	this.setControl=function(nro,complete){this.controls[nro]=complete;}
	
	
	//Asigna el valor de los una actividad seleccionada
	this.pass=function(scope,response,arguments)
	{
		scope.currentPass.pass=true;
		scope.currentPass.modules=arguments.modules;
		scope.currentPass.complete=arguments.complete;
		scope.currentPass.id=response.data[0];
		scope.currentPass.blt=response.data[1];
		scope.currentPass.nro=arguments.nro;
		scope.currentPass.date=arguments.date;
	}
	
	//Cancela una actividad seleccionada
	this.cancelActivity=function()
	{
		var scope=this.scope;
		scope.currentPass.pass=false;
		scope.currentPass.modules="";
		scope.currentPass.complete="";
		scope.currentPass.id="";
		scope.currentPass.blt="";
		scope.activity.records=[];
	}
	
	
	//Obejto para enviar al servidor para guardar/editar/borrar
	this.settings=function(scope,module,action,id)
	{		
		var settings=
		{
			status:"ok",
			value:scope[module],
			pass:scope.currentPass.id,
			module:module,
			action:action,
			blt:scope.currentPass.blt,
			id:id
		}
		
		return settings;	
	}
	
	//Asigna los valores al buscar una actividad
	this.searchActivity=function(scope,response,args)
	{
		var status=response.data;
		
		if(status==""){scope.dialog.alert("No se encontraron actividades para la fecha: "+args.date);}
		else{scope.activity.records=status;}
	}
	
	
	//Seleccion al momento de editar
	this.selectSend=function(scope,data)
	{
		var module="send";
		if(data.data!==false && data.data!=="")
		{	
			scope[module].v0=data.data["send_guide_acu"];
			scope[module].v1=datae.data["send_guide_rdr1"];
			scope[module].v2=data.data["send_guide_rdr2"];
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	this.selectTaskSmcs=function(scope,data)
	{
		var module="taskSmcs";	
		if(data.data!==false && data.data!=="")
		{	
			scope.setData.selectTime(scope,module,data);					
			scope[module].notes=data.data["nota"];
			scope[module].id=data.data["task_id"];
		}
		else{scope[module].notes="estas son las notas";}		
	}
	
	
	
	this.selectTrack=function(scope,data)
	{
		var module="track";		
		if(data.data!==false && data.data!=="")
		{			
			scope[module].v0=data.data["dpu_working_s"];
			scope[module].v1=data.data["dpu_working_x"];	
			scope[module].v2=data.data["dtr_lock_s"];
			scope[module].v3=data.data["dtr_lock_x"];
			scope[module].v4=data.data["dem_lock_s"];
			scope[module].v5=data.data["dem_lock_x"];
			scope[module].v6=data.data["agc_volt_s"];
			scope[module].v7=data.data["agc_volt_x"];
			scope[module].v8=data.data["input_power_s"];
			scope[module].v9=data.data["input_power_x"];
			scope[module].notes=data.data["nota"];
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	this.selectDemulatorIn=function(scope,data)
	{	
		var module="demulatorIn";	
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["code_syn"];
			scope[module].v1=data.data["carrier_capture"];	
			scope[module].v2=data.data["frame_syn"];
			scope[module].v3=data.data["total_eb_no1"];
			scope[module].v4=data.data["total_eb_no2"];
			scope[module].v5=data.data["total_eb_no3"];
			scope[module].notes=data.data["nota"];
		}
		else{scope[module].notes="estas son las notas";}			
	}
	
	
	this.selectRaw1=function(scope,data)
	{	
		var module="raw1";
		if(data.data!==false && data.data!=="")	
		{
			scope[module].v0=data.data["files_received_ch1"];
			scope[module].v1=data.data["files_ch1_1"];
			scope[module].v2=data.data["files_ch1_2"];
			scope[module].v3=data.data["files_ch1_3"];
			scope[module].v4=data.data["files_ch1_4"];
			scope[module].v5=data.data["files_received_ch2"];
			scope[module].v6=data.data["files_ch2_1"];
			scope[module].v7=data.data["files_ch2_2"];
			scope[module].v8=data.data["files_ch2_3"];
			scope[module].v9=data.data["files_ch2_4"];
			scope[module].v10=data.data["data_size"];
			scope[module].v11=data.data["total_received"];
			scope[module].v12=data.data["total_data_size"];	
			scope[module].v13=data.data["transmisition_ips"];
			scope[module].notes=data.data["nota"];	
		}
		else{scope[module].notes="estas son las notas";}			
	}
	
	
	this.selectRaw2=function(scope,data)
	{
		var module="raw2";	
		if(data.data!==false && data.data!=="")	
		{
			scope[module].v0=data.data["files_received_ch1"];
			scope[module].v1=data.data["files_ch1_1"];
			scope[module].v2=data.data["files_ch1_2"];
			scope[module].v3=data.data["files_ch1_3"];
			scope[module].v4=data.data["files_ch1_4"];
			scope[module].v5=data.data["files_received_ch2"];
			scope[module].v6=data.data["files_ch2_1"];
			scope[module].v7=data.data["files_ch2_2"];
			scope[module].v8=data.data["files_ch2_3"];
			scope[module].v9=data.data["files_ch2_4"];
			scope[module].v10=data.data["data_size"];
			scope[module].v11=data.data["total_received"];
			scope[module].v12=data.data["total_data_size"];	
			scope[module].v13=data.data["transmisition_ips"];
			scope[module].notes=data.data["nota"];	
		}
		else{scope[module].notes="estas son las notas";}		
	}
	
	
	this.selectTaskRdrPre=function(scope,data)
	{	
		var module="taskRdrPre";
		if(data.data!==false && data.data!="")
		{					
			if(data.data["area"])
			{
				var ar=[];
				for(var r=1;r<=data.data["area"][0];r++)
				{
					ar.push(data.data["area"][r].pais);
					if(data.data["state"] && data.data["area"][r].pais==="Venezuela")
					{
						var st=[];
						for(var sta=1;sta<=data.data["state"][0];sta++)
						{
							st.push(data.data["state"][sta].state);
						}
						scope[module].subArea[(r-1)]=st;
					}
				}
				scope[module].area=ar;	
				scope.setData.selectTime(scope,module,data);					
				scope[module].image=data.data["image"];	
				scope[module].id=data.data["task_id"];
				scope[module].orbit=data.data["orbit"];
				scope[module].trans=data.data["trans_mode"];
				scope[module].notes=data.data["nota"];					
			}
		}
		else{scope[module].notes="estas son las notas";}			
	}
	
	this.selectPassPost=function(scope,data)
	{	
		var module="passPost";	
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["efective_task"];
			scope[module].notes=data.data["nota"];	
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	this.selectAcuSoftwarePost=function(scope,data)
	{	
		var module="acuSoftwarePost";	
		if(data.data!==false && data.data!=="")
		{
			scope[module].record=data.data["record_time"];
			scope[module].v1=data.data["return_zero"];
			scope[module].notes=data.data["nota"];		
		}
		else{scope[module].notes="estas son las notas";}	
	}
	
	
	this.selectTime=function(scope,module,response)
	{
		
		var utc1=response.data["utc1"].split(":");
		var utc2=response.data["utc2"].split(":");
		var local1=response.data["local1"].split(":");
		var local2=response.data["local2"].split(":");
		
		scope[module].hour1=local1[0];
		scope[module].minute1=local1[1];
		scope[module].second1=local1[2];
		scope[module].hour3=local2[0];
		scope[module].minute3=local2[1];
		scope[module].second3=local2[2];					
		scope[module].hour2=utc2[0];
		scope[module].minute2=utc2[1];
		scope[module].second2=utc2[2];					
		scope[module].hour0=utc1[0];
		scope[module].minute0=utc1[1];
		scope[module].second0=utc1[2];
		scope[module].meridium0=response.data["meridium1"];
		scope[module].meridium1=response.data["meridium2"];			
	}
	
	
	
	this.selectTaskRdrIn=function(scope,data)
	{
		var module="taskRdrIn";		
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["ch1_rate"];
			scope[module].v1=data.data["ch2_rate" ];
			scope[module].notes=data.data["nota"];		
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	this.selectAcuSoftwareIn=function(scope,data)
	{	
		var module="acuSoftwareIn";
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["uagc_x"];
			scope[module].v1=data.data["uagc_s"];	
			scope[module].v2=data.data["stracking_el"];
			scope[module].v3=data.data["stracking_uagc"];
			scope[module].v4=data.data["xtracking_el"];
			scope[module].v5=data.data["xtracking_uagc"];
			scope[module].notes=data.data["nota"];
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	this.selectDemulatorPre=function(scope,data)
	{		
		var module="demulatorPre";
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["dem"];
			scope[module].v1=data.data["smcs" ];
			scope[module].notes=data.data["nota"];		
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	this.selectUps=function(scope,data)
	{	
		var module="ups";	
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["160_kv"];
			scope[module].v1=data.data["40_kv1"];
			scope[module].v2=data.data["40_kv2"];	
			scope[module].notes=data.data["nota"];	
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	this.selectStatus=function(scope,data)
	{
		var module="status";		
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["mod_status"];
			scope[module].v1=data.data["mod_smcs"];
			scope[module].v2=data.data["gps_lock_status"];
			scope[module].v3=data.data["nport_status"];
			scope[module].v4=data.data["smcs_1"];
			scope[module].v5=data.data["smcs_2"];	
			scope[module].notes=data.data["nota"];			
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	this.selectRack2=function(scope,data)
	{	
		var module="rack2";
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["matrix_status"];
			scope[module].v1=data.data["matrix_smcs"];
			scope[module].v2=data.data["dem_1_status"];
			scope[module].v3=data.data["dem_1_smcs"];
			scope[module].v4=data.data["dem_2_status"];
			scope[module].v5=data.data["dem_2_smcs"];
			scope[module].v6=data.data["dem_3_status"];
			scope[module].v7=data.data["dem_3_smcs"];
			scope[module].v8=data.data["test_s_status"];
			scope[module].notes=data.data["nota"];					
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	
	this.selectDeviceRF=function(scope,data)
	{	
		var module="deviceRF";	
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["xdata_1_status"];
			scope[module].v1=data.data["xdata_1_smcs"];
			scope[module].v2=data.data["xdata_2_status"];
			scope[module].v3=data.data["xdata_2_smcs"];
			scope[module].v4=data.data["xdata_1b_status"];
			scope[module].v5=data.data["xdata_1b_smcs"];
			scope[module].v6=data.data["xdata_2b_status"];
			scope[module].v7=data.data["xdata_2b_smcs"];
			scope[module].v8=data.data["test_s_status"];
			scope[module].v9=data.data["test_s_smcs"];
			scope[module].v10=data.data["xtracking_1_status"];
			scope[module].v11=data.data["xtracking_1b_status"];
			scope[module].v12=data.data["stracking_1_status"];	
			scope[module].v13=data.data["stracking_1b_status"];
			scope[module].v14=data.data["nport_status"];	
			scope[module].notes=data.data["nota"];						
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	this.selectDeviceAcu=function(scope,data)
	{	
		var module="deviceAcu";	
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["stracking_status"];
			scope[module].v1=data.data["xtracking_status"];
			scope[module].v2=data.data["acu_software_status"];
			scope[module].v3=data.data["pdu_status"];
			scope[module].v4=data.data["dcxs-1_status"];
			scope[module].v5=data.data["dcxs-2_status"];
			scope[module].v6=data.data["dcxs-1b_status"];
			scope[module].v7=data.data["dcxs-2b_status"];
			scope[module].v8=data.data["trdcxs-1_status"];
			scope[module].v9=data.data["trdcxs-2_status"];
			scope[module].v10=data.data["lna-x"];
			scope[module].v11=data.data["lna-s"];
			scope[module].v12=data.data["humidity"];	
			scope[module].v13=data.data["temperature"];	
			scope[module].notes=data.data["nota"];						
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	this.selectDevice=function(scope,data)
	{	
		var module="device";		
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["rdr_1_status"];
			scope[module].v1=data.data["rdr_1_smcs"];
			scope[module].v2=data.data["rdr_2_status"];
			scope[module].v3=data.data["rdr_2_smcs"];
			scope[module].v4=data.data["matrix_status"];
			scope[module].v5=data.data["matrix_smcs"];
			scope[module].v6=data.data["san_1_status"];
			scope[module].v7=data.data["san_2_status"];	
			scope[module].notes=data.data["nota"];						
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	this.selectPower=function(scope,data)
	{	
		var module="power";	
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["emergency_button"];
			scope[module].v1=data.data["tilt"];
			scope[module].v2=data.data["azimut"];
			scope[module].v3=data.data["elevation"];
			scope[module].v4=data.data["antenna_position"];	
			scope[module].notes=data.data["nota"];				
		}
		else{scope[module].notes="estas son las notas";}
	}
	
	
	
	
	this.selectAcuSoftwarePre=function(scope,data)
	{		
		var module="acuSoftwarePre";
		if(data.data!==false && data.data!=="")
		{
			scope[module].v0=data.data["max_elev"];
			scope[module].notes=data.data["nota"];
		}
		else{scope[module].notes="estas son las notas";}		
	}
	
	this.selectSend=function(scope,data)
	{	
		var module="send";	
		if(data.data!==false && data.data!=="")
		{			
			scope[module].v0=data.data["send_guide_acu"];
			scope[module].v1=data.data["send_guide_rdr1"];
			scope[module].v2=data.data["send_guide_rdr2"];
			scope[module].notes=data.data["nota"];
		}	
		else{scope[module].notes="estas son las notas";}		
	}
	
	
	
	this.queryMbps=function(scope,data)
	{		
		if(data.data!=="no")
		{
			var ch1=[];
			var ch2=[];
			var cat='';
			var prop=Object.keys(data.data);
			var tam=prop.length;
			for(var j=0;j<tam;j++)
			{
				if(j===0){cat+='"'+prop[j]+'"';}
				else{cat+=',"'+prop[j]+'"';}
				
				var ll=data.data[prop[j]].dias.length;
				for(var d=0;d<ll;d++)
				{
					var actual1=(data.data[prop[j]].dias[d]["ch1_rate"]-0);
					ch1.push(actual1);
					
					var actual2=(data.data[prop[j]].dias[d]["ch2_rate"]-0);
					ch2.push(actual2);
				}
			}
			scope.categories=cat;
			scope.series1=ch1;
			scope.series2=ch2;
			
			
			var ch1=[];
			var ch2=[];
			var cat='';
			var prop=Object.keys(data.data);
			var tam=prop.length;
			for(var j=0;j<tam;j++)
			{
				if(j===0){cat+='"'+prop[j]+'"';}
				else{cat+=',"'+prop[j]+'"';}					
				
				var actual1=((data.data[prop[j]]["media1"]-0));
				ch1.push(actual1);
					
				var actual2=((data.data[prop[j]]["media2"]-0));
				ch2.push(actual2);
			}
			scope.categories=cat;
			scope.series1=ch1;
			scope.series2=ch2;
			
			scope.button=true;
			
			
			scope.query.record=data.data;
		}
		
		else{scope.dialog.alert("No se encontraron registros");}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	this.setSuccess=function(module,satellites)
	{
		var satellites=this.satellites;
		if(module==="satellite"){return satellites;}
	}
	
	this.getSuccess=function(scope,http,shortcut,success,module,status)
	{
		if(status==="ok")
		{
			if(module==="satellite"){success(scope,http,shortcut);}
		}
	}
	
	this.reloadActivity=function(scope,module,menu)
	{
		if(location.href.match(/register/g)!==null)
		{
			scope.currentPass.modules[module]=true;
			menu();
		}	
	}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	this.query=function()
	{
		var scope=this.scope;
		var shortcut=this.shortcut;
		var http=this.http;
		if(scope.query.type==="mbps")
		{
			this.queryMbps(scope,http,shortcut);
		}
	}
	
	
	
	this.date=function(scope,module)
	{
		if(module==="pass"){scope.fecha.completa=document.getElementById('fecha').value;}
	}
	
	
	
	
	
	this.controlActivity=function(records,index)
	{
		if(records.length===(index+2))
		{
			var scope=this.scope;
			var controls=this.controls;
			var vueltas=controls.length;
			var alert=scope.dialog.alert;
			var hideAndSeek=this.hideAndSeek;
			
			if(controls[1]===100)
			{
				if(controls[2]===100)
				{
					if(controls[3]===100)
					{
						if(controls[4]===100)
						{
							alert("Todas las actividades para el dia de hoy estan completas");
						}
						else{hideAndSeek([1,2,3,4],4,"complete");}
					}
					else{hideAndSeek([1,2,4],3,"complete");}
				}
				else{hideAndSeek([1,3,4],2,"complete");}
			}
			else{hideAndSeek([2,3,4],1,"complete");}
		}
		
	}
	
	this.hideAndSeek=function(complete,exception,mode)
	{
		var com=complete.length;
		for(h=0;h<com;h++)
		{
			var co="inline";
			var se="none";
			if(mode==="select"){co="none";se="inline"}
			
			
			if(document.getElementById("complete"+complete[h]))
			{
				document.getElementById("complete"+complete[h]).style.display=co;
				document.getElementById("select"+complete[h]).style.display=se;
			}
		}
		if(mode==="complete"){document.getElementById("complete"+exception).style.display="none";}
		else{document.getElementById("select"+exception).style.display="none";}
	}
	
	
	
	
	
	
	this.selectPass=function(scope,data,module)
	{
		scope.turno.nombreSatelite=data.satelite;
		scope.fecha.completa=data.fecha;
		scope.turno.pase=data.nro_pase;
		scope.turno.turno=data.local_time;
		scope.currentPass.backup=data.backup;
		scope.currentPass.options="v";
		scope.currentPass.nro=data.nro_pase;
		scope.currentPass.id=data.idpase;
		scope.currentPass.pass=true;					
		if(data.turno==="n"){scope.turno.nombreTurno="Nocturno";}
		else{scope.turno.nombreTurno="Diurno";}
	}
	
	this.savePassSettings=function(scope)
	{
		var settings=
		{
			status:"ok",
			value:scope['passMode'],
			turno: scope.turno.turno,
			fecha: scope.fecha.completa,
			satelite: scope.turno.satelite,
			pass:scope.turno.pase,
			module:"pass",
			action:"save"
		};	
		
		return settings;	
	}
	
	
	
	
	
	
	
	
	
	
	
	this.saveModuleSettings=function(scope,module)
	{
		var settings=
		{
			status:"ok",
			value:scope[module],
			pass:scope.currentPass.id,
			module:module,
			action:"save"
		};	
		
		return settings;	
	}
	
	
	
	this.getRecordsSettings=function(module,action,mode,pass)
	{
		var settings=
		{
			module:module,
			action:"red"
		}
		
		return settings;	
	}*/
	
	
});