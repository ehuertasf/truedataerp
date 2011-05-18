<?php
	ini_set("display_errors", "Off");
	error_reporting(E_ALL ^ E_NOTICE);
	
	include_once("conexion.php");
	$arr = array();	
	$arr1 = array();		
	$n=$_GET['n'];
	
	switch ($n){
		case 1:	//data grupo productos
			try{
				$sqlquery ="SELECT idgrupo_prod,desc_grupo from tb_grupo_producto where flag=1 order by desc_grupo";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"grupo":'.json_encode($arr).'}';
				
		
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
			break;	
		case 2:	//data unidad de medida
			try{
				$sqlquery ="SELECT idunidad,desc_unidad from tb_unidad_medida where flag=1 order by desc_unidad";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"unidad":'.json_encode($arr1).'}';
				
		
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
			break;		
		case 3:	//data empaque	
			try{
				$sqlquery ="SELECT idempaque,desc_empaque from tb_empaque where flag=1 order by desc_empaque";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"empaque":'.json_encode($arr1).'}';
				
		
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
			break;
		case 4:	//data marca	
			try{
				$sqlquery ="SELECT idmarca,desc_marca from tb_marca where flag=1 order by desc_marca";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"marca":'.json_encode($arr1).'}';
				
		
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
			break;
		case 5:	//data perfiles	
			try{
				$sqlquery ="SELECT idperfil,desc_perfil,opciones from tb_perfil where flag=1";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"perfil":'.json_encode($arr1).'}';
				
		
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
			break;	
		case 6:	//data departamentos	
			try{
				$sqlquery ="SELECT id_modelo,desc_modelo from modelo";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"modelo":'.json_encode($arr1).'}';
				
		
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
			break;	
		case 7:	//data ciudades	
			try{
				
				$sqlquery ="SELECT id_marca,desc_marca from marca";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"marca":'.json_encode($arr1).'}';
				
		
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
			break;
		case 8:	//data distritos	
			try{

				
				
				$sqlquery ="SELECT id_area,desc_area from area";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();

				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}
				echo '{"area":'.json_encode($arr1).'}';
				
		
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
			break;			
		case 9:	//data movimientos
			try{
				$sqlquery ="SELECT idmovimiento,desc_movimiento,flag from tb_movimiento where flag=1 and entrega_muestra=1 ";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"movimiento":'.json_encode($arr1).'}';
				
		
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
			break;	
		case 10: //data tipo de ingreso
			try{
				$sqlquery ="SELECT idtipoingreso,tipo_ingreso,flag from tb_tipo_ingreso where flag=1 ";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}			
				echo '{"tipo_ingreso":'.json_encode($arr1).'}';
				
		
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
			break;

        case 20: //data de nodo
			try{
				$sqlquery ="SELECT a.id_area_nodo,a.desc_area_nodo FROM area_nodo a where a.flag=1 ";
                //print $sqlquery."<br>";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();

				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}
				echo '{"lst_nodo":'.json_encode($arr1).'}';


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
			break;

        case 21: //data tap
			try{
				$sqlquery ="SELECT t.id_tap, t.nom_tap FROM tap t WHERE t.flag=1 ";
                //print $sqlquery."<br>";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();

				while($row=$stmt->fetchObject()){
					$arr1[] = $row;
				}
				echo '{"lst_tap":'.json_encode($arr1).'}';


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
			break;
	}	
	
?>