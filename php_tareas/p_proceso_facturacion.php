<?php

// * Script para ejecutarse en el crontab del servidor
// Especificaciones. Correo Elsa Yolanda 11-03-09
// 1.- La FACTURACION es mensual del 1 al 30 0 31 de cada mes.
// 2.- La fecha de facturacion es el 17 de cada mes, la emision de los recibos se realizan los dias 18,19,20,21,22 y 23 de
//     cada mes.
//     En el transcurso de los dias 24,25,26 y 27 llegan los recibos al domicilio de los abonados.
//     La primera cuota es por adelantado, por ejemplo: Si la instalacion es el dia 9 de Marzo.El abonado esta pagando
//     por el servicio del 9 de Marzo al 9 de Abril.
//     El siguiente recibo de pago sera por los dias; 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29 y 30
//     del mes de Abril
// 3.- Despues de la Facturacion:
//     Si la instalacion es el dia 25 de Abril. El abonado esta pagando por el servicio del 25 de Abril al 25 de Mayo.
//     El siguiente recibo de pago sera por los dias 26,27,28,29,30 y 31 de Mayo.


ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

include_once("../php_procesos/conexion.php");
try{

    include_once('../php_procesos/ftn_facturacion_meses.php');  

    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $sql ="select a.id_pedido,a.id_estado,a.id_servicio,a.id_cliente,a.f_liq_ped,now(),datediff(now(),a.f_liq_ped) as dias_instalados,
            b.precio_unitario as pago_mensual,b.precio_por_dia,a.cant_eq,b.monto_por_tv_adicional,a.f_liq_ped,c.id_tiposervicio,a.cant_eq
            from pedido a,servicio b,tipo_servicio c where a.id_servicio=b.id_servicio and b.id_tiposervicio=c.id_tiposervicio and id_estado=6";

    $stmt1 =$dbh->prepare($sql);
    $stmt1->execute();
    while($row=$stmt1->fetch(PDO::FETCH_ASSOC)){

        //Es una alta nueva con menos de 30 dias de instalado.
        //Cliente hace primer pago por adelantado.

        //INSTALACION NUEVA
        if($row['dias_instalados']<30){
                                                                                           
            $primer_dia_servicio=substr($row['f_liq_ped'],8,2);
            $mes_instalacion=substr($row['f_liq_ped'],5,2);

            //Si la fecha de la alta es antes o igual al dia 17
            if($primer_dia_servicio<=17){

                $dias_a_pagar=$ult_dia_pago-$primer_dia_servicio;
                $periodo_facturado=($primer_dia_servicio+1).'-'.$month.'-'.$year.' al '.$ult_dia_pago.'-'.$month.'-'.$year;
            }else{
            //Si la fecha de la alta es despues del dia 17
                $dias_a_pagar=$ult_dia_pago-$primer_dia_servicio;
                $periodo_facturado=($primer_dia_servicio+1).'-'.$month.'-'.$year.' al '.$ult_dia_pago.'-'.$month.'-'.$year;
            }

            $monto=$dias_a_pagar*$row['precio_por_dia'];
            if($row["id_tiposervicio"]==1){     //Si es Servicio de Cable
                if($row["cant_eq"]>0){
                    $monto_por_eq=$row["monto_por_tv_adicional"]*$row["cant_eq"];
                    $monto=$monto+$monto_por_eq;
                }
            }

            try{
                $periodo_inicial_facturado=$primer_dia_servicio.'-'.$mes_instalacion.'-'.$year.' al '.$primer_dia_servicio.'-'.$month.'-'.$year;
                $sql3='UPDATE facturacion SET periodo=:xperiodo
                        WHERE id_pedido=:xid_pedido and id_cliente=:xid_cliente';
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $stmt3 = $dbh->prepare($sql3);
                $stmt3->bindParam(':xperiodo',$periodo_inicial_facturado);
                $stmt3->bindParam(':xid_pedido',$row['id_pedido']);
                $stmt3->bindParam(':xid_cliente',$row['id_cliente']);
                $stmt3->execute();

            }catch (PDOException $e){
                echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
            }
        }else if ($row['dias_instalados']>30){

            $monto=$cant_dias_next_month*$row['precio_por_dia'];
            if($row["id_tiposervicio"]==1){     //Si es Servicio de Cable
                if($row["cant_eq"]>0){
                    $monto_por_eq=$row["monto_por_tv_adicional"]*$row["cant_eq"];
                    $monto=$monto+$monto_por_eq;
                }
            }
            $dias_a_pagar=$cant_dias_next_month;
            $periodo_facturado='01-'.$next_month.'-'.$year.' al '.$cant_dias_next_month.'-'.$next_month.'-'.$year;
        }

        try{
            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $dbh->beginTransaction();
            $sql1 = "INSERT IGNORE INTO facturacion (id_pedido,id_cliente,id_estado_pago,monto,f_vencimiento,dias_facturados,periodo)
                    VALUES (:xid_pedido,:xid_cliente,1,:xmonto,:xf_vencimiento,:xdias_facturados,:xperiodo)";
            $stmt2 = $dbh->prepare($sql1);
            $stmt2->execute(array(
                ':xid_pedido'       =>$row['id_pedido'],
                ':xid_cliente'  	=>$row['id_cliente'],
                ':xmonto'           =>$monto,
                ':xf_vencimiento'   =>$f_vencimiento,
                ':xdias_facturados' =>$dias_a_pagar,
                ':xperiodo'         =>$periodo_facturado
            ));
            $dbh->commit();
        }catch (PDOException $e){
            echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
        }

    }
    

}catch (PDOException $e){
    echo 'SQL Query: ', $sql . '<br/>';
    echo 'Error: '   .$e->getMessage() . '<br />';
    echo 'Archivo: ' .$e->getFile() . '<br />';
    echo 'Linea: '   .$e->getLine() . '<br />';
}


?>
