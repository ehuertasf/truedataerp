<?php
	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition: attachment; filename=xls_clientes.xls");
	
  	$usuario	=$_GET["usuario"];
  	$idusuario	=$_GET["idusuario"];
  	$fechayhora = date("Y-m-d H:i", time());
  	
	$cabecera= array("Item","C&oacute;digo","Nombre","RUC","DNI","Departamento",
					"Ciudad","Distrito","Direcci&oacute;n 1","Direcci&oacute;n 2","Direcci&oacute;n 3",
					"Direcci&oacute;n 4","Tel&eacute;fono 1","Tel&eacute;fono 2","E-Mail","Contacto",
					"Observaciones","Estado");  		
?>
<html>
<head>
<title>Lista de clientes</title>
</head>
<body>
	<table>
	<tr>
	<td colspan='7'><b>Listado de clientes</b></td>
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
		$cad ="select a.codigo_cliente,a.nombre,a.ruc,a.dni,b.departamento,c.ciudad,
			d.distrito,a.direccion,a.direccion2,a.direccion3,a.direccion4,
			a.telefono_1,a.telefono_2,a.email,a.contacto,a.observaciones,
			if(a.flag=0,'Inactivo','Activo') as estado			
			from tb_cliente a,tb_departamento b,tb_ciudad c,tb_distrito d 
			where a.iddepartamento=b.iddepartamento and a.idciudad=c.idciudad 
			and a.iddistrito=d.iddistrito";
		
		$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
		$stmt =$dbh->prepare($cad);
		$stmt->execute();

		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			?>
			<tr>
				<td><?=$cont=$cont+1?></td>
				<td><?=$row["codigo_cliente"]?></td>
				<td><?=$row["nombre"]?></td>
				<td><?=$row["ruc"]?></td>
				<td><?=$row["dni"]?></td>
				<td><?=$row["departamento"]?></td>
				<td><?=$row["ciudad"]?></td>
				<td><?=$row["distrito"]?></td>
				<td><?=$row["direccion"]?></td>
				<td><?=$row["direccion2"]?></td>
				<td><?=$row["direccion3"]?></td>
				<td><?=$row["direccion4"]?></td>
				<td><?=$row["telefono_1"]?></td>
				<td><?=$row["telefono_2"]?></td>
				<td><?=$row["email"]?></td>
				<td><?=$row["contacto"]?></td>
				<td><?=$row["observaciones"]?></td>
				<td><?=$row["estado"]?></td>
			</tr>
			<?php
		}
		ingreso_auditoria_mproductos($idusuario);
	}catch (PDOException $e){
		echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la l&iacute;nea: ' . $e->getLine() . '<br />';
	} 
	
	function ingreso_auditoria_mproductos($idusuario){
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
	}	
	?>
	</table>
</body>
</html>


