<?php
	ini_set("display_errors", "Off");
	error_reporting(E_ALL ^ E_NOTICE);
	
	include_once("conexion.php");
	include("f_funciones.php");
	$arr = array();	
	$arr1 = array();		
	$n=$_GET['n'];
	
	switch ($n){
		case 1:	//Marcas
			try{
				$sqlquery ="SELECT id_marca,desc_marca from marca where flag=1 order by desc_marca";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"marca":'.json_encode($arr).'}';
				
		
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
		case 2:	//Modelos
			try{
				$sqlquery ="SELECT id_modelo,desc_modelo from modelo where flag=1 order by desc_modelo";
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"modelo":'.json_encode($arr).'}';
				
		
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
		case 3:	//Elementos de Red
			
			$idered=$_GET['idered'];

			try{
				$sqlquery ="SELECT id_ered,desc_ered from elemento_red where flag=1".
							texto('and','id_ered',' in ','2',$idered);
				//echo $sqlquery;			
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);	
				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute();
				
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"ered":'.json_encode($arr).'}';
				
		
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
			
		case 4: // Busqueda de Id elemento de red por nombre
			$ered=$_POST["ered"];	
			if(!$ered) $ered=$_GET["ered"];	
			if(!$ered) return;
			
			$txtbuscar=$_POST["query"];	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			if(!$txtbuscar) return;			
/*
			if ($txtbuscar=='****')
				$sqlquery= "select id_area_nodo,desc_area_nodo,color_area,transparencia_area,color_linea,transparencia_linea,ancho_linea,puntos
						from area_nodo
						where flag=1  
						order by desc_area_nodo";
			else
				$sqlquery= "select id_area_nodo,desc_area_nodo,color_area,transparencia_area,color_linea,transparencia_linea,ancho_linea,puntos
						from area_nodo
						where flag=1 and desc_area_nodo like '%$txtbuscar%' 
						order by desc_area_nodo";
	*/		
			switch($ered){
				case 1: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_cable_modem as id,nom_cable_modem as descripcion from cable_modem where flag=1";
					else 
						$sqlquery= "select id_cable_modem as id,nom_cable_modem as descripcion from cable_modem where flag=1".
									texto('and','nom_cable_modem',' like ','3',$txtbuscar);
					break;					// and nom_modem like '%$txtbuscar%'";break;
				case 2: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_tap as id,nom_tap as descripcion from tap where flag=1";
					else 
						$sqlquery= "select id_tap as id,nom_tap as descripcion from tap where flag=1".
									texto('and','nom_tap',' like ','3',$txtbuscar);
					break;					// and nom_tap like '%$txtbuscar%'";break;
				case 3: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_amplificador as id,nom_amplificador as descripcion from amplificador where flag=1";
					else 
						$sqlquery= "select id_amplificador as id,nom_amplificador as descripcion from amplificador where flag=1".
									texto('and','nom_amplificador',' like ','3',$txtbuscar);
					break;			// and nom_amplificador like '%$txtbuscar%'";break;
				case 4: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_nodo as id,nom_nodo as descripcion from nodo where flag=1";
					else 
						$sqlquery= "select id_nodo as id,nom_nodo as descripcion from nodo where flag=1".
									texto('and','nom_nodo',' like ','3',$txtbuscar);
					break;					// and nom_nodo like '%$txtbuscar%'"; break;
				case 5: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_hub as id,nom_hub as descripcion from hub where flag=1";
					else 
						$sqlquery= "select id_hub as id,nom_hub as descripcion from hub where flag=1".
									texto('and','nom_hub',' like ','3',$txtbuscar);
					break;					// and nom_hub like '%$txtbuscar%'";break;
				case 6: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_cabecera as id,nom_cabecera as descripcion from cabecera where flag=1";
					else 
						$sqlquery= "select id_cabecera as id,nom_cabecera as descripcion from cabecera where flag=1".
									texto('and','nom_cabecera',' like ','3',$txtbuscar);
					break;				// and nom_cabecera like '%$txtbuscar%'";break;
			}
			//echo $sqlquery;
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"results":'.json_encode($arr).'}';
			}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $sqlquery;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}
			break;
		case 44: // Busqueda de Elementos de Red para Edicion
			$ered=$_POST["ered"];	
			if(!$ered) $ered=$_GET["ered"];	
			if(!$ered) return;
			
			
			$txtbuscar=$_POST["query"];	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			if(!$txtbuscar) return;			
/*
			if ($txtbuscar=='****')
				$sqlquery= "select id_area_nodo,desc_area_nodo,color_area,transparencia_area,color_linea,transparencia_linea,ancho_linea,puntos
						from area_nodo
						where flag=1  
						order by desc_area_nodo";
			else
				$sqlquery= "select id_area_nodo,desc_area_nodo,color_area,transparencia_area,color_linea,transparencia_linea,ancho_linea,puntos
						from area_nodo
						where flag=1 and desc_area_nodo like '%$txtbuscar%' 
						order by desc_area_nodo";
	*/		
			switch($ered){
				case 1: 
/*					if ($txtbuscar=='****')	
						$sqlquery= "select id_cable_modem as id,nom_cable_modem as descripcion from cable_modem where flag=1";
					else 
						$sqlquery= "select id_cable_modem as id,nom_cable_modem as descripcion from cable_modem where flag=1".
									texto('and','nom_cable_modem',' like ','3',$txtbuscar);
					break;					// and nom_modem like '%$txtbuscar%'";break;
*/
					if ($txtbuscar=='****')	
						$sqlquery= "select a.id_cable_modem,a.nom_cable_modem,a.num_mac,a.latitud,a.longitud,fec_instalacion,a.id_cliente,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.flag,
									IF(a.id_ered=2,(select b.nom_tap from tap as b where b.id_tap=a.id_ered_padre limit 1),NULL) as nom_padre	
									from cable_modem as a 
									where a.flag in (1,0)";
					else 
						$sqlquery= "select a.id_cable_modem,a.nom_cable_modem,a.num_mac,a.latitud,a.longitud,fec_instalacion,a.id_cliente,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.flag,
									IF(a.id_ered=2,(select b.nom_tap from tap as b where b.id_tap=a.id_ered_padre limit 1),NULL) as nom_padre	
									from cable_modem as a 
									where a.flag in (1,0)".
									texto('and','a.nom_cable_modem',' like ','3',$txtbuscar);
					break;		
				case 2: 
/*					if ($txtbuscar=='****')	
						$sqlquery= "select id_tap as id,nom_tap as descripcion from tap where flag=1";
					else 
						$sqlquery= "select id_tap as id,nom_tap as descripcion from tap where flag=1".
									texto('and','nom_tap',' like ','3',$txtbuscar);
					break;					// and nom_tap like '%$txtbuscar%'";break;
*/					
					if ($txtbuscar=='****')	
						$sqlquery= "select a.id_tap,a.nom_tap,a.cant_borne,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.longitud,a.latitud,a.fec_instalacion,
									a.num_serie,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.flag,
									IF(a.id_ered=2,(select b.nom_tap from tap as b where b.id_tap=a.id_ered_padre limit 1),IF(a.id_ered=3,(select b.nom_amplificador from amplificador as b where b.id_amplificador=a.id_ered_padre limit 1),IF(a.id_ered=4,(select b.nom_nodo from nodo as b where b.id_nodo=a.id_ered_padre limit 1),NULL))) as nom_padre	
									from tap as a 
									where a.flag in (1,0)";
					else 
						$sqlquery= "select a.id_tap,a.nom_tap,a.cant_borne,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.longitud,a.latitud,a.fec_instalacion,
									a.num_serie,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.flag,
									IF(a.id_ered=2,(select b.nom_tap from tap as b where b.id_tap=a.id_ered_padre limit 1),IF(a.id_ered=3,(select b.nom_amplificador from amplificador as b where b.id_amplificador=a.id_ered_padre limit 1),IF(a.id_ered=4,(select b.nom_nodo from nodo as b where b.id_nodo=a.id_ered_padre limit 1),NULL))) as nom_padre	
									from tap as a 
									where a.flag in (1,0)".
									texto('and','a.nom_tap',' like ','3',$txtbuscar);
					break;					

				case 3: 
/*					if ($txtbuscar=='****')	
						$sqlquery= "select id_amplificador as id,nom_amplificador as descripcion from amplificador where flag=1";
					else 
						$sqlquery= "select id_amplificador as id,nom_amplificador as descripcion from amplificador where flag=1".
									texto('and','nom_amplificador',' like ','3',$txtbuscar);
					break;			// and nom_amplificador like '%$txtbuscar%'";break;
*/					
					if ($txtbuscar=='****')	
						$sqlquery= "select a.id_amplificador,a.nom_amplificador,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.latitud,a.longitud,a.fec_instalacion,
									a.num_serie,a.num_puertos,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.flag,
									IF(a.id_ered=3,(select b.nom_amplificador from amplificador as b where b.id_amplificador=a.id_ered_padre limit 1),IF(a.id_ered=4,(select b.nom_nodo from nodo as b where b.id_nodo=a.id_ered_padre limit 1),NULL)) as nom_padre	
									from amplificador as a 
									where a.flag in (1,0)";
					else 
						$sqlquery= "select a.id_amplificador,a.nom_amplificador,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.latitud,a.longitud,a.fec_instalacion,
									a.num_serie,a.num_puertos,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.flag,
									IF(a.id_ered=3,(select b.nom_amplificador from amplificador as b where b.id_amplificador=a.id_ered_padre limit 1),IF(a.id_ered=4,(select b.nom_nodo from nodo as b where b.id_nodo=a.id_ered_padre limit 1),NULL)) as nom_padre	
									from amplificador as a 
									where a.flag in (1,0)".
									texto('and','a.nom_amplificador',' like ','3',$txtbuscar);
					break;					

				case 4: 
/*					if ($txtbuscar=='****')	
						$sqlquery= "select id_nodo as id,nom_nodo as descripcion from nodo where flag=1";
					else 
						$sqlquery= "select id_nodo as id,nom_nodo as descripcion from nodo where flag=1".
									texto('and','nom_nodo',' like ','3',$txtbuscar);
					break;					// and nom_nodo like '%$txtbuscar%'"; break;
*/					
					if ($txtbuscar=='****')	
						$sqlquery= "select a.id_nodo,a.nom_nodo,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.latitud,a.longitud,a.fec_instalacion,
										a.num_serie,a.num_puertos_fr,a.rx,a.tx,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.id_area_nodo,
										IF(a.id_ered=5,(select b.nom_hub from hub as b where b.id_hub=a.id_ered_padre limit 1),IF(a.id_ered=6,(select b.nom_cabecera from cabecera as b where b.id_cabecera=a.id_ered_padre limit 1),NULL)) as nom_padre,
										a.flag,c.desc_area_nodo,c.color_area,c.transparencia_area,c.color_linea,c.transparencia_linea,c.ancho_linea,c.puntos
										from nodo as a 
										left join area_nodo as c on a.id_area_nodo=c.id_area_nodo
										where a.flag in (1,0)";
					else 
						$sqlquery= "select a.id_nodo,a.nom_nodo,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.latitud,a.longitud,a.fec_instalacion,
										a.num_serie,a.num_puertos_fr,a.rx,a.tx,a.id_modelo,a.id_marca,a.id_ered,a.id_ered_padre,a.id_area_nodo,
										IF(a.id_ered=5,(select b.nom_hub from hub as b where b.id_hub=a.id_ered_padre limit 1),IF(a.id_ered=6,(select b.nom_cabecera from cabecera as b where b.id_cabecera=a.id_ered_padre limit 1),NULL)) as nom_padre,
										a.flag,c.desc_area_nodo,c.color_area,c.transparencia_area,c.color_linea,c.transparencia_linea,c.ancho_linea,c.puntos
										from nodo as a 
										left join area_nodo as c on a.id_area_nodo=c.id_area_nodo
										where a.flag in (1,0)".
										texto('and','a.nom_nodo',' like ','3',$txtbuscar);
					break;					

				case 5: 
/*					if ($txtbuscar=='****')	
						$sqlquery= "select id_hub,nom_hub,direccion,direccion_referencial,ubicacion_referencial,latitud,longitud,
											fec_instalacion,rx_f,tx_f,rx_r,tx_r,redundancia,id_ered_redundancia,id_ered_padre_redundancia,
											id_ered,id_ered_padre,obs,flag from hub where flag in (1,0)";
					else 
						$sqlquery= "select id_hub,nom_hub,direccion,direccion_referencial,ubicacion_referencial,latitud,longitud,
											fec_instalacion,rx_f,tx_f,rx_r,tx_r,redundancia,id_ered_redundancia,id_ered_padre_redundancia,
											id_ered,id_ered_padre,obs,flag from hub where flag in (1,0)".
									texto('and','nom_hub',' like ','3',$txtbuscar);
					break;					// and nom_hub like '%$txtbuscar%'";break;
*/					
					if ($txtbuscar=='****')	
						$sqlquery= "select a.id_hub,a.nom_hub,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.latitud,a.longitud,
										a.fec_instalacion,a.rx_f,a.tx_f,a.rx_r,a.tx_r,a.redundancia,a.id_ered_redundancia,a.id_ered_padre_redundancia,
										a.id_ered,a.id_ered_padre,
										IF(a.id_ered=5,(select b.nom_hub from hub as b where b.id_hub=a.id_ered_padre limit 1),IF(a.id_ered=6,(select b.nom_cabecera from cabecera as b where b.id_cabecera=a.id_ered_padre limit 1),NULL)) as nom_padre,
										IF(a.id_ered_redundancia=5,(select b.nom_hub from hub as b where b.id_hub=a.id_ered_padre_redundancia limit 1),IF(a.id_ered_redundancia=6,(select b.nom_cabecera from cabecera as b where b.id_cabecera=a.id_ered_padre_redundancia limit 1),NULL)) as nom_padre_redun,
										a.obs,a.flag from hub as a 
										where a.flag in (1,0)";
					else 
						$sqlquery= "select a.id_hub,a.nom_hub,a.direccion,a.direccion_referencial,a.ubicacion_referencial,a.latitud,a.longitud,
										a.fec_instalacion,a.rx_f,a.tx_f,a.rx_r,a.tx_r,a.redundancia,a.id_ered_redundancia,a.id_ered_padre_redundancia,
										a.id_ered,a.id_ered_padre,
										IF(a.id_ered=5,(select b.nom_hub from hub as b where b.id_hub=a.id_ered_padre limit 1),IF(a.id_ered=6,(select b.nom_cabecera from cabecera as b where b.id_cabecera=a.id_ered_padre limit 1),NULL)) as nom_padre,
										IF(a.id_ered_redundancia=5,(select b.nom_hub from hub as b where b.id_hub=a.id_ered_padre_redundancia limit 1),IF(a.id_ered_redundancia=6,(select b.nom_cabecera from cabecera as b where b.id_cabecera=a.id_ered_padre_redundancia limit 1),NULL)) as nom_padre_redun,
										a.obs,a.flag from hub as a 
										where a.flag in (1,0)".
										texto('and','a.nom_hub',' like ','3',$txtbuscar);
					break;					
				case 6: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_cabecera,nom_cabecera,direccion,latitud,longitud,id_ered,flag  from cabecera where flag in (1,0)";
					else 
						//$sqlquery= "select id_cabecera as id,nom_cabecera as descripcion from cabecera where flag=1".
						$sqlquery= "select id_cabecera,nom_cabecera,direccion,latitud,longitud,id_ered,flag from cabecera where flag in (1,0)".
									texto('and','nom_cabecera',' like ','3',$txtbuscar);
					break;				// and nom_cabecera like '%$txtbuscar%'";break;
			}
			
			
	
			
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"results":'.json_encode($arr).'}';
			}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $sqlquery;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}
			break;

		
		
		case 5: // Busqueda del Cliente por nombre o documento
		

			$txtbuscar=$_POST["query"];	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			
			if(!$txtbuscar) return;
			
			$sqlquery= "select a.id_cliente, concat(a.ap_paterno,' ',a.ap_materno,' ',a.nombre) as nom,b.desc_tipo_doc,a.num_documento, c.desc_distrito
						from cliente a 
						inner join tipo_documento b on a.id_tipo_doc=b.id_tipo_doc
						inner join distrito c on a.id_distrito=c.id_distrito
						where concat(a.ap_paterno,' ',a.ap_materno,' ',a.nombre) like '%$txtbuscar%' or num_documento like '%$txtbuscar%'";
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"cliente":'.json_encode($arr).'}';
			}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $sqlquery;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}
			break;

		case 55: // Busqueda del modem en DOCSIS

            //include_once("conexion_docsis.php");

			$txtbuscar=$_POST["query"];	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			
			if(!$txtbuscar) return;
			if(trim($txtbuscar)=='****') $txtbuscar='';
			
			/*
            $sqlquery= "
			select a.modem_macaddr,a.serialnum,(select nom_cable_modem from truedataerp.cable_modem where nom_cable_modem=a.serialnum limit 1) as cruce 
			from dhcp_server.docsis_modem as a 
			where (select nom_cable_modem from truedataerp.cable_modem where nom_cable_modem=a.serialnum limit 1) is null".
			texto('and','a.serialnum',' like ','3',$txtbuscar);
            */
            $sqlquery= "
			select a.modem_macaddr,a.serialnum,(select nom_cable_modem from truedataerp.cable_modem where nom_cable_modem=a.serialnum limit 1) as cruce
			from truedataerp.docsis_modem as a
			where (select nom_cable_modem from truedataerp.cable_modem where nom_cable_modem=a.serialnum limit 1) is null".
			texto('and','a.serialnum',' like ','3',$txtbuscar);

						// and a.serialnum LIKE '%$txtbuscar%'";
			//echo $sqlquery;
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"docsis_modem":'.json_encode($arr).'}';
			}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $sqlquery;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}
			break;
			
		case 6: // Busqueda del Area de Nodos por nombre
			$txtbuscar=trim($_POST["query"]);	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			if(!$txtbuscar) return;
			if ($txtbuscar=='****')
				$sqlquery= "select id_area_nodo,desc_area_nodo,color_area,transparencia_area,color_linea,transparencia_linea,ancho_linea,puntos
						from area_nodo
						where flag=1  
						order by desc_area_nodo";
			else
				$sqlquery= "select id_area_nodo,desc_area_nodo,color_area,transparencia_area,color_linea,transparencia_linea,ancho_linea,puntos
						from area_nodo
						where flag=1 and desc_area_nodo like '%$txtbuscar%' 
						order by desc_area_nodo";
			
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"area_nodo":'.json_encode($arr).'}';
			}catch (PDOException $e){
				echo 'MENSAGE: '.$e->getMessage();			}
			break;
		
		case 7: // Busqueda del Zona por nombre
			$txtbuscar=trim($_POST["query"]);	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			if(!$txtbuscar) return;
			if ($txtbuscar=='****'){
				$sqlquery= "select id_zona,desc_zona,puntos
						from zona
						where flag=1 
						order by desc_zona";
				$sqlquery2= "select id_area_nodo as id_zona,desc_area_nodo as desc_zona,puntos
						from area_nodo
						where flag=1 
						order by desc_area_nodo";			
			}else {
				$sqlquery= "select id_zona,desc_zona,puntos
						from zona
						where flag=1 and desc_zona like '%$txtbuscar%' 
						order by desc_zona";
				$sqlquery2= "select id_area_nodo as id_zona,desc_area_nodo as desc_zona,puntos
						from area_nodo
						where flag=1 and desc_area_nodo like '%$txtbuscar%'
						order by desc_area_nodo";
			}
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				$stmt=$dbh->prepare($sqlquery2);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"zona":'.json_encode($arr).'}';
			}catch (PDOException $e){
				echo 'MENSAGE: '.$e->getMessage();
			}
			
			break;
		case 8: // Busqueda de Id elemento de red por nombre
			$ered=$_POST["ered"];	
			if(!$ered) $ered=$_GET["ered"];	
			if(!$ered) return;
			
			$ered_padre=$_POST["ered_padre"];	
			if(!$ered_padre) $ered_padre=$_GET["ered_padre"];
			
			$txtbuscar=$_POST["query"];	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			//if(!$txtbuscar) return;			
			
			
			
			
			switch($ered){
				case 1: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_cable_modem as id,nom_cable_modem as descripcion from cable_modem where flag=1";
					else 
						$sqlquery= "select id_cable_modem as id,nom_cable_modem as descripcion from cable_modem where flag=1".
									texto('and','nom_cable_modem',' like ','3',$txtbuscar);
					break;					// and nom_modem like '%$txtbuscar%'";break;
				case 2: 
				/*	if ($txtbuscar=='****')	
						$sqlquery= "select id_tap as id,nom_tap as descripcion from tap where flag=1";
					else */
						$sqlquery= "select id_tap as id,nom_tap as descripcion,2 as elemento from tap where flag=1".
									texto('and','id_ered','=','-',$ered_padre).
									texto('and','id_ered_padre','=','-',$txtbuscar);
					break;					// and nom_tap like '%$txtbuscar%'";break;
				case 3: 
		/*			if ($txtbuscar=='****')	
						$sqlquery= "select id_amplificador as id,nom_amplificador as descripcion from amplificador where flag=1";
					else */
						$sqlquery= "select id_amplificador as id,nom_amplificador as descripcion,3 as elemento from amplificador where flag=1".
									texto('and','id_ered','=','-',$ered_padre).
									texto('and','id_ered_padre','=','-',$txtbuscar);
					break;			// and nom_amplificador like '%$txtbuscar%'";break;
				case 4: 
			/*		if ($txtbuscar=='****')	
						$sqlquery= "select id_nodo as id,nom_nodo as descripcion from nodo where flag=1";
					else */
						$sqlquery= "select id_nodo as id,nom_nodo as descripcion,4 as elemento from nodo where flag=1".
									texto('and','id_ered','=','-',$ered_padre).
									texto('and','nom_nodo',' like ','3',$txtbuscar);
					break;					// and nom_nodo like '%$txtbuscar%'"; break;
				case 5: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_hub as id,nom_hub as descripcion from hub where flag=1";
					else 
						$sqlquery= "select id_hub as id,nom_hub as descripcion from hub where flag=1".
									texto('and','nom_hub',' like ','3',$txtbuscar);
					break;					// and nom_hub like '%$txtbuscar%'";break;
				case 6: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_cabecera as id,nom_cabecera as descripcion from cabecera where flag=1";
					else 
						$sqlquery= "select id_cabecera as id,nom_cabecera as descripcion from cabecera where flag=1".
									texto('and','nom_cabecera',' like ','3',$txtbuscar);
					break;				// and nom_cabecera like '%$txtbuscar%'";break;
			}
			//echo $sqlquery;
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					$arr[] = $row;
				}			
				echo '{"results":'.json_encode($arr).'}';
			}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $sqlquery;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}
			break;
		
		
								
	}	
	
?>