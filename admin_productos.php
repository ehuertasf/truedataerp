<?php
	ini_set("display_errors", "Off");
	error_reporting(E_ALL ^ E_NOTICE);
	
	header("Content-Type: text/html");
	header("Cache-control: No-Cache");
	header("Pragma: No-Cache");
	
	//include("verifica_acceso.php");
	//include("p_cabecera.php");
	include_once("conexion.php");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />	
<meta http-equiv="cache-control" content="no-cache"/>	
<title>Truedata ERP</title>		

<head>
	<script type="text/javascript" src="librerias/prototype.js"></script>	
	<script type="text/javascript" src="librerias/extjs/plugins/inputmask/InputTextMask.js"></script>		
	<script type="text/javascript" src="librerias/extjs/plugins/cbo_multiselect/Select.js"></script> 	
	<script type="text/javascript" src="js/admin_productos.js"></script>
	<script type="text/javascript" src="librerias/prototype.js"></script>
	
	<!--<script type="text/javascript" src="js/mtto_productos.js"></script>-->
	<style type="text/css">
		.agregar {background-image:url(librerias/extjs/examples/shared/icons/fam/add.gif) !important;}	
		.search {background-image:url(librerias/extjs/examples/shared/icons/fam/search.png) !important;}	
		.excel {background-image:url(librerias/extjs/examples/shared/icons/fam/excel.gif) !important;}	
		.eliminar_item {background-image:url(imagenes/eliminar_item.gif) !important;}	
		.agregar_item {background-image:url(imagenes/agregar_item.gif) !important;}	
		.update_item {background-image:url(imagenes/Report-Edit-2.gif) !important;}	
	</style>	
</head>



<body>


	<br><br>

	<div id='contenido' ></div>
  	<input type="hidden" id="idusuario" value="<?=$idusuario?>">
	<input type="hidden" id="usuario" 	value="<?=$usuario?>">
	<input type="hidden" id="perfil"  	value="<?=$perfil?>">

</body>

</html>
