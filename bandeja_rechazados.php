<?php
    include("p_cabecera.php");
    include("php_procesos/conexion.php");
?>
<html>

<title>TrueData ERP - Bandeja de Rechazados</title>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Bandeja de Rechazados</title>
    <script type="text/javascript" src="js/bandeja_rechazados.js"> </script>


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
        .search {background-image:url(imagenes/search.png) !important;}
        .productos {background-image:url(imagenes/search.png) !important;}
        .validar {background-image:url(imagenes/Symbol_Check2.png) !important;}
        .rechazar {background-image:url(imagenes/Symbol_Delete2.png) !important;}
        .excel {background-image:url(imagenes/excel.gif) !important;}
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


