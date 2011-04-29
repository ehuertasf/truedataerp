<?php
ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('UTC');

$arr = array();
$f = $_POST["f"];
$idcliente=$_POST["idcliente"];

switch ($f) {
	case 1:
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $sql ="select a.id_cliente,sum(a.monto) as monto_total
                    from facturacion a
                    where a.id_estado_pago=1 and a.id_cliente=:xidcliente
                    group by 1";

            $stmt1 =$dbh->prepare($sql);
            $stmt1->bindParam(':xidcliente',$idcliente);
            $stmt1->execute();

            while($row=$stmt1->fetch(PDO::FETCH_ASSOC)){
                $monto_total = $row['monto_total'];
            }
            print $monto_total;
		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
        break;
}

?>
