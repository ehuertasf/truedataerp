<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$arr = array();
$f = $_POST["f"];

switch ($f) {
	case 1:     // CONSULTA PRODUCTOS ADQUIRIDOS POR EL CLIENTE
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$sql ="select a.id_pedido,c.nom_servicio,a.cant_eq,a.f_reg_ped,d.desc_estado,
                    a.f_liq_ped
                    from pedido a,cliente b,servicio c,pedido_estado d
                    where a.id_cliente=b.id_cliente and a.id_servicio=c.id_servicio
                    and a.id_estado=d.id_estado
                    and b.id_tipo_doc=:tdoc and b.num_documento=:num_doc order by 1";
			$stmt1 =$dbh->prepare($sql);
            $stmt1->bindParam(':num_doc', trim($_POST['num_doc']));
            $stmt1->bindParam(':tdoc', trim($_POST['tdoc']));
			$stmt1->execute();
			while($row=$stmt1->fetchObject()){
				$arr1[] = $row;
        	}

            echo '{"lst_productos":'.json_encode($arr1).'}';

		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
}
?>
