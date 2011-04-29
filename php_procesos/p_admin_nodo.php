<?php
ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$tarea = ($_POST['tarea']) ? ($_POST['tarea']) : null;

switch($tarea){
    case "nuevo":
        addData();
        break;
    case "modificar":
        saveData();
        break;
    case "borrar":
        removeData();
        break;
    default:
        echo "{failure:true}";
        break;
}

function addData(){

	$count 		= 0;
  	$nombre    	= trim($_POST['nombre']);
	$direccion		= trim($_POST['direccion']);
    $direccion2		= trim($_POST['direccion2']);
	$longitud		= trim($_POST['longitud']);
	$latitud		= trim($_POST['latitud']);
    $fec_instalacion= trim($_POST['fecinstalacion']);
    $serie          = trim($_POST['serie']);
    $modelo		= trim($_POST['modelo']);
    $marca		= trim($_POST['marca']);
    $area	= trim($_POST['area']);
    $ptosforward	= trim($_POST['ptosforward']);
    $ptosretorno	= trim($_POST['ptosretorno']);

	$idusuario	= trim($_POST['idusuario']);		

	//expresion regular que acepta un texto minimo de 3 y no mayor de 10 caracteres que
	//puede contener letras de la a a la z mayusculas o minusculas, numero del 0 al 9 y
	//guiones.
    /*
	if ( eregi('^[a-z0-9\-]{3,20}$', $nombre) ) {
		// si el dato es correcto continuamos
  	}else {
    	print 2;
    	exit();
	}	
	
	//expresion regular que acepta un texto minimo de 3 y no mayor de 30 caracteres que
	//puede contener letras de la a a la z mayusculas o minusculas, numero del 0 al 9 y
	//espacions en blanco.
	if ( eregi('^[a-z0-9 ]{3,80}$', $direccion) ) {
		// si el dato es correcto continuamos
  	}else {
    	print 3;
    	exit();
	}	
	
    */

	
						
						/*if ( eregi('^[.0-9 ]{3,80}$', $longitud) ) {
							// si el dato es correcto continuamos
  						}else {
    						print 4;
    						exit();
						}
						
						if(!empty($dirII)){
							if ( eregi('^[.0-9 ]{2,80}$', $latitud) ) {
								// si el dato es correcto continuamos
	  						}else {
	    						print 5;
	    						exit();
							}							
						}*/
						
							
						
							

							
									
								  	try{
								  		include_once("conexion.php");
								  		$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
								  		$dbh->beginTransaction();
								  		$sql = 'INSERT INTO nodo (nom_nodo,direccion,direccion_referencial,
                                                latitud,longitud,fec_instalacion,num_serie,id_modelo,id_marca,
                                                id_area,num_ptos_forward,num_ptos_retorno)
								  				VALUES (:nombre,:direccion,:direccion2,:latitud,:longitud,
                                                :fec_instalacion,:serie,:modelo,:marca,:area,:ptos_forward,
                                                :ptos_retorno)';
                                        //print $sql;
								  		$stmt3 = $dbh->prepare($sql);

                                        //$stmt3->bindParam(':id_tap',$id_tap);
										$stmt3->bindParam(':nombre',$nombre);
										$stmt3->bindParam(':direccion',$direccion);
                                        $stmt3->bindParam(':direccion2',$direccion2);
										$stmt3->bindParam(':longitud',$longitud);
                                        $stmt3->bindParam(':latitud',$latitud);
                                        $stmt3->bindParam(':fec_instalacion',$fec_instalacion);
                                        $stmt3->bindParam(':serie',$serie);
                                        $stmt3->bindParam(':modelo',$modelo);
                                        $stmt3->bindParam(':marca',$marca);
                                        $stmt3->bindParam(':area',$area);
                                        $stmt3->bindParam(':ptosforward',$ptosforward);
                                        $stmt3->bindParam(':ptosretorno',$ptosretorno);

                                        $stmt3->execute();

								  		$dbh->commit();
								  		
								  		try{
											$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);					
											$sql2 = 'SELECT id_nodo FROM nodo WHERE nom_nodo=:nombre';
											$stmt4 = $dbh->prepare($sql2);
											$stmt4->bindParam(':nombre', $nombre);
											$stmt4->execute();		
											while ($row = $stmt4->fetch(PDO::FETCH_ASSOC)) {
										  		//ingreso_auditoria2($idusuario,1,$row["idcliente"],$codigo,$nombre);
											}  			
										}catch (PDOException $e){
											$count=0;
											echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la l&iacute;nea: ' . $e->getLine() . '<br />';
										}
										
								  		print 1;
								  	}catch (PDOException $e){
								  		$dbh->rollBack();
										echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la l&iacute;nea: ' . $e->getLine() . '<br />';
										//print 9;
								  	}	
								  							    

								
		
	
}

function saveData(){
	include_once("conexion.php");
	$count 		= 0;
  	$nombre    	= trim($_POST['nombre']);
	$direccion		= trim($_POST['direccion']);
    $direccion2		= trim($_POST['direccion2']);
	$longitud		= trim($_POST['longitud']);
	$latitud		= trim($_POST['latitud']);
    $fec_instalacion= trim($_POST['fecinstalacion']);
    $serie          = trim($_POST['serie']);
    $modelo		= trim($_POST['modelo']);
    $marca		= trim($_POST['marca']);
    $area	= trim($_POST['area']);
    $ptosforward	= trim($_POST['ptosforward']);
    $ptosretorno	= trim($_POST['ptosretorno']);

	//expresion regular que acepta un texto minimo de 3 y no mayor de 30 caracteres que
	//puede contener letras de la a a la z mayusculas o minusculas, numero del 0 al 9 y
	//espacions en blanco.

    /*
	if ( eregi('^[a-z0-9 ]{3,80}$', $nombre) ) {
		// si el dato es correcto continuamos
  	}else {
    	print 2;
    	exit();
	}		
	*/

			

								
									try{
										//$arr=array($dpto,$ciudad,$distri,$estado);
										
										$txt_update	="UPDATE nodo SET nom_nodo=:nombre,
													direccion=:direccion,direccion_referencial=:direccion2,
                                                    longitud=:longitud,latitud=:latitud,fec_instalacion=:fec_instalacion,
                                                    num_serie=:serie,id_modelo=:modelo,id_marca=:marca,id_area=:area,
                                                    num_ptos_forward=:ptos_forward,num_ptos_retorno=:ptos_retorno
                                                     WHERE id_nodo=:id_nodo";
							
							
										$cad='';
									
										
										$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
								
										$sql = $txt_update;		
										
										$stmt1 = $dbh->prepare($sql);
										$stmt1->bindParam(':id_nodo',$id_nodo);
										$stmt1->bindParam(':nombre',$nombre);
										$stmt1->bindParam(':direccion',$direccion);
                                        $stmt1->bindParam(':direccion2',$direccion2);
										$stmt1->bindParam(':longitud',$longitud);
                                        $stmt1->bindParam(':latitud',$latitud);
                                        $stmt1->bindParam(':fec_instalacion',$fec_instalacion);
                                        $stmt1->bindParam(':serie',$serie);
                                        $stmt1->bindParam(':modelo',$modelo);
                                        $stmt1->bindParam(':marca',$marca);
                                        $stmt1->bindParam(':area',$area);
                                        $stmt1->bindParam(':ptos_forward',$ptos_forward);
                                        $stmt1->bindParam(':ptos_retorno',$ptos_retorno);
								
										
								
											
										
										$stmt1->execute();
								
								  		
							
								  		print 1;
								  		
									}catch (PDOException $e){
										print 9;		
							
									}
							

				
					
	
}

function removeData(){
	include_once("conexion.php");
	$count = 0;
    $id_nodo	= $_POST['id_nodo'];
   	$idusuario	= $_POST['idusuario'];		

   	if($id_nodo!=1){
		try{	
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);					
			$sql2 = 'SELECT id_nodo,nom_nodo FROM nodo WHERE id_nodo=:id_nodo LIMIT 1';
			$stmt4 = $dbh->prepare($sql2);
			$stmt4->bindParam(':id_nodo', $id_nodo);
			$stmt4->execute();		
			while ($row = $stmt4->fetch(PDO::FETCH_ASSOC)) {
				//ingreso_auditoria2($idusuario,3,$idcliente,$row["codigo_cliente"],$row["nombre"]);
			}  			

		}catch (PDOException $e){
			print 2;	
		}   	
	   	
		try{
			$sqlquery1 ="delete from nodo where id_nodo= :id_nodo limit 1";
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
			$stmt =$dbh->prepare($sqlquery1);
			$stmt->bindParam(':id_nodo',$id_nodo);
			$stmt->execute();
			
	
			$count++;
		}catch (PDOException $e){
			print 3;
		}		
	}else{
		print 4;
	}	
	
    if ($count) { 
    	print 1;
    	/*
        $cb = isset($_GET['callback']) ? $_GET['callback'] : '';       
        $response = array('success'=>$count, 'del_count'=>$count);
        $json_response = json_encode($response);
        echo $cb . $json_response;
        */
    }	
	    	
}	
	


?>