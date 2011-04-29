<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$arr = array();
$f = $_POST["f"];

switch ($f) {
	case 1:     // CONSULTA CLIENTES EN ESTADO REGISTRADO
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$sql ="select a.id_pedido,a.f_reg_ped,concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,
                    concat(a.direccion_inst,' ',a.num_domicilio,' ',a.mza_lte) as direccion,c.desc_distrito,d.desc_ciudad,e.desc_zonal
                    from pedido a,cliente b, distrito c,ciudad d,zonal e
                    where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad and d.id_zonal=e.id_zonal and a.id_estado=1
                    order by 2";
			$stmt1 =$dbh->prepare($sql);
			$stmt1->execute();
            $sw=0;
			while($row=$stmt1->fetchObject()){
				$arr1[] = $row;
                $sw=1;
        	}

            if ($sw==1)	echo '{"lst_registrados":'.json_encode($arr1).'}';
            else echo '{"lst_registrados":[{"id_pedido":"","f_reg_ped":"","nombre":"","direccion":"","desc_distrito":"","desc_ciudad":"","desc_zonal":""}]}';

		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
	case 2:     // CAMBIAMOS EL PEDIDO A ESTADO FORMULADO
        $f_formulada=$fechayhora = date("Y-m-d H:i", time());
		include_once("conexion.php");
		try{
            $valores=explode(",", $_POST['idpedidos']);
            
            for($x=0;$x<=count($valores)-1;$x++){
                $sql1='UPDATE pedido SET id_estado=2 WHERE id_pedido=:xidpedido';
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $stmt1 = $dbh->prepare($sql1);
                $stmt1->bindParam(':xidpedido',$valores[$x]);
                $stmt1->execute();
               try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $dbh->beginTransaction();
                    $sql3 = "INSERT INTO historico_pedido (id_user,id_accion,f_movimiento,id_pedido,modulo)
                            VALUES (:xid_user,4,:xf_formulada,:xid_pedido,'Bandeja de Asignaciones')";
                    $stmt3 = $dbh->prepare($sql3);
                    $stmt3->execute(array(
                        ':xid_user'         =>$_POST['iduser'],
                        ':xid_pedido'       =>$valores[$x],
                        ':xf_formulada'     =>$f_formulada
                    ));
                    $dbh->commit();
                    try{
                        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        $dbh->beginTransaction();
                        $sql4 = "INSERT INTO pedido_movimientos (id_pedido,f_movimiento,id_estado,id_tecnico,id_user)
                                VALUES (:xid_pedido,:xf_movimiento,2,1,:xid_user)";
                        $stmt4 = $dbh->prepare($sql4);
                        $stmt4->execute(array(
                            ':xid_user'         =>$_POST['iduser'],
                            ':xf_movimiento'	=>$f_formulada,
                            ':xid_pedido'       =>$valores[$x]
                        ));
                        $dbh->commit();
                    }catch (PDOException $e){
                        echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                    }
                }catch (PDOException $e){
                    echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                }
            }
            print 1;
		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
	case 3:     // CAMBIAMOS EL PEDIDO A ESTADO RECHAZADO
		include_once("conexion.php");
		try{
            $valores=explode(",", $_POST['idpedidos']);
            $f_formulada=$fechayhora = date("Y-m-d H:i", time());
            for($x=0;$x<=count($valores)-1;$x++){
                $sql1='UPDATE pedido SET id_estado=5 WHERE id_pedido=:xidpedido';
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $stmt1 = $dbh->prepare($sql1);
                $stmt1->bindParam(':xidpedido',$valores[$x]);
                $stmt1->execute();
               try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $dbh->beginTransaction();
                    $sql3 = "INSERT INTO historico_pedido (id_user,id_accion,f_movimiento,id_pedido,modulo)
                            VALUES (:xid_user,4,:xf_formulada,:xid_pedido,'Bandeja de Asignaciones')";
                    $stmt3 = $dbh->prepare($sql3);
                    $stmt3->execute(array(
                        ':xid_user'         =>$_POST['iduser'],
                        ':xid_pedido'       =>$valores[$x],
                        ':xf_formulada'     =>$f_formulada
                    ));
                    $dbh->commit();
                    try{
                        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        $dbh->beginTransaction();
                        $sql4 = "INSERT INTO pedido_movimientos (id_pedido,f_movimiento,id_estado,id_tecnico,id_user)
                                VALUES (:xid_pedido,:xf_movimiento,5,1,:xid_user)";
                        $stmt4 = $dbh->prepare($sql4);
                        $stmt4->execute(array(
                            ':xid_user'         =>$_POST['iduser'],
                            ':xf_movimiento'	=>$f_formulada,
                            ':xid_pedido'       =>$valores[$x]
                        ));
                        $dbh->commit();
                    }catch (PDOException $e){
                        echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                    }
                }catch (PDOException $e){
                    echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                }
            }
            print 1;

		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
}
?>
