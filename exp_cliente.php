<?php
	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition: attachment; filename=xls_clientes.xls");
	
  	$usuario	=$_GET["usuario"];
  	$idusuario	=$_GET["idusuario"];
  	$fechayhora = date("Y-m-d H:i", time());
  	
	$cabecera= array("Item","Ap. Paterno","Ap. Materno","Nombres","DNI","Telefono Casa","Telefono Celular","Telefono Trabajo","Estado","Zonal","Ciudad","Pais","Tipo Abonado","Email","Estado");
?>
<html>
<head>
<title>Listado de Cliente</title>
</head>
<body>
	<table>
	<tr>
	<td colspan='7'><b>Listado de Cliente</b></td>
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
		$cad ="select
                a.id_cliente,a.ap_paterno,a.ap_materno,a.nombre,a.dni,a.telefono_casa,a.telefono_trabajo,a.telefono_celular,a.id_zonal,a.id_ciudad,a.id_pais,a.id_tipo_abonado,a.email,a.estado
			    from cliente a";
		
		$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
		$stmt =$dbh->prepare($cad);
		$stmt->execute();

		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			?>
			<tr>
				<td><?=$cont=$cont+1?></td>
				<td><?=$row["ap_paterno"]?></td>
                <td><?=$row["ap_materno"]?></td>
                <td><?=$row["nombre"]?></td>
                <td><?=$row["dni"]?></td>
                <td><?=$row["telefono_casa"]?></td>
                <td><?=$row["telefono_celular"]?></td>
                <td><?=$row["telefono_trabajo"]?></td>
                <td><?=$row["id_zonal"]?></td>
                <td><?=$row["id_ciudad"]?></td>
                <td><?=$row["id_pais"]?></td>
                <td><?=$row["tipo_abonado"]?></td>
                <td><?=$row["email"]?></td>
                <td><?=$row["estado"]?></td>
              
			</tr>
			<?php
		}
		//ingreso_auditoria_mproductos($idusuario);
	}catch (PDOException $e){
		echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la l&iacute;nea: ' . $e->getLine() . '<br />';
	} 
	
	/*function ingreso_auditoria_mproductos($idusuario){
		try{
		  	include("conexion.php");
	 	
		  	$fechayhora = date("Y-m-d H:i", time());
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$dbh->beginTransaction();				
			$sql = 'INSERT INTO tb_auditoria (idusuario,idmodulo,idaccion,fh_registro)
			    VALUES (:usuario,:modulo,:accion,:fechayhora)';
			    
			$stmt3 = $dbh->prepare($sql);
			$stmt3->execute(array(':usuario'=>$idusuario,':modulo'=>6,':accion'=>6,':fechayhora'=>$fechayhora));		
		
			$dbh->commit();		
		}catch (PDOException $e){
			$dbh->rollBack();		
			echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la l&iacute;nea: ' . $e->getLine() . '<br />';
		}	
	}*/
	?>
	</table>
</body>
</html>


