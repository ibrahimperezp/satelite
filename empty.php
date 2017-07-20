<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<script src="Model/Chart/code/highcharts.js"></script>
<script src="Model/Chart/code/modules/exporting.js"></script>


</head>

<body>
<span style="display:none;" id="codex_a">

Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Report of Data Rate'
    },
    xAxis: {
        categories: [</span>



<span style="display:none;" id="codex_b">],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Data Rate'
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
    {
        name: 'Ch1',
        data: [</span>


<span style="display:none;" id="codex_c">]

    }, 
    {
        name: 'Ch2',
        data: [</span>


<span style="display:none;" id="codex_d">]

    }]
});
</span>



<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
<pre id="pru"></pre>

</body>
</html>

<script>
function $(id){return document.getElementById(id).innerHTML;}
function $$(id){return window.opener.document.getElementById(id).value;}

var categoria=$$("categoria");
var serie1=$$("serie1");
var serie2=$$("serie2");




var p=$("codex_a")+categoria+$("codex_b")+serie1+$("codex_c")+serie2+$("codex_d");
//document.getElementById("pru").innerHTML=p;


	var script= document.createElement("script");        
	var content= document.createTextNode(p);      
	script.appendChild(content);                               
	document.body.appendChild(script); 

</script>
