<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('UTC');

$arr = array();
$f = $_POST["f"];

switch ($f) {
	case 1:     // CONSULTA CLIENTES A LOS QUE SE LES VA A FACTURAR
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $sql ="select a.id_facturacion,a.id_pedido,concat(c.ap_paterno,' ',c.ap_materno,', ',c.nombre) as nom_cliente,
                    a.id_estado_pago,d.estado_pago,a.num_recibo,a.monto,
                    a.f_vencimiento,
                    concat(substring(a.f_vencimiento,9,2),'-',substring(a.f_vencimiento,6,2),'-',substring(a.f_vencimiento,1,4)) as f_pago,
                    a.dias_facturados,b.cant_eq,
                    b.id_servicio,e.nom_servicio,f.nom_moneda,
                    concat(substring(b.f_liq_ped,9,2),'-',substring(b.f_liq_ped,6,2),'-',substring(b.f_liq_ped,1,4)) as f_alta,
                    a.periodo,f.pref_moneda,c.id_cliente,c.id_tipo_doc
                    from facturacion a,pedido b,cliente c,estados_pago d,servicio e,moneda f
                    where a.id_pedido=b.id_pedido and a.id_cliente=c.id_cliente and a.id_estado_pago=d.id_estado_pago and
                    b.id_servicio=e.id_servicio and e.id_moneda=f.id_moneda and a.id_estado_pago=1
                    order by a.id_pedido";

            $stmt1 =$dbh->prepare($sql);
            $stmt1->execute();
            $sw=0;
            while($row=$stmt1->fetchObject()){
                $arr1[] = $row;
                $sw=1;
            }

            if ($sw==1)	echo '{"lst_facturados":'.json_encode($arr1).'}';
            else echo '{"lst_facturados":[{"id_facturacion":"","id_pedido":"","nom_cliente":"","id_estado_pago":"","estado_pago":"","num_recibo":"","monto":"","f_vencimiento":"","dias_facturados":"","cant_eq":"","id_servicio":"","nom_servicio":"","f_liq_ped":"","periodo":"","pref_moneda":"","id_cliente":"","id_tipo_doc":""}]}';

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
    case 3:
		include_once("conexion.php");
        $valor = $_POST["valor"];
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $sql ="select a.id_facturacion,a.id_pedido,concat(c.ap_paterno,' ',c.ap_materno,', ',c.nombre) as nom_cliente,
                    a.id_estado_pago,d.estado_pago,a.num_recibo,a.monto,
                    a.f_vencimiento,
                    concat(substring(a.f_vencimiento,9,2),'-',substring(a.f_vencimiento,6,2),'-',substring(a.f_vencimiento,1,4)) as f_pago,
                    a.dias_facturados,b.cant_eq,
                    b.id_servicio,e.nom_servicio,f.nom_moneda,
                    concat(substring(b.f_liq_ped,9,2),'-',substring(b.f_liq_ped,6,2),'-',substring(b.f_liq_ped,1,4)) as f_alta,
                    a.periodo,f.pref_moneda
                    from facturacion a,pedido b,cliente c,estados_pago d,servicio e,moneda f
                    where a.id_pedido=b.id_pedido and a.id_cliente=c.id_cliente and a.id_estado_pago=d.id_estado_pago and
                    b.id_servicio=e.id_servicio and e.id_moneda=f.id_moneda and a.id_estado_pago=1
                    and (c.num_documento like :xvalor or c.nombre like :xvalor or c.ap_paterno like :xvalor or c.ap_materno like :xvalor)
                    order by a.id_pedido";

            $stmt1 =$dbh->prepare($sql);
            $valor ='%'.$valor.'%';
            $stmt1->bindParam(':xvalor', $valor);
            $stmt1->execute();
            $sw=0;
            while($row=$stmt1->fetchObject()){
                $arr1[] = $row;
                $sw=1;
            }

            if ($sw==1)	echo '{"lst_facturados":'.json_encode($arr1).'}';
            else echo '{"lst_facturados":[{"id_facturacion":"","id_pedido":"","nom_cliente":"","id_estado_pago":"","estado_pago":"","num_recibo":"","monto":"","f_vencimiento":"","dias_facturados":"","cant_eq":"","id_servicio":"","nom_servicio":"","f_liq_ped":"","periodo":"","pref_moneda":""}]}';

		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
        break;

}
?>
