<?php
    ini_set("display_errors", "On");
    error_reporting(E_ALL ^ E_NOTICE);

	
   	
   	$idsess=$_GET["idsess"];

	if(strlen($idsess) > 1)
	{
        include_once("php_procesos/conexion.php");
		try{
            
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			
			$sqlquery ="SELECT a.id_user,a.usuario,a.clave,a.idsess,a.idperfil,b.desc_perfil
				from usuario a,perfil b where a.idperfil=b.idperfil and a.idsess = :session";
				
			$stmt =$dbh->prepare($sqlquery);
			$stmt->bindParam(':session', $idsess);
			$stmt->execute();
			
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				if (strlen($row['usuario'])> 0){
					$nusers = 1;
					$idusuario=$row['id_user'];
					$usuario=$row['usuario'];
					$perfil=$row['idperfil'];
					$nom_perfil=$row['desc_perfil'];
				}else{
					header("Location:login.php");
					exit;					
				}
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

	}
	else
	{
		header("Location:login.php");
	    exit;
	}
?>