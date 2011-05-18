<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);


$arr1 = array();
$f = $_GET["f"];

switch ($f) {
	case 1:     // CONSULTA CLIENTES EN ESTADO FORMULADO
		include_once("conexion.php");
		try{


            try{
						$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
						$sql0 ="
                        select count(*)
                    from pedido a,cliente b, distrito c,ciudad d,zonal e,pedido_movimientos f,tecnico g,vendedor h,
                    pedido_estado i
                    where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad
                    and d.id_zonal=e.id_zonal and a.id_pedido=f.id_pedido and a.id_estado=6 and f.id_estado=6
                    and f.id_tecnico=g.id_tecnico and a.id_vendedor=h.id_vendedor and a.id_estado=i.id_estado
                        ";
						$stmt0 =$dbh->prepare($sql0);
						$stmt0->execute();
						$filas=$stmt0->fetchColumn();
					}catch (PDOException $e){
						echo 'Error en la linea: ' . $e->getLine() . '<br />';
					}

                    $sql ="select a.id_pedido,a.f_reg_ped,f.f_movimiento,
                   concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,
                    f.id_tecnico,concat(g.ap_paterno,' ',g.ap_materno,', ',g.nombres) as nom_tecnico,
                    a.id_vendedor,concat(h.ap_paterno,' ',h.ap_materno,', ',h.nombre) as nom_vendedor,
                    a.id_estado,i.desc_estado
                    from pedido a,cliente b, distrito c,ciudad d,zonal e,pedido_movimientos f,tecnico g,vendedor h,
                    pedido_estado i
                    where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad
                    and d.id_zonal=e.id_zonal and a.id_pedido=f.id_pedido and a.id_estado=6 and f.id_estado=6
                    and f.id_tecnico=g.id_tecnico and a.id_vendedor=h.id_vendedor and a.id_estado=i.id_estado
                    order by a.id_pedido desc";
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $stmt1 =$dbh->prepare($sql);
                    $stmt1->execute();

                        while($row=$stmt1->fetchObject()){
                            $arr1[] = $row;
                        }

                        echo '{"total":"'.$filas.'","lista":'.json_encode($arr1).'}';
            
		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
	case 2:     // CAMBIAMOS EL PEDIDO A ESTADO PROGRAMADO
		break;
}
?>
