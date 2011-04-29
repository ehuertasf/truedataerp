<?php
    include("p_cabecera.php");
    include("php_procesos/conexion.php");
    include("pie_pagina.php");
?>
<html>

<title>TrueData ERP - Productos y Servicios</title>




<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Productos y Servicios</title>
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=ABQIAAAAOKHsmBIf-BuJfd4vssIwfRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSf79Ce9m2jj0pVXkXdWir1JWxuAg" type="text/javascript"></script>

<script type="text/javascript" src="js/GMapPanel.js"></script>


<?php
//    include("gmaps/keymap.php");
?>

<!--    <script type="text/javascript" src="gmaps/georeferencia.js"></script>-->

    <script type="text/javascript" src="js/venta_productos.js"> </script>
    
    <style>
        body {
            font-family: Tahoma, Verdana;
            font-size: 11px;
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
    </style>
</head>

<body>

<div id="form-ct"></div>
<?php
    $iduser=1;
?>
<input type="hidden" id="iduser" value="<?=$iduser?>">

<?php
    pie_pagina(1000);
?>
<br><br>

</body>

</html>

