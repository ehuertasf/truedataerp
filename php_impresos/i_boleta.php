<?php

include('../librerias/ezpdf/class.ezpdf.php');


$pdf =& new Cezpdf('a4','portrait');
$pdf->selectFont('fonts/roman.fon');

$idfacturacion=$_GET["idfacturacion"];


try{
    include('../php_procesos/conexion.php');
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $sql_datos="SELECT DISTINCT CONCAT(b.nombre,' ',b.ap_paterno,' ',b.ap_materno) AS nombre,b.id_tipo_doc,b.num_documento,
            CONCAT(c.direccion_inst,' ',c.num_domicilio,' ',c.mza_lte,' ',d.desc_distrito ) AS direccion,b.id_cliente
            FROM facturacion a,cliente b,pedido c,distrito d
            WHERE a.id_cliente=b.id_cliente AND a.id_pedido=c.id_pedido AND c.id_distrito=d.id_distrito AND a.id_facturacion=:xidfacturacion";
    $stmt0 =$dbh->prepare($sql_datos);
    $stmt0->bindParam(':xidfacturacion',$idfacturacion);
    $stmt0->execute();
    while($row0=$stmt0->fetch(PDO::FETCH_ASSOC)){
        $nom_cliente= utf8_decode($row0['nombre']);
        $tipo_doc   = $row0['id_tipo_doc'];
        $num_doc    = $row0['num_documento'];
        $domicilio  = utf8_decode($row0['direccion']);
        $idcliente  = $row0['id_cliente'];
    }
 

}catch (PDOException $e){
    echo 'SQL Query: ', $sql . '<br/>';
    echo 'Error: '   .$e->getMessage() . '<br />';
    echo 'Archivo: ' .$e->getFile() . '<br />';
    echo 'Linea: '   .$e->getLine() . '<br />';
}

$pdf->addText(100,700, 10, $nom_cliente);
$pdf->addText(400,700, 10, $num_doc);

$pdf->addText(100,680, 10, $domicilio);
$pdf->addText(400,680, 10, date("d/m/Y"));

$pdf->ezSetY(650);


$y=650;
try{
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $sql2 ="select a.id_facturacion,a.id_pedido,concat(c.ap_paterno,' ',c.ap_materno,', ',c.nombre) as nom_cliente,
                a.id_estado_pago,d.estado_pago,a.num_recibo,a.monto,
                a.f_vencimiento,
                concat(substring(a.f_vencimiento,9,2),'-',substring(a.f_vencimiento,6,2),'-',substring(a.f_vencimiento,1,4)) as f_pago,
                a.dias_facturados,b.cant_eq,
                b.id_servicio,e.nom_servicio,f.nom_moneda,
                concat(substring(b.f_liq_ped,9,2),'-',substring(b.f_liq_ped,6,2),'-',substring(b.f_liq_ped,1,4)) as f_alta,
                a.periodo,f.pref_moneda,c.id_cliente,c.id_tipo_doc,e.precio_unitario,e.monto_por_tv_adicional,e.precio_por_dia
                from facturacion a,pedido b,cliente c,estados_pago d,servicio e,moneda f
                where a.id_pedido=b.id_pedido and a.id_cliente=c.id_cliente and a.id_estado_pago=d.id_estado_pago and
                b.id_servicio=e.id_servicio and e.id_moneda=f.id_moneda and a.id_estado_pago=1 and b.id_cliente=:xidcliente
                order by a.id_pedido";

    $stmt2 =$dbh->prepare($sql2);
    $stmt2->bindParam(':xidcliente',$idcliente);
    $stmt2->execute();

    $contador=0;
    $monto_total=0;
    while($row2=$stmt2->fetch(PDO::FETCH_ASSOC)){
        $contador++;
        if($row2["cant_eq"]==0){
            $pdf->addText(50,$y,9,$contador);
            $pdf->addText(80,$y,9,'Por Servicio de '.$row2["nom_servicio"].',');
            $pdf->addText(80,$y-12,9,'dias facturados '.$row2["dias_facturados"].', periodo '.$row2["periodo"]);
            $pdf->addText(350,$y,9,$row2["pref_moneda"].' '.$row2["precio_unitario"]);
            $pdf->addText(400,$y,9,$row2["pref_moneda"].' '.(($row2["dias_facturados"]*$row2["precio_por_dia"])).'.00');
            $y=$y-24;
        }

        if($row2["cant_eq"]>0){
            $pdf->addText(50,$y,9,$contador);
            $pdf->addText(80,$y,9,'Por Servicio de '.$row2["nom_servicio"].',');
            $pdf->addText(80,$y-12,9,'dias facturados '.$row2["dias_facturados"].', periodo '.$row2["periodo"]);
            $pdf->addText(350,$y,9,$row2["pref_moneda"].' '.$row2["precio_unitario"]);
            $pdf->addText(400,$y,9,$row2["pref_moneda"].' '.(($row2["dias_facturados"]*$row2["precio_por_dia"])).'.00');

            $pdf->addText(50,$y-24,9,$contador+1);
            $pdf->addText(80,$y-24,9,'Equipos adicionales instalados '.$row2["cant_eq"]);
            $pdf->addText(350,$y-24,9,$row2["pref_moneda"].' '.$row2["monto_por_tv_adicional"]);
            $pdf->addText(400,$y-24,9,($row2["pref_moneda"].' '.($row2["monto_por_tv_adicional"]*$row2["cant_eq"])).'.00');
            $y=$y-48;
        }
            $monto_total=$monto_total+$row2["monto"];
    }

    $pdf->addText(400,500,9,$monto_total.'.00');
    
}catch (PDOException $e){
    echo 'SQL Query: ', $sql2 . '<br/>';
    echo 'Error: '   .$e->getMessage() . '<br />';
    echo 'Archivo: ' .$e->getFile() . '<br />';
    echo 'Linea: '   .$e->getLine() . '<br />';
}



//$pdf->ezText("<b>Hora:</b> ".date("H:i:s")."\n\n",10);
$pdf->setPreferences(HideToolbar,"true");
$pdf->setPreferences(HideWindowUI,"true");


$pdf->ezStream();
$pdf->ezOutput(1);


?>
