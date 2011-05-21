<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('UTC');

$arr = array();
$f = $_POST["f"];

switch ($f) {
	case 1:     // CONSULTA CLIENTES EN ESTADO PROGRAMADO
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $sql ="select a.id_pedido,a.id_estado,h.desc_estado,a.f_reg_ped,concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,
                    concat(a.direccion_inst,' ',a.num_domicilio,' ',a.mza_lte,' - ',c.desc_distrito,' - ',d.desc_ciudad) as direccion,
                    f.id_tecnico,concat(g.ap_paterno,' ',g.ap_materno,', ',g.nombres) as nom_tecnico,f.f_movimiento,a.f_prg_ped,i.nom_servicio,
                    concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,b.codcli,b.telefono_casa
                    from pedido a,cliente b, distrito c,ciudad d,zonal e,pedido_movimientos f,tecnico g,pedido_estado h,servicio i
                    where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad
                    and d.id_zonal=e.id_zonal and a.id_pedido=f.id_pedido and a.id_estado=h.id_estado and a.id_servicio=i.id_servicio
                    and a.id_estado in (4) and f.id_estado=3 and f.id_tecnico=g.id_tecnico
                    order by 2 ";

            $stmt1 =$dbh->prepare($sql);
            $stmt1->execute();
            $sw=0;
            while($row=$stmt1->fetchObject()){
                $arr1[] = $row;
                $sw=1;
            }

            if ($sw==1)	echo '{"lst_programados":'.json_encode($arr1).'}';
            else echo '{"lst_programados":[{"id_pedido":"","f_reg_ped":"","nombre":"","direccion":"","id_tecnico":"","nom_tecnico":"","f_movimiento":"","f_prg_ped":""}]}';

		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
	case 2:     // CAMBIAMOS EL PEDIDO A ESTADO DESPACHADO
		include_once("conexion.php");

        $fechayhora = date("Y-m-d H:i", time());
        
		try{
            $valores=explode(",", $_POST['datos']);
            for($x=0;$x<=count($valores)-1;$x++){
                
                $elementos  =explode("|",$valores[$x]);
                $id_pedido  =$elementos[0];
                $id_tecnico =$elementos[1];

                $sql1='UPDATE pedido SET id_estado=4 WHERE id_pedido=:xidpedido';
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $stmt1 = $dbh->prepare($sql1);
                $stmt1->bindParam(':xidpedido',$id_pedido);
                $stmt1->execute();
                try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $dbh->beginTransaction();
                    $sql3 = "INSERT INTO historico_pedido (id_user,id_accion,f_movimiento,id_pedido,modulo)
                            VALUES (:xid_user,4,:xf_movimiento,:xid_pedido,'Bandeja Despacho')";
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
                                VALUES (:xid_pedido,:xf_movimiento,4,:xid_tecnico,:xid_user)";
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