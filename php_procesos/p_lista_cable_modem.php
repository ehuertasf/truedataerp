<?php
	
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
						$sql ="select count(*)	from cable_modem";
						$stmt1 =$dbh->prepare($sql);
						$stmt1->execute();			
						$filas=$stmt1->fetchColumn();	
					}catch (PDOException $e){
						echo 'Error en la linea: ' . $e->getLine() . '<br />';
					}	
					
					
					if($filas != 0) {
						$sqlquery1 ="select
                            a.id_cable_modem,a.nom_cable_modem,a.num_mac,a.id_cliente,a.id_modelo,a.id_marca                           a.id_marca
							from cable_modem a";
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
						$sqlquery1 ="select 
							a.id_cable_modem,a.nom_cable_modem,a.num_mac,a.id_cliente,a.id_modelo,a.id_marca
							from cable_modem a
							where (a.nom_cable_modem like :buscar or a.id_cable_modem like :buscar)";

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
						$sqlquery1 ="select
                            a.id_cable_modem,a.nom_cable_modem,a.num_mac,a.id_cliente,a.id_modelo,a.id_marca
							from cable_modem a
							where a.id_cable_modem =:buscar";

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
