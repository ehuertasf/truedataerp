<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('UTC');

$arr = array();
$f = $_POST["f"];

switch ($f) {
	case 1:     // CONSULTA CLIENTES EN ESTADO DESPACHADO
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $sql ="select
                    p.id_estado,p.desc_estado
                    from pedido_estado p
                    where p.id_estado in(6,5) order by 1 desc";

            $stmt1 =$dbh->prepare($sql);
            $stmt1->execute();
            $sw=0;
            while($row=$stmt1->fetchObject()){
                $arr1[] = $row;
                $sw=1;
            }

            if ($sw==1)	echo '{"lst_accion":'.json_encode($arr1).'}';
            else echo '{"lst_accion":[{"id_estado":"","desc_estado":""}]}';

            //echo '{"lst_registrados":'.json_encode($arr1).'}';
            
		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
    
	case 2:     // CAMBIAMOS EL PEDIDO A ESTADO PROGRAMADO
		include_once("conexion.php");
        include_once("ftn_convierte_fechas.php");
        
        $fechayhora = date("Y-m-d H:i", time());
		try{
            $valores=explode("|", $_POST['datos']);

            for($x=0;$x<=count($valores)-1;$x++){
                $id_pedido      =$valores[0];
                $id_tecnico     =$valores[1];
                $f_programacion =$valores[2];
            }
            $f_programacion=ftn_covierte_fechas_gmt($f_programacion);

            $sql1='UPDATE pedido SET id_estado=3,f_prg_ped=:xf_programacion WHERE id_pedido=:xidpedido';
            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $stmt1 = $dbh->prepare($sql1);
            $stmt1->bindParam(':xidpedido',$id_pedido);
            $stmt1->bindParam(':xf_programacion',$f_programacion);
            $stmt1->execute();
            try{
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $dbh->beginTransaction();
                $sql3 = "INSERT INTO historico_pedido (id_user,id_accion,f_movimiento,id_pedido,modulo)
                        VALUES (:xid_user,4,:xf_movimiento,:xid_pedido,'Bandeja Programacion')";
                $stmt3 = $dbh->prepare($sql3);
                $stmt3->execute(array(
                    ':xid_user'         =>$_POST['iduser'],
                    ':xid_pedido'       =>$id_pedido,
                    ':xf_movimiento'    =>$fechayhora
                ));
                $dbh->commit();
                try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $dbh->beginTransaction();
                    $sql4 = "INSERT INTO pedido_movimientos (id_pedido,f_movimiento,id_estado,id_tecnico,id_user)
                            VALUES (:xid_pedido,:xf_movimiento,3,:xid_tecnico,:xid_user)";
                    $stmt4 = $dbh->prepare($sql4);
                    $stmt4->execute(array(
                        ':xid_user'         =>$_POST['iduser'],
                        ':xf_movimiento'	=>$fechayhora,
                        ':xid_pedido'       =>$id_pedido,
                        ':xid_tecnico'      =>$id_tecnico
                    ));
                    $dbh->commit();
                }catch (PDOException $e){
                    echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                }
            }catch (PDOException $e){
                echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
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
