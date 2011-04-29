<?php
	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition: attachment; filename=xls_ventas.xls");
	
  	$usuario	=$_GET["usuario"];
  	$idusuario	=$_GET["idusuario"];
  	$fechayhora = date("Y-m-d H:i", time());
  	
	$cabecera= array("Item","Pedido","Vendedor","Fec Reg Pedido","Fec Liquidacion","Cliente","Tecnico","Estado");
    ?>
<html>
<head>
<title>Listado de Vendedor</title>
</head>
<body>
	<table>
	<tr>
	<td colspan='7'><b>Listado de Ventas</b></td>
	</tr>
	<tr><td>&nbsp;</td></tr>	
	<tr><td colspan="2"><b>Usuario que genero el reporte : 	</b></td><td><b><?=trim($usuario)?></b></td></tr>
	<tr><td colspan="2"><b>Fecha y hora de generaci&oacute;n :  </b></td><td><b><?=$fechayhora?> </b></td></tr>	
	<tr><td>&nbsp;</td></tr>
	</table>
	<br>
	<table cellpadding="0" cellspacing="0" border="1">
	<tr>
	    <?php
	    foreach ($cabecera as $j){
	    ?>
	    	<td bgcolor="#CCCCCC" align="center"><?=$j?></td>
	    <?php
	    }
	    ?>	      		
	</tr>	
	
	<?php
	try{
		include_once("conexion.php");
		$cont=0;
		$cad ="select a.id_pedido,a.f_reg_ped,f.f_movimiento,
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
		$stmt =$dbh->prepare($cad);
		$stmt->execute();

		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			?>
			<tr>
				<td><?=$cont=$cont+1?></td>
				<td><?=$row["id_pedido"]?></td>
                <td><?=$row["nom_vendedor"]?></td>
                <td><?=$row["f_reg_ped"]?></td>
                <td><?=$row["f_movimiento"]?></td>
                <td><?=$row["nombre"]?></td>
                <td><?=$row["desc_estado"]?></td>
                <td><?=$row["nom_tecnico"]?></td>
                <td><?=$row["estado"]?></td>
              
			</tr>
			<?php
		}
		//ingreso_auditoria_mproductos($idusuario);
	}catch (PDOException $e){
		echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la l&iacute;nea: ' . $e->getLine() . '<br />';
	} 
	
	
	?>
	</table>
</body>
</html>


