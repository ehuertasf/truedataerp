<?php
    include("p_cabecera.php");
?>
<html>

<title>TrueData ERP - Registro de Vendedores</title>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Registro Clientes</title>

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

        .empty .x-panel-body {
            padding-top:20px;
            text-align:center;
            font-style:italic;
            color: gray;
            font-size:11px;
        }

        .smalltexto .x-form-cb-label{font-size: 11px;}

        .sinpadding .x-form-element{padding-top:0px;}

        #x-form-el-idcbo_vendedor{padding-top:0px;}

    </style>
    <script type="text/javascript" src="js/admin_ciudad.js"> </script>
</head>

<body>
<div id="form-ct"></div>
<?php
    $iduser=1;

    include("pie_pagina.php");
    pie_pagina(450);
?>

<input type="hidden" id="iduser" value="<?=$iduser?>">
<input type="hidden" id="idzonal" value="11">

<br><br>
</body>

</html>

