<?php

	header("Content-Type: text/plain");
	header("Cache-control: No-Cache");
	header("Pragma: No-Cache");

	include_once("conexion.php");
	
	$hoy = date("Y-m-d H:i", time());
	$usuario=$_POST["usuario"];
	$clave	=$_POST["clave"];   
	
	try{
		$sqlquery ="SELECT count(*) from usuario where usuario=:usuario and clave=:clave";
		$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
		$stmt =$dbh->prepare($sqlquery);
		$stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);
		$stmt->bindParam(':clave', $clave, PDO::PARAM_STR);		
		$stmt->execute();
		
		//contamos el numero de registros coincidentes. Deberia existir solo uno
        //$count=$stmt->fetchColumn();
        $count=$stmt->rowCount();

	}catch (PDOException $e){
		echo 'PDO Excepciones.	';
		echo 'Error con la base de datos: <br />';
		echo 'SQL Query: ', $sql;
		echo '<pre>';
		echo 'Error: ' .$e->getMessage() . '<br />';
		echo 'Archivo: ' . $e->getFile() . '<br />';
		echo 'Linea: ' . $e->getLine() . '<br />';
		echo '</pre>';
	}	
        
	try{
		$sqlquery2 ="SELECT id_user,usuario,clave from usuario where usuario=:usuario and clave=:clave";
		$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
		$stmt2 =$dbh->prepare($sqlquery2);
		$stmt2->bindParam(':usuario', $usuario, PDO::PARAM_STR);
		$stmt2->bindParam(':clave', $clave, PDO::PARAM_STR);		
		$stmt2->execute();
		
		while($row=$stmt2->fetch(PDO::FETCH_ASSOC)){
			$idusuario=$row['id_user'];
		}

	}catch (PDOException $e){
		echo 'PDO Excepciones.	';
		echo 'Error con la base de datos: <br />';
		echo 'SQL Query: ', $sql;
		echo '<pre>';
		echo 'Error: ' .$e->getMessage() . '<br />';
		echo 'Archivo: ' . $e->getFile() . '<br />';
		echo 'Linea: ' . $e->getLine() . '<br />';
		echo '</pre>';
	}			
		
	print $count;
    
    if ($count==0) {
    	print "2";		
    }else{
    	$id="K32".date('mshsys')."5".trim($usuario);

  		try{
  			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  			$dbh->beginTransaction();
  			$sql = 'UPDATE usuario SET idsess= :id,fec_ultimo_ingreso= :fecha WHERE id_user= :idusuario';
  			
  			$stmt3 = $dbh->prepare($sql);
  			$stmt3->bindParam(':id', $id);
  			$stmt3->bindParam(':fecha', $hoy);
  			$stmt3->bindParam(':idusuario', $idusuario, PDO::PARAM_STR);			
  			$stmt3->execute();
  			$dbh->commit();
  			print $id;	

      }catch (PDOException $e){
  			$dbh->rollBack();
  			echo 'PDO Excepciones.	';
  			echo 'Error con la base de datos: <br />';
  			echo 'SQL Query: ', $sql;
  			echo '<pre>';
  			echo 'Error: ' .$e->getMessage() . '<br />';
  			echo 'Archivo: ' . $e->getFile() . '<br />';
  			echo 'Linea: ' . $e->getLine() . '<br />';
  			echo '</pre>';
  		}			

		   	
    }

?>