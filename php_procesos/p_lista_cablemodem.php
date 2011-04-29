<?php
	ini_set("display_errors", "Off");
	error_reporting(E_ALL ^ E_NOTICE);
	
	header("Content-Type: text/html");
	header("Cache-control: No-Cache");
	header("Pragma: No-Cache");


	
	$arr = array();	
	
	$n 		= (integer) (isset($_POST['n']) ? $_POST['n'] : $_GET['n']);
	$start 	= (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
	$limit 	= (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']); 

			switch($n){
				case 1:
					include_once("conexion.php");
					try{
						$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
						$sql ="select count(*)	from tb_cliente";	
						$stmt1 =$dbh->prepare($sql);
						$stmt1->execute();			
						$filas=$stmt1->fetchColumn();	
					}catch (PDOException $e){
						echo 'Error en la linea: ' . $e->getLine() . '<br />';
					}	
					
					
					if($filas != 0) {
						$sqlquery1 ="select a.idcliente,a.codigo_cliente,b.departamento,c.ciudad,
							d.distrito,a.nombre,a.ruc,a.dni,a.telefono_1,a.telefono_2,a.email,
							a.direccion,a.contacto,if(a.flag=0,'Inactivo','Activo') as estado,
							a.direccion2,a.direccion3,a.direccion4,a.observaciones
							from tb_cliente a,tb_departamento b,tb_ciudad c,tb_distrito d 
							where a.iddepartamento=b.iddepartamento and a.idciudad=c.idciudad 
							and a.iddistrito=d.iddistrito";
						
						$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
						$stmt =$dbh->prepare($sqlquery1);
						$stmt->execute();			
						while($row=$stmt->fetchObject()){
							$arr[] = $row;
						}			
						echo '{"total":"'.$filas.'","lista":'.json_encode($arr).'}';
					}
					break;
				case 2:
					include_once("conexion.php");
					$buscar=$_GET["buscar"];
				
					try{
						$sqlquery1 ="select a.idcliente,a.codigo_cliente,b.departamento,c.ciudad,
							d.distrito,a.nombre,a.ruc,a.dni,a.telefono_1,a.telefono_2,a.email,
							a.direccion,a.contacto,if(a.flag=0,'Inactivo','Activo') as estado,
							a.direccion2,a.direccion3,a.direccion4,a.observaciones
							from tb_cliente a,tb_departamento b,tb_ciudad c,tb_distrito d 
							where a.iddepartamento=b.iddepartamento and a.idciudad=c.idciudad 
							and a.iddistrito=d.iddistrito and (nombre like :buscar or codigo_cliente like :buscar)";

						$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
						$stmt =$dbh->prepare($sqlquery1);
						$buscar='%'.$buscar.'%';
						$stmt->bindParam(':buscar',$buscar,PDO::PARAM_STR);
						$stmt->execute();																
					}catch (PDOException $e){
						echo 'Error en la linea: ' . $e->getLine() . '<br />';
					}		
				
					while($row=$stmt->fetchObject()){
						$arr[] = $row;
					}			
					echo '{"lista":'.json_encode($arr).'}';				
					break;
				case 3:		//muestro los detalles del cliente en un modal
					include_once("conexion.php");
					$buscar=$_POST["id"];
				
					try{
						$sqlquery1 ="select a.idcliente,a.codigo_cliente,b.departamento,c.ciudad,
							d.distrito,a.nombre,a.ruc,a.dni,a.telefono_1,a.telefono_2,a.email,
							a.contacto,if(a.flag=0,'Inactivo','Activo') as flag,
							if(a.direccion is null,'-----',a.direccion) as direccion,														
							if(a.direccion2 is null,'-----',a.direccion2) as direccion2,
							if(a.direccion3 is null,'-----',a.direccion3) as direccion3,
							if(a.direccion4 is null,'-----',a.direccion4) as direccion4,							
							if(a.observaciones is null,'-----',a.observaciones) as observaciones
							from tb_cliente a,tb_departamento b,tb_ciudad c,tb_distrito d 
							where a.iddepartamento=b.iddepartamento and a.idciudad=c.idciudad 
							and a.iddistrito=d.iddistrito and idcliente =:buscar";

						$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
						$stmt =$dbh->prepare($sqlquery1);
						
						$stmt->bindParam(':buscar',$buscar,PDO::PARAM_STR);
						$stmt->execute();																
					}catch (PDOException $e){
						echo 'Error en la linea: ' . $e->getLine() . '<br />';
					}		
				
					while($row=$stmt->fetchObject()){
    					$arr = $row;
					}			
					$texto=json_encode($arr);
					print $texto;
					
					break;			 				
			}									
			
	
	
	
?>	
