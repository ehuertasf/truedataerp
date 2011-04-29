<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('UTC');

$arr = array();
$f = $_POST["f"];

switch ($f) {
	case 1:     // CONSULTA CLIENTES EN ESTADO FORMULADO
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $sql ="select a.id_pedido,a.f_reg_ped,concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,
                    concat(a.direccion_inst,' ',a.num_domicilio,' ',a.mza_lte,' - ',c.desc_distrito,' - ',d.desc_ciudad) as direccion,
                    f.id_tecnico,concat(g.ap_paterno,' ',g.ap_materno,', ',g.nombres) as nom_tecnico,f.f_movimiento
                    from pedido a,cliente b, distrito c,ciudad d,zonal e,pedido_movimientos f,tecnico g
                    where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad
                    and d.id_zonal=e.id_zonal and a.id_pedido=f.id_pedido and a.id_estado=2 and f.id_estado=2
                    and f.id_tecnico=g.id_tecnico
                    order by 2 ";

            $stmt1 =$dbh->prepare($sql);
            $stmt1->execute();
            $sw=0;
            while($row=$stmt1->fetchObject()){
                $arr1[] = $row;
                $sw=1;
            }

            if ($sw==1)	echo '{"lst_registrados":'.json_encode($arr1).'}';
            else echo '{"lst_registrados":[{"id_pedido":"","f_reg_ped":"","nombre":"","direccion":"","id_tecnico":"","nom_tecnico":"","f_movimiento":""}]}';

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

        $f_programacion =$_POST["idfecha1"];
        $id_tecnico     =$_POST["id_tecnico"];
        $id_pedido      =$_POST["idxTxt_pedido"];

        $f_programacion=substr($f_programacion,6,4)."-".substr($f_programacion,3,2)."-".substr($f_programacion,0,2);

        $fechayhora = date("Y-m-d H:i", time());
		try{
           
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
                    echo "{success: true}";
                }catch (PDOException $e){
                    //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                    echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                }
            }catch (PDOException $e){
                //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
            }

            
		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
        
         
		break;

}
?>
