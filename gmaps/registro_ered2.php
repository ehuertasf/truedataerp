<?php
    include_once("../verifica_acceso.php");
    include("../p_cabecera.php");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <title>Mantenimiento de Elementos</title>
<!--	LAB.ARYGE.COM
  <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false
    &amp;key=ABQIAAAATU_QaAK6ctarcM0DWuBfxRS9ExIQQG9UjVRIK-I93kWBTHsfVBR4eUYMXs5FCmGPwVZYrA2YiYoCnQ"
    type="text/javascript">
  </script>
-->
<!--IP 72.167.232.80
  <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false
      &amp;key=ABQIAAAAi9oNr2NOq720SyjJ7NHDyhS9ExIQQG9UjVRIK-I93kWBTHsfVBR25lLxyVYHJEJhXbK3ZsnLjMDQpw"
      type="text/javascript">
    </script>
 -->
<script src="key.js"></script>
<script>
	var scriptTag = '<' + 'script src="http://maps.google.com/maps?file=api&v=2.94&key=' + myKey + '">'+'<'+'/script>';
	document.write(scriptTag);
</script>


    <link rel="stylesheet" type="text/css" href="../librerias/ext-2.2/resources/css/ext-all.css">
    <script type="text/javascript" src="../librerias/ext-2.2/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../librerias/ext-2.2/ext-all.js"></script>
	<script type="text/javascript" src="../librerias/addons_map/elabel.js" ></script>
	<script type="text/javascript" src="georeferencia.js"></script>
	<script type="text/javascript" src="formularios.js"></script>
	<script type="text/javascript" src="registro_ered2.js"></script>
	<script type="text/javascript" src="../librerias/ext-2.2/shared/examples.js"></script>
 	<script type="text/javascript" src="../js/funciones.js"></script>
   	<link rel="stylesheet" type="text/css" href="../librerias/ext-2.2/examples/form/combos.css" />

   <style type="text/css">
        html, body {
            font: normal 12px verdana;
            margin: 0;
            padding: 0;
            border: 0 none;
            overflow: hidden;
            height: 100%;
        }
        .empty .x-panel-body {
            padding-top:20px;
            text-align:center;
            font-style:italic;
            color: gray;
            font-size:11px;
        }
		.ok {
            font-style:italic;
            color: blue;
			background-color:green;
            font-size:11px;
        }
	    .style1 {background-color:#ffffff;font-weight:bold;border:2px #006699 solid;}
	   	.nuevo {background-image:url(../imagenes/nuevo.gif);}
		.editar {background-image:url(../imagenes/editar.gif);}
    </style>




</head>
<body onload="initialize('mant_ered');" onunload="GUnload();">
<div id='centro'>  </div>
<div id='win_ered' style="width: 100%;height: 100%;">
	<div id='map_zonas' align='center' style="height: 6%; "></div>
	<div id="map_canvas" style="width: auto;height: 88%;"></div>
	<div id='LatLon' align='center' style="height: 6%;">
		<b>LATITUD</b><INPUT TYPE=text readonly="readonly" SIZE=10 NAME="txtLatitud" ID="txtLatitud" VALUE="">&nbsp;&nbsp;&nbsp;
		<b>LONGITUD</b> <INPUT TYPE=text readonly="readonly" SIZE=10 NAME="txtLongitud" ID="txtLongitud" VALUE="">
		<a href="#" onclick="javascript:  LimpiaMapa();">Borrar</a>
	</div>
</div>
</body>
</html>