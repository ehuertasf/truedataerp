<?php
	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition: attachment; filename=xls_clientes.xls");
	
  	$usuario	=$_GET["usuario"];
  	$idusuario	=$_GET["idusuario"];
  	$fechayhora = date("Y-m-d H:i", time());
  	
	$cabecera= array("Item","Nombre Material","Precio Unitario","Cantidad","Unidad","Estandar","Adicional","Estado");
?>
<html>
<head>
<title>Lista de Tipo Servicio</title>
</head>
<body>
	<table>
	<tr>
	<td colspan='7'><b>Listado de Tipo Servicio</b></td>
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
                a.id_material,a.nom_material,a.precio_unitario,a.cantidad,a.unidad,a.estandar,a.adicional,a.estado
			    from material a";
		
		$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
		$stmt =$dbh->prepare($cad);
		$stmt->execute();

		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			?>
			<tr>
				<td><?=$cont=$cont+1?></td>
				<td><?=$row["nom_material"]?></td>
				<td><?=$row["precio_unitario"]?></td>
                <td><?=$row["cantidad"]?></td>
                <td><?=$row["unidad"]?></td>
                <td><?=$row["estandar"]?></td>
                <td><?=$row["adicional"]?></td>
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


