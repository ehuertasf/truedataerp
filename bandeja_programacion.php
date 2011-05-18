<?php
    include("p_cabecera.php");
    include("php_procesos/conexion.php");
    include("pie_pagina.php");
?>
<html>

<title>TrueData ERP - Bandeja de Programaci&oacute;n</title>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Bandeja de Programaci&oacute;n</title>
    <script type="text/javascript" src="js/bandeja_programacion.js"> </script>


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
<?php
    pie_pagina(540);
?>
<br><br>
</body>

</html>

