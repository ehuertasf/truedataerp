<?php
	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition: attachment; filename=xls_clientes.xls");
	
  	$usuario	=$_GET["usuario"];
  	$idusuario	=$_GET["idusuario"];
  	$fechayhora = date("Y-m-d H:i", time());
  	
	$cabecera= array("Item","Nombre Nodo","Direccion","Direccion Referencial","Fecha Instalacion","Latitud","Longitud","Numero de Serie","Numero Ptos Forward","Numero Ptos Retorno","Modelo","Marca","Area");
?>
<html>
<head>
<title>Lista de Nodo</title>
</head>
<body>
	<table>
	<tr>
	<td colspan='7'><b>Listado de Nodo</b></td>
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
                a.id_nodo,a.direccion,a.nom_nodo,a.latitud,a.longitud,a.fec_instalacion,a.num_serie,a.num_ptos_forward,a.num_ptos_retorno,a.direccion_referencial,a.id_modelo,a.id_marca,a.id_area
			    from nodo a";
		
		$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
		$stmt =$dbh->prepare($cad);
		$stmt->execute();

		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			?>
			<tr>
				<td><?=$cont=$cont+1?></td>
				<td><?=$row["nom_nodo"]?></td>
				<td><?=$row["direccion"]?></td>
                <td><?=$row["direccion_referencial"]?></td>
                <td><?=$row["fec_instalacion"]?></td>
				<td><?=$row["latitud"]?></td>
                <td><?=$row["longitud"]?></td>
                <td><?=$row["num_serie"]?></td>
                <td><?=$row["num_ptos_forward"]?></td>
                <td><?=$row["num_ptos_retorno"]?></td>
                <td><?=$row["id_modelo"]?></td>
                <td><?=$row["id_marca"]?></td>
                <td><?=$row["id_area"]?></td>
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


