<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$arr = array();
$f = $_POST["f"];

switch ($f) {
    case 1:     // CONSULTA DATOS DE CLIENTE
        include_once("conexion.php");
        try {
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "select concat(a.ap_paterno,' ',a.ap_materno,', ',a.nombre) AS NOMAPE,b.desc_tipo_doc AS TIPODOC,a.num_documento AS NRODOC,
                    concat(a.direccion_postal,' ',a.num_domicilio,' ',a.mza_lte,' ',c.desc_distrito) AS DOMICILIO,a.id_cliente,a.codcli AS CODCLI
                    from cliente a,tipo_documento b, distrito c where a.id_tipo_doc=b.id_tipo_doc and a.id_distrito=c.id_distrito
                    and (a.num_documento like :xvalor or a.codcli like :xvalor
                    or concat(a.ap_paterno,' ',a.ap_materno,', ',a.nombre) like :xvalor);";
            $stmt1 = $dbh->prepare($sql);
            $valor='%'.trim($_POST["query"]).'%';
            $stmt1->bindParam(':xvalor', trim($valor));
            $stmt1->execute();

            while ($row = $stmt1->fetch(PDO::FETCH_ASSOC)) {
                $arr[] = $row;
            }

            echo '{"consulta":' . json_encode($arr) . '}';
        } catch (PDOException $e) {
            echo 'SQL Query: ', $sql . '<br/>';
            echo 'Error: ' . $e->getMessage() . '<br />';
            echo 'Archivo: ' . $e->getFile() . '<br />';
            echo 'Linea: ' . $e->getLine() . '<br />';
        }
        break;
}
?>
