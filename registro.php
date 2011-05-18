<?
	include_once("verifica_acceso.php");
	include("p_cabecera.php");
?>
<html>

<title>TrueData ERP - Registro Clientes</title>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Registro Clientes</title>
    <link rel="stylesheet" type="text/css" href="librerias/ext-2.2/resources/css/ext-all.css" />
    
    <script type="text/javascript" src="librerias/ext-2.2/adapter/ext/ext-base.js"> </script>
    <script type="text/javascript" src="librerias/ext-2.2/ext-all.js"> </script>

    <script type="text/javascript" src="js/registro.js"> </script>
    <style>
        body {
            font-family: Tahoma, Verdana;
            font-size: 9px;
            color:#15428B;
            font-weight: normal;
        }        

        .x-check-group-alt {
            background: #D1DDEF;
            border-top:1px dotted #B5B8C8;
            border-bottom:1px dotted #B5B8C8;
        }

    </style>
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

