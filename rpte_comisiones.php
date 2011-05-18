<?php
	ini_set("display_errors", "Off");
	error_reporting(E_ALL ^ E_NOTICE);
	
	header("Content-Type: text/html");
	header("Cache-control: No-Cache");
	header("Pragma: No-Cache");
	
    include("p_cabecera.php");
    include("php_procesos/conexion.php");

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />	
<meta http-equiv="cache-control" content="no-cache"/>	
<title>LOO Import</title>	

<head>

	<style type="text/css">
		.search {background-image:url(../librerias/ext-3.0/examples/shared/icons/fam/group-search.gif) !important;}
		.excel {background-image:url(imagenes/excel.gif) !important;}
	</style>
	
	<script type="text/javascript" src="js/rpte_comisiones.js"></script>
	
</head>


<body>
<div id="form-ct"></div>
<?php
    $iduser=1;
?>
<input type="hidden" id="iduser" value="<?=$iduser?>">
<table width="850" cellpadding="0" cellspacing="0" align="center" border="0" style="margin-top:550px;">
	<tr>
		<td align="center">
			<div style="color:#C3C3C3;  font-family: Tahoma, Verdana; font-size:11px">&nbsp;<b>2009 - Desnetel</b></div>
		</td>
	</tr>
</table>

</body>

</html>
