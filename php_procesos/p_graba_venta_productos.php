<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$arr = array();
$accion = $_POST["action"];

switch ($accion) {
    case 'nuevo':
        //GRABAMOS LOS DATOS DE LA CONTRATACION DE NUEVOS PRODUCTOS
	  	try{
			include_once("conexion.php");
            $manzana=$_POST['idtxt_mza_inst'];

            if($manzana=='Dato opcional...')    $manzana='';

            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $sql1 = 'SELECT id_cliente,direccion_postal,id_distrito,num_domicilio,mza_lte
                    FROM cliente WHERE id_tipo_doc=:xid_tipo_doc and num_documento=:xnum_documento';
            $stmt1 = $dbh->prepare($sql1);
            $stmt1->bindParam(':xid_tipo_doc', $_POST['rb-tdoc']);
            $stmt1->bindParam(':xnum_documento', trim($_POST['idndoc']));
            $stmt1->execute();
            while ($row = $stmt1->fetch(PDO::FETCH_ASSOC)) {
                $id_cliente =$row['id_cliente'];
                $dir_postal =$row['direccion_postal'];
                $iddistrito =$row['id_distrito'];
                $num_domici =$row['num_domicilio'];
                $mza_lte    =$row['mza_lte'];
            }

            if(isset($_POST['idfld_direccion-checkbox'])){
                if($_POST['idfld_direccion-checkbox']=='on'){

                    //la direccion de instalacion es diferente que la registrada por el cliente
                    $dir_postal =strtoupper(utf8_encode(trim($_POST['idtxt_direccion_inst'])));
                    $iddistrito =$_POST['id_distrito'];
                    $num_domici =trim($_POST['idtxt_num_inst']);
                    $mza_lte    =strtoupper(utf8_encode(trim($manzana)));
                }
            }

            try{
                $f_reg=$fechayhora = date("Y-m-d H:i", time());
                $cant_eq=trim($_POST['idtxt_cantidad']);
                if(empty($cant_eq)) $cant_eq=0;
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

                $sql = 'INSERT INTO pedido (id_cliente,id_vendedor,f_reg_ped,observaciones,id_tipo_venta,id_estado,direccion_inst,
                        id_distrito,num_domicilio,mza_lte,id_servicio,cant_eq)
                        VALUES (:xid_cliente,:xid_vendedor,:xf_reg,:xobservaciones,:xid_tipo_venta,1,:xdireccion_inst,
                        :xid_distrito,:xnum_domicilio,:xmza_lte,:xid_servicio,:xcant_eq)';
                $stmt1 = $dbh->prepare($sql);
                $stmt1->bindParam(':xid_cliente', $id_cliente);
                $stmt1->bindParam(':xid_vendedor', $_POST['id_vendedor']);
                $stmt1->bindParam(':xf_reg', $f_reg);
                $stmt1->bindParam(':xobservaciones', strtoupper(utf8_encode(trim($_POST['idobservaciones']))));
                $stmt1->bindParam(':xid_tipo_venta', $_POST['rb-tventa']);
                $stmt1->bindParam(':xdireccion_inst', $dir_postal);
                $stmt1->bindParam(':xid_distrito', $iddistrito);
                $stmt1->bindParam(':xnum_domicilio', $num_domici);
                $stmt1->bindParam(':xmza_lte', $mza_lte);
                $stmt1->bindParam(':xid_servicio', $_POST['id_servicio']);
                $stmt1->bindParam(':xcant_eq', $cant_eq);
                $stmt1->execute();           

                $ultimo_id_insertado=$dbh->lastInsertId();

                try{
                    //guardo datos en la tabla historico_pedido
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql2 = 'SELECT id_pedido FROM pedido WHERE id_cliente=:xid_cliente and f_reg_ped=:xf_reg_ped';
                    $stmt2 = $dbh->prepare($sql2);
                    $stmt2->bindParam(':xid_cliente', $id_cliente);
                    $stmt2->bindParam(':xf_reg_ped', $f_reg);
                    $stmt2->execute();
                    while ($row1 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                        $id_pedido =$row1['id_pedido'];
                    }
                       try{
                            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                            $dbh->beginTransaction();
                            $sql3 = "INSERT INTO historico_pedido (id_user,id_accion,f_movimiento,id_pedido,modulo)
                                    VALUES (:xid_user,1,:xf_movimiento,:xid_pedido,'Venta Prod. y Servicios')";
                            $stmt3 = $dbh->prepare($sql3);
                            $stmt3->execute(array(
                                ':xid_user'         =>$_POST['iduser'],
                                ':xf_movimiento'	=>$f_reg,
                                ':xid_pedido'       =>$id_pedido
                            ));
                            $dbh->commit();
                            try{
                                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                                $dbh->beginTransaction();
                                $sql4 = "INSERT INTO pedido_movimientos (id_pedido,f_movimiento,id_estado,id_tecnico,id_user)
                                        VALUES (:xid_pedido,:xf_movimiento,1,1,:xid_user)";
                                $stmt4 = $dbh->prepare($sql4);
                                $stmt4->execute(array(
                                    ':xid_user'         =>$_POST['iduser'],
                                    ':xf_movimiento'	=>$f_reg,
                                    ':xid_pedido'       =>$id_pedido
                                ));
                                $dbh->commit();

                                try{
                                    include_once('../php_procesos/ftn_facturacion_meses.php'); 
                                    $monto=trim(substr($_POST["idtxt_pago_inicial"],3,9));
                                    $periodo_facturado=$dia.'-'.$month.'-'.$year.' al '.$dia.'-'.$next_month.'-'.$year;
                                    
                                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                                    $dbh->beginTransaction();
                                    $sql1 = "INSERT IGNORE INTO facturacion (id_pedido,id_cliente,id_estado_pago,monto,f_vencimiento,dias_facturados,periodo,f_pago)
                                            VALUES (:xid_pedido,:xid_cliente,2,:xmonto,curdate(),30,:xperiodo,now())";
                                    $stmt2 = $dbh->prepare($sql1);
                                    $stmt2->execute(array(
                                        ':xid_pedido'       =>$id_pedido,
                                        ':xid_cliente'  	=>$id_cliente,
                                        ':xmonto'           =>$monto,
                                        ':xperiodo'         =>$periodo_facturado
                                    ));
                                    $dbh->commit();

                                    try{
                                        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                                        $dbh->beginTransaction();
                                        $sql_ = "INSERT INTO geo_comercial (id_pedido,coord_x,coord_y) VALUES (:xid_pedido,:xcoordX,:xcoordY)";
                                        $stmt9 = $dbh->prepare($sql_);
                                        $stmt9->execute(array(
                                            ':xid_pedido'       =>$id_pedido,
                                            ':xcoordX'          =>$_POST['coord_x'],
                                            ':xcoordY'          =>$_POST['coord_y']
                                        ));
                                        $dbh->commit();

                                        echo json_encode(
                                            array(
                                            "success"   => true,
                                            "codped"    => $ultimo_id_insertado,
                                            "codcli"    => "COD".$id_cliente
                                        ));
                                    }catch (PDOException $e){
                                        echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                                        echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                                    }
                                }catch (PDOException $e){
                                    echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                                    echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                                }
                            }catch (PDOException $e){
                                echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                                echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                            }

                        }catch (PDOException $e){
                            echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                            echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                        }                    
                }catch (PDOException $e){
                    echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                    echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                }
            }catch (PDOException $e){
                echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
            }

        }catch (PDOException $e){
            echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
            echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
        }
        break;
}

?>

