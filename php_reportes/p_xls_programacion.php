<?php

	ini_set("max_execution_time","18200");
	ini_set("max_input_time","18200");
	ini_set("memory_limit","500M");
	set_time_limit(0);
	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition: attachment; filename=BANDEJA_DE_PROGRAMACION.xls");
	header("Pragma: no-cache");
	header("Expires: 0");
    $hoy=date("Y-m-d h:m");
	$cabecera= array("Item","N&uacute;m. Pedido","Estado del Pedido","Fecha Registro","Cliente","Direcci&oacute;n de Instalaci&oacute;n",
                    "T&eacute;cnico","F/H Ultimo Movimiento","Servicio Adquirido");
    ?>
	<table>
        <tr>
            <td colspan='7' style="font-family: Tahoma, Verdana; font-size:10px;"><b>Listado de Ordenes Pendientes de Programar Visita</b></td>
        </tr>
        <tr>
            <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;">Fecha Reporte</td>
            <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$hoy?></td>
        </tr>
        <tr><td>&nbsp;</td></tr>
	</table>

	<table cellpadding="0" cellspacing="0" border="1">
	<tr>
	    <?php
	    foreach ($cabecera as $j){
	    ?>
	    	<td bgcolor="#CCCCCC" style="font-family: Tahoma, Verdana; font-size:10px;" align="center"><?=$j?></td>
	    <?php
	    }
	    ?>
	</tr>
	<?php
    try{
        include_once("../php_procesos/conexion.php");
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $cad ="select a.id_pedido,h.desc_estado,a.f_reg_ped,concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,
            concat(a.direccion_inst,' ',a.num_domicilio,' ',a.mza_lte,' - ',c.desc_distrito,' - ',d.desc_ciudad,', ',e.desc_zonal) as direccion,
            f.id_tecnico,concat(g.ap_paterno,' ',g.ap_materno,', ',g.nombres) as nom_tecnico,f.f_movimiento,i.nom_servicio
            from pedido a,cliente b, distrito c,ciudad d,zonal e,pedido_movimientos f,tecnico g,pedido_estado h,servicio i
            where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad and a.id_estado=h.id_estado 
            and a.id_servicio=i.id_servicio and d.id_zonal=e.id_zonal and a.id_pedido=f.id_pedido and a.id_estado=2 and f.id_estado=2
            and f.id_tecnico=g.id_tecnico
            order by 2";
        $stmt =$dbh->prepare($cad);
        $stmt ->execute();
        $cont=0;
        while($row=$stmt->fetch(PDO::FETCH_ASSOC))
        {
        ?>
            <tr>
                <td style="font-family: Tahoma, Verdana; font-size:10px;"><?=$cont=$cont+1?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["id_pedido"]?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["desc_estado"]?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["f_reg_ped"]?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["nombre"]?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["direccion"]?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["nom_tecnico"]?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["f_movimiento"]?></td>
                <td align='left' style="font-family: Tahoma, Verdana; font-size:10px;"><?=$row["nom_servicio"]?></td>
            </tr>
        <?php
        }

    }catch (PDOException $e){
        echo 'SQL Query: ', $sql . '<br/>';
        echo 'Error: '   .$e->getMessage() . '<br />';
        echo 'Archivo: ' .$e->getFile() . '<br />';
        echo 'Linea: '   .$e->getLine() . '<br />';
    }
    ?>
    </table>



