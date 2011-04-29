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
	$mac		= trim($_POST['mac']);
    $cliente		= trim($_POST['cliente']);
	$modelo		= trim($_POST['modelo']);
	$marca		= trim($_POST['marca']);
    

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
								  		$sql = 'INSERT INTO cable_modem (nom_cable_modem,num_mac,id_cliente,id_modelo,id_marca)
								  				VALUES (:nombre,:mac,:cliente,:modelo,:marca)';
                                        //print $sql;
								  		$stmt3 = $dbh->prepare($sql);

                                        //$stmt3->bindParam(':id_tap',$id_tap);
										$stmt3->bindParam(':nombre',$nombre);
                                        $stmt3->bindParam(':mac',$mac);
                                        $stmt3->bindParam(':cliente',$cliente);
                                        $stmt3->bindParam(':modelo',$modelo);
                                        $stmt3->bindParam(':marca',$marca);
                                 

                                        $stmt3->execute();

								  		$dbh->commit();
								  		
								  		try{
											$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);					
											$sql2 = 'SELECT id_cable_modem FROM cable_modem WHERE nom_cable_modem=:nombre';
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
	$mac    	= trim($_POST['mac']);
    $cliente    = trim($_POST['cliente']);
    $modelo		= trim($_POST['modelo']);
    $marca		= trim($_POST['marca']);
    

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
										
										$txt_update	="UPDATE cable_modem SET nom_cable_modem=:nombre,
													num_mac=:mac,id_cliente=:cliente,
                                                    id_modelo=:modelo,id_marca=:marca
                                                     WHERE id_cable_modem=:id_cable_modem";
							
							
										$cad='';
									
										
										$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
								
										$sql = $txt_update;		
										
										$stmt1 = $dbh->prepare($sql);
										$stmt1->bindParam(':id_cable_modem',$id_cable_modem);
										$stmt1->bindParam(':nombre',$nombre);
										$stmt1->bindParam(':cliente',$cliente);
                                        $stmt1->bindParam(':mac',$mac);
                                        $stmt1->bindParam(':modelo',$modelo);
                                        $stmt1->bindParam(':marca',$marca);

								
										
								
											
										
										$stmt1->execute();
								
								  		
							
								  		print 1;
								  		
									}catch (PDOException $e){
										print 9;		
							
									}
							

				
					
	
}

function removeData(){
	include_once("conexion.php");
	$count = 0;
    $id_cable_modem	= $_POST['id_cable_modem'];
   	$idusuario	= $_POST['idusuario'];		

   	if($id_nodo!=1){
		try{	
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);					
			$sql2 = 'SELECT id_cable_modem,nom_cable_modem FROM cable_modem WHERE id_cable_modem=:id_cable_modem LIMIT 1';
			$stmt4 = $dbh->prepare($sql2);
			$stmt4->bindParam(':id_cable_modem', $id_cable_modem);
			$stmt4->execute();		
			while ($row = $stmt4->fetch(PDO::FETCH_ASSOC)) {
				//ingreso_auditoria2($idusuario,3,$idcliente,$row["codigo_cliente"],$row["nombre"]);
			}  			

		}catch (PDOException $e){
			print 2;	
		}   	
	   	
		try{
			$sqlquery1 ="delete from cable_modem where id_cable_modem= :id_cable_modem limit 1";
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
			$stmt =$dbh->prepare($sqlquery1);
			$stmt->bindParam(':id_cable_modem',$id_cable_modem);
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