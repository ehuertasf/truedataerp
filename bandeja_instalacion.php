<?php
    include("p_cabecera.php");
    include("php_procesos/conexion.php");
    include("pie_pagina.php");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>TrueData ERP - Bandeja de Instalaciones</title>

<head>
    
    <title>Bandeja de Instalaciones</title>
 

    <script type="text/javascript" src="js/bandeja_instalacion_n.js"> </script>



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
    </style>
</head>

<body>
<input type="hidden" id="iduser" value="<?=$idusuario?>">
</body>
</html>

