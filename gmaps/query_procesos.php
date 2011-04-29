<?php
	ini_set("display_errors", "On");
	error_reporting(E_ALL ^ E_NOTICE);
	
	include_once("conexion.php");
	include("f_funciones.php");
	$arr = array();	
	$arr1 = array();		
	$n=$_POST['n'];
	
	switch ($n){
		case 1:	//Graba Area
		
			$nom_area		= $_POST['nom_area'];
			$estado			= $_POST['estado'];
			$color_area		= $_POST['color_area'];
			$transp_area	= $_POST['transp_area'];
			$color_linea	= $_POST['color_linea'];
			$transp_linea	= $_POST['transp_linea'];
			$ancho_linea	= $_POST['ancho_linea'];
			$puntos_area	= $_POST['puntos_area'];
		
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				
				$sqlquery ="INSERT INTO area_nodo (desc_area_nodo,flag,color_area,transparencia_area,color_linea,transparencia_linea,ancho_linea,puntos)
											VALUES (:xnom_area,:x_estado,:xcolor_area,:xtransp_area,:xcolor_linea,:xtransp_linea,:xancho_linea,:xpuntos)";

				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute(array(':xnom_area'=>$nom_area,
									 ':x_estado'=>$estado,
									 ':xcolor_area'=>$color_area,
									 ':xtransp_area'=>$transp_area,
									 ':xcolor_linea'=>$color_linea,
									 ':xtransp_linea'=>$transp_linea,
									 ':xancho_linea'=>$ancho_linea,
									 ':xpuntos'=>$puntos_area
								));
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				//if ($e->getCode()==23000) echo 'Codigo Error: '.$e->getCode().' Nombre de Nodo Duplicado';
				//else
				 echo 'MENSAGE: '.$e->getMessage();
			}
			break;
		case 2:	//Graba Zona
		
			$nom_zona		= $_POST['nom_zona'];
			$estado			= $_POST['estado'];
			$puntos_zona	= $_POST['puntos_zona'];
		
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				
				$sqlquery ="INSERT INTO zona (desc_zona,flag,puntos)
											VALUES (:xdesc_zona,:x_flag,:xpuntos)";

				$stmt =$dbh->prepare($sqlquery);
				$stmt->execute(array(':xdesc_zona'=>$nom_zona,
									 ':x_flag'=>$estado,
									 ':xpuntos'=>$puntos_zona
								));
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				echo 'MENSAGE: '.$e->getMessage();
			}
			break;

	case 5:	//Graba CABECERA
		
			$nom_cabecera	= $_POST['nom_cabecera'];
			$estado			= $_POST['estado'];
			$dir_cabecera	= $_POST['dir_cabecera'];
			$lat			= $_POST['lat'];
			$lon			= $_POST['lon'];
			$accion			= $_POST['accion'];
			$ideditar		= $_POST['ideditar'];
				
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				if ($accion == 'editar'){
					$sqlquery ="UPDATE cabecera SET nom_cabecera=:xnom_cabecera,direccion=:xdir_cabecera,latitud=:xlat,longitud=:xlon,flag=:xestado
											WHERE id_cabecera=:xideditar limit 1";
				
					$stmt =$dbh->prepare($sqlquery);	
					$stmt->execute(array(':xnom_cabecera'=>$nom_cabecera,
									 ':xestado'=>$estado,
									 ':xdir_cabecera'=>$dir_cabecera,
									 ':xlat'=>$lat,
									 ':xlon'=>$lon,
									 ':xideditar'=> $ideditar
								));

				}else{
	 				$sqlquery ="INSERT INTO cabecera (nom_cabecera,direccion,latitud,longitud,flag)
												VALUES (:xnom_cabecera,:xdir_cabecera,:xlat,:xlon,:xestado)";
	
					$stmt =$dbh->prepare($sqlquery);
					$stmt->execute(array(':xnom_cabecera'=>$nom_cabecera,
										 ':xestado'=>$estado,
										 ':xdir_cabecera'=>$dir_cabecera,
										 ':xlat'=>$lat,
										 ':xlon'=>$lon
				
									));
				}
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				//if ($e->getCode()==23000) echo 'Codigo Error: '.$e->getCode().' Nombre Duplicado';
				//else
				 echo 'MENSAGE: '.$e->getMessage();
			}
			break;
	case 6:	//Graba INGRESO NODO
	
			$estado			= $_POST['estado'];
			$lat			= $_POST['lat'];
			$lon			= $_POST['lon'];
			$nom_nodo		= $_POST['nom_nodo'];
			$fec_instal		= $_POST['fec_instal'];
			$dir_nodo		= $_POST['dir_nodo'];
			$dir_ref_nodo	= $_POST['dir_ref_nodo'];
			$dir_ubi_nodo	= $_POST['dir_ubi_nodo'];
			$id_area_nodo	= $_POST['id_area_nodo'];
			$serie_nodo		= $_POST['serie_nodo'];
			$puertos_fr		= $_POST['puertos_fr'];
			$puertos_rx		= $_POST['puertos_rx'];
			$puertos_tx		= $_POST['puertos_tx'];
			$id_marca		= $_POST['id_marca'];
			$id_modelo 		= $_POST['id_modelo'];
			$id_tipo_padre	= $_POST['id_tipo_padre'];
			$id_ered_padre	= $_POST['id_ered_padre'];
														
			$accion			= $_POST['accion'];
			$ideditar		= $_POST['ideditar'];
			if ($id_area_nodo==0)  $id_area_nodo=null;
			if ($id_tipo_padre==0) $id_tipo_padre=null;
			if ($id_ered_padre==0) $id_ered_padre=null;
					
																	
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				if ($accion == 'editar'){
					
					$sqlquery ="UPDATE nodo SET nom_nodo=:xnom_nodo,direccion=:xdireccion,direccion_referencial=:xdireccion_referencial,ubicacion_referencial=:xubicacion_referencial,
										latitud=:xlatitud,longitud=:xlongitud,fec_instalacion=:xfec_instalacion,num_serie=:xnum_serie,num_puertos_fr=:xnum_ptos_fr,rx=:xnum_ptos_rx,
										tx=:xnum_ptos_tx,id_modelo=:xid_modelo,id_marca=:xid_marca,id_ered=:xid_ered,id_ered_padre=:xid_ered_padre,id_area_nodo=:xid_area_nodo,flag=:xflag 
								WHERE id_nodo=:xideditar limit 1";
									
					//echo $sqlquery;return;
					$stmt =$dbh->prepare($sqlquery);	
					$stmt->execute(array(
										':xnom_nodo' => $nom_nodo,
										':xdireccion' => $dir_nodo,
										':xdireccion_referencial' => $dir_ref_nodo,
										':xubicacion_referencial' => $dir_ubi_nodo,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xnum_serie' => $serie_nodo,
										':xnum_ptos_fr' => $puertos_fr,
										':xnum_ptos_rx' => $puertos_rx,
										':xnum_ptos_tx' => $puertos_tx,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xid_area_nodo' => $id_area_nodo,
										':xflag' => $estado,
										':xideditar'=> $ideditar
								));

				}else{
					$sqlquery ="INSERT INTO nodo (nom_nodo,direccion,direccion_referencial,ubicacion_referencial,latitud,longitud,fec_instalacion,num_serie,num_puertos_fr,rx,tx,id_modelo,id_marca,id_ered,id_ered_padre,id_area_nodo,flag)
					VALUES (:xnom_nodo,:xdireccion,:xdireccion_referencial,:xubicacion_referencial,:xlatitud,:xlongitud,:xfec_instalacion,:xnum_serie,:xnum_ptos_fr,:xnum_ptos_rx,:xnum_ptos_tx,:xid_modelo,:xid_marca,:xid_ered,:xid_ered_padre,:xid_area_nodo,:xflag)";
	
					$stmt =$dbh->prepare($sqlquery);
					$stmt->execute(array(
										':xnom_nodo' => $nom_nodo,
										':xdireccion' => $dir_nodo,
										':xdireccion_referencial' => $dir_ref_nodo,
										':xubicacion_referencial' => $dir_ubi_nodo,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xnum_serie' => $serie_nodo,
										':xnum_ptos_fr' => $puertos_fr,
										':xnum_ptos_rx' => $puertos_rx,
										':xnum_ptos_tx' => $puertos_tx,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xid_area_nodo' => $id_area_nodo,
										':xflag' => $estado
	
									));
				}
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				//if ($e->getCode()==23000) echo 'Codigo Error: '.$e->getCode().' Nombre Duplicado';
				//else
				 echo 'MENSAGE: '.$e->getMessage();
			}
			break;		


	case 7:	//Graba INGRESO AMPLIFICADOR
	
			$estado			= $_POST['estado'];
			$lat			= $_POST['lat'];
			$lon			= $_POST['lon'];
			$nom_amplif		= $_POST['nom_amplif'];
			$fec_instal		= $_POST['fec_instal'];
			$dir_amplif		= $_POST['dir_amplif'];
			$dir_ref_amplif	= $_POST['dir_ref_amplif'];
			$dir_ubi_amplif	= $_POST['dir_ubi_amplif'];
			$serie_amplif	= $_POST['serie_amplif'];
			$num_puertos	= $_POST['num_puertos'];
			$id_marca		= $_POST['id_marca'];
			$id_modelo 		= $_POST['id_modelo'];
			$id_tipo_padre	= $_POST['id_tipo_padre'];
			$id_ered_padre	= $_POST['id_ered_padre'];
			
			$accion			= $_POST['accion'];
			$ideditar		= $_POST['ideditar'];
			if ($id_tipo_padre==0) $id_tipo_padre=null;
			if ($id_ered_padre==0) $id_ered_padre=null;
																	
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				
				if ($accion == 'editar'){
					
					$sqlquery ="UPDATE amplificador SET nom_amplificador=:xnom_amplificador,direccion=:xdireccion,direccion_referencial=:xdireccion_referencial,ubicacion_referencial=:xubicacion_referencial,
									latitud=:xlatitud,longitud=:xlongitud,fec_instalacion=:xfec_instalacion,num_serie=:xnum_serie,num_puertos=:xnum_puertos,id_modelo=:xid_modelo,
									id_marca=:xid_marca,id_ered=:xid_ered,id_ered_padre=:xid_ered_padre,flag=:xflag 
								WHERE id_amplificador=:xideditar limit 1";
									
					$stmt =$dbh->prepare($sqlquery);	
					$stmt->execute(array(
										':xnom_amplificador' => $nom_amplif,
										':xdireccion' => $dir_amplif,
										':xdireccion_referencial' => $dir_ref_amplif,
										':xubicacion_referencial' => $dir_ubi_amplif,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xnum_serie' => $serie_amplif,
										':xnum_puertos' => $num_puertos,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado,
										':xideditar'=> $ideditar
								));

				}else{
					$sqlquery ="INSERT INTO amplificador (nom_amplificador,direccion,direccion_referencial,ubicacion_referencial,latitud,longitud,fec_instalacion,num_serie,num_puertos,id_modelo,id_marca,id_ered,id_ered_padre,flag)
					VALUES (:xnom_amplificador,:xdireccion,:xdireccion_referencial,:xubicacion_referencial,:xlatitud,:xlongitud,:xfec_instalacion,:xnum_serie,:xnum_puertos,:xid_modelo,:xid_marca,:xid_ered,:xid_ered_padre,:xflag)";
	
					$stmt =$dbh->prepare($sqlquery);
					$stmt->execute(array(
										':xnom_amplificador' => $nom_amplif,
										':xdireccion' => $dir_amplif,
										':xdireccion_referencial' => $dir_ref_amplif,
										':xubicacion_referencial' => $dir_ubi_amplif,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xnum_serie' => $serie_amplif,
										':xnum_puertos' => $num_puertos,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado
									));
				}
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				 echo 'MENSAGE: '.$e->getMessage();
			}
			break;		

	case 8:	//Graba INGRESO TAP
	
			$estado			= $_POST['estado'];
			$lat			= $_POST['lat'];
			$lon			= $_POST['lon'];
			$nom_tap		= $_POST['nom_tap'];
			$fec_instal		= $_POST['fec_instal'];
			$dir_tap		= $_POST['dir_tap'];
			$dir_ref_tap	= $_POST['dir_ref_tap'];
			$dir_ubi_tap	= $_POST['dir_ubi_tap'];
			$serie_tap		= $_POST['serie_tap'];
			$num_bornes		= $_POST['num_bornes'];
			$id_marca		= $_POST['id_marca'];
			$id_modelo 		= $_POST['id_modelo'];
			$id_tipo_padre	= $_POST['id_tipo_padre'];
			$id_ered_padre	= $_POST['id_ered_padre'];
			
			$accion			= $_POST['accion'];
			$ideditar		= $_POST['ideditar'];
			if ($id_tipo_padre==0) $id_tipo_padre=null;
			if ($id_ered_padre==0) $id_ered_padre=null;
																	
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				if ($accion == 'editar'){
					
					$sqlquery ="UPDATE tap SET nom_tap=:xnom_tap,cant_borne=:xcant_borne,direccion=:xdireccion,direccion_referencial=:xdireccion_referencial,
								ubicacion_referencial=:xubicacion_referencial,longitud=:xlongitud,latitud=:xlatitud,fec_instalacion=:xfec_instalacion,
								num_serie=:xnum_serie,id_modelo=:xid_modelo,id_marca=:xid_marca,id_ered=:xid_ered,id_ered_padre=:xid_ered_padre,flag=:xflag
								WHERE id_tap=:xideditar limit 1";
					
					$stmt =$dbh->prepare($sqlquery);	
					$stmt->execute(array(
										':xnom_tap' => $nom_tap,
										':xcant_borne' => $num_bornes,
										':xdireccion' => $dir_tap,
										':xdireccion_referencial' => $dir_ref_tap,
										':xubicacion_referencial' => $dir_ubi_tap,
										':xlongitud' => $lon,
										':xlatitud' => $lat,
										':xfec_instalacion' => $fec_instal,
										':xnum_serie' => $serie_tap,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado,
										':xideditar'=> $ideditar
								));

				}else{
					$sqlquery ="INSERT INTO tap (nom_tap,cant_borne,direccion,direccion_referencial,ubicacion_referencial,longitud,latitud,fec_instalacion,num_serie,id_modelo,id_marca,id_ered,id_ered_padre,flag)
					VALUES (:xnom_tap,:xcant_borne,:xdireccion,:xdireccion_referencial,:xubicacion_referencial,:xlongitud,:xlatitud,:xfec_instalacion,:xnum_serie,:xid_modelo,:xid_marca,:xid_ered,:xid_ered_padre,:xflag)";
	
					$stmt =$dbh->prepare($sqlquery);
					$stmt->execute(array(
										':xnom_tap' => $nom_tap,
										':xcant_borne' => $num_bornes,
										':xdireccion' => $dir_tap,
										':xdireccion_referencial' => $dir_ref_tap,
										':xubicacion_referencial' => $dir_ubi_tap,
										':xlongitud' => $lon,
										':xlatitud' => $lat,
										':xfec_instalacion' => $fec_instal,
										':xnum_serie' => $serie_tap,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado
									));
				}
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				 echo 'MENSAGE: '.$e->getMessage();
			}
			break;					

	case 9:	//Graba INGRESO CABLE MODEM
	
			$estado			= $_POST['estado'];
			$lat			= $_POST['lat'];
			$lon			= $_POST['lon'];
			$nom_modem		= $_POST['nom_modem'];
			$fec_instal		= $_POST['fec_instal'];
			$mac			= $_POST['mac'];
			$id_cliente		= $_POST['id_cliente'];
			$id_marca		= $_POST['id_marca'];
			$id_modelo 		= $_POST['id_modelo'];
			$id_tipo_padre	= $_POST['id_tipo_padre'];
			$id_ered_padre	= $_POST['id_ered_padre'];
			
			$accion			= $_POST['accion'];
			$ideditar		= $_POST['ideditar'];
			if ($id_tipo_padre==0) $id_tipo_padre=null;
			if ($id_ered_padre==0) $id_ered_padre=null;
																	
			
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				
				if ($accion == 'editar'){
					
					$sqlquery ="UPDATE cable_modem SET 
								nom_cable_modem=:xnom_cable_modem,
								num_mac=:xnum_mac,
								latitud=:xlatitud,
								longitud=:xlongitud,
								fec_instalacion=:xfec_instalacion,
								id_cliente=:xid_cliente,
								id_modelo=:xid_modelo,
								id_marca=:xid_marca,
								id_ered=:xid_ered,
								id_ered_padre=:xid_ered_padre,
								flag=:xflag
								WHERE id_cable_modem=:xideditar limit 1";
					
					$stmt =$dbh->prepare($sqlquery);	
					$stmt->execute(array(
										':xnom_cable_modem' => $nom_modem,
										':xnum_mac' => $mac,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xid_cliente' => $id_cliente,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado,
										':xideditar'=> $ideditar
								));

				}else{
				
					$sqlquery ="INSERT INTO cable_modem (nom_cable_modem,num_mac,latitud,longitud,fec_instalacion,id_cliente,id_modelo,id_marca,id_ered,id_ered_padre,flag)
					VALUES (:xnom_cable_modem,:xnum_mac,:xlatitud,:xlongitud,:xfec_instalacion,:xid_cliente,:xid_modelo,:xid_marca,:xid_ered,:xid_ered_padre,:xflag)";
	
					$stmt =$dbh->prepare($sqlquery);
					$stmt->execute(array(
										':xnom_cable_modem' => $nom_modem,
										':xnum_mac' => $mac,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xid_cliente' => $id_cliente,
										':xid_modelo' => $id_modelo,
										':xid_marca' => $id_marca,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado
									));
				}
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				 echo 'MENSAGE: '.$e->getMessage();
			}
			break;		
		case 10:	//Graba INGRESO HUB
	
			$estado			= $_POST['estado'];
			$redundancia	= $_POST['redundancia'];
			$lat			= $_POST['lat'];
			$lon			= $_POST['lon'];
			$nom_hub		= $_POST['nom_hub'];
			$fec_instal		= $_POST['fec_instal'];
			$dir_hub		= $_POST['dir_hub'];
			$dir_ref_hub	= $_POST['dir_ref_hub'];
			$dir_ubi_hub	= $_POST['dir_ubi_hub'];
			$obs			= $_POST['obs'];
			$puertos_rxF	= $_POST['puertos_rxF'];
			$puertos_txF	= $_POST['puertos_txF'];
			$puertos_rxR	= $_POST['puertos_rxR'];
			$puertos_txR	= $_POST['puertos_txR'];
			$id_tipo_padre_sec		= $_POST['id_tipo_padre_sec'];
			$id_ered_padre_sec 		= $_POST['id_ered_padre_sec'];
			$id_tipo_padre	= $_POST['id_tipo_padre'];
			$id_ered_padre	= $_POST['id_ered_padre'];
			
			$accion			= $_POST['accion'];
			$ideditar		= $_POST['ideditar'];
			//echo $ideditar;return;
			if ($id_tipo_padre_sec==0) $id_tipo_padre_sec=null;
			if ($id_ered_padre_sec==0) $id_ered_padre_sec=null;
			if ($id_tipo_padre==0) $id_tipo_padre=null;
			if ($id_ered_padre==0) $id_ered_padre=null;

			
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$dbh->beginTransaction();
				if ($accion == 'editar'){
					
					$sqlquery ="UPDATE hub SET nom_hub=:xnom_hub,direccion=:xdireccion,direccion_referencial=:xdireccion_referencial,ubicacion_referencial=:xubicacion_referencial,
									latitud=:xlatitud,longitud=:xlongitud,fec_instalacion=:xfec_instalacion,rx_f=:xrx_f,tx_f=:xtx_f,rx_r=:xrx_r,
									tx_r=:xtx_r,redundancia=:xredundancia,id_ered_redundancia=:xid_tipo_padre_sec,id_ered_padre_redundancia=:xid_ered_padre_sec,
									id_ered=:xid_ered,id_ered_padre=:xid_ered_padre,obs=:xobs,flag=:xflag WHERE id_hub=:xideditar limit 1";
					//echo $sqlquery;return;
					$stmt =$dbh->prepare($sqlquery);	
					$stmt->execute(array(
										':xnom_hub' => $nom_hub,
										':xdireccion' => $dir_hub,
										':xdireccion_referencial' => $dir_ref_hub,
										':xubicacion_referencial' => $dir_ubi_hub,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xobs' => $obs,
										':xrx_f' => $puertos_rxF,
										':xtx_f' => $puertos_txF,
										':xrx_r' => $puertos_rxR,
										':xtx_r' => $puertos_txR,
										':xredundancia' => $redundancia,
										':xid_tipo_padre_sec' => $id_tipo_padre_sec,
										':xid_ered_padre_sec' => $id_ered_padre_sec,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado,
										':xideditar'=> $ideditar
								));

				}else{
	 				$sqlquery ="INSERT INTO hub (nom_hub,direccion,direccion_referencial,ubicacion_referencial,latitud,longitud,fec_instalacion,obs,rx_f,tx_f,rx_r,tx_r,redundancia,id_ered_redundancia,id_ered_padre_redundancia,id_ered,id_ered_padre,flag)
					VALUES (:xnom_hub,:xdireccion,:xdireccion_referencial,:xubicacion_referencial,:xlatitud,:xlongitud,:xfec_instalacion,:xobs,:xrx_f,:xtx_f,:xrx_r,:xtx_r,:xredundancia,:xid_tipo_padre_sec,:xid_ered_padre_sec,:xid_ered,:xid_ered_padre,:xflag)";
	
					$stmt =$dbh->prepare($sqlquery);
					$stmt->execute(array(
										':xnom_hub' => $nom_hub,
										':xdireccion' => $dir_hub,
										':xdireccion_referencial' => $dir_ref_hub,
										':xubicacion_referencial' => $dir_ubi_hub,
										':xlatitud' => $lat,
										':xlongitud' => $lon,
										':xfec_instalacion' => $fec_instal,
										':xobs' => $obs,
										':xrx_f' => $puertos_rxF,
										':xtx_f' => $puertos_txF,
										':xrx_r' => $puertos_rxR,
										':xtx_r' => $puertos_txR,
										':xredundancia' => $redundancia,
										':xid_tipo_padre_sec' => $id_tipo_padre_sec,
										':xid_ered_padre_sec' => $id_ered_padre_sec,
										':xid_ered' => $id_tipo_padre,
										':xid_ered_padre' => $id_ered_padre,
										':xflag' => $estado
	
									));
				}	
					
					
					
		
								
				$dbh->commit();
				echo 'Grabado Satisfactoriamente.';			
			}catch (PDOException $e){
				$dbh->rollBack();
				//if ($e->getCode()==23000) echo 'Codigo Error: '.$e->getCode().' Nombre Duplicado';
				//else
				 echo 'MENSAGE: '.$e->getMessage();
			}
			break;	


	case 20: // Busqueda en Visor // falta
		

			$ered=$_POST["ered"];	
			if(!$ered) $ered=$_GET["ered"];	
			$txtbuscar=$_POST["query"];	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			
			if(!$ered) return;
			
			switch($ered){
				case 1: $sqlquery= "select id_cable_modem as id,nom_cable_modem as descripcion from cable_modem where flag=1".
									texto('and','nom_cable_modem',' like ','3',$txtbuscar);break;					// and nom_modem like '%$txtbuscar%'";break;
				case 2: $sqlquery= "select id_tap as id,nom_tap as descripcion from tap where flag=1".
									texto('and','nom_tap',' like ','3',$txtbuscar);break;					// and nom_tap like '%$txtbuscar%'";break;
				case 3: $sqlquery= "select id_amplificador as id,nom_amplificador as descripcion from amplificador where flag=1".
									texto('and','nom_amplificador',' like ','3',$txtbuscar);break;			// and nom_amplificador like '%$txtbuscar%'";break;
				case 4: $sqlquery= "select id_nodo as id,nom_nodo as descripcion from nodo where flag=1".
									texto('and','nom_nodo',' like ','3',$txtbuscar);break;					// and nom_nodo like '%$txtbuscar%'"; break;
				case 5: $sqlquery= "select id_cabecera as id,nom_cabecera as descripcion from cabecera where flag=1".
									texto('and','nom_cabecera',' like ','3',$txtbuscar);break;				// and nom_cabecera like '%$txtbuscar%'";break;
			}
			//print $sqlquery;
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
					
		case 21: // Busqueda de Elementos de Red para generar xml
			$ered=$_POST["ered"];	
			if(!$ered) $ered=$_GET["ered"];	
			if(!$ered) return;
			
			
			$txtbuscar=$_POST["query"];	
			if(!$txtbuscar) $txtbuscar=$_GET["query"];
			if(!$txtbuscar) return;			
			switch($ered){
				case 1: 
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
									texto('and','a.id_cable_modem',' = ','-',$txtbuscar);
					break;		
				case 2: 
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
									texto('and','a.id_tap',' = ','-',$txtbuscar);
					break;					

				case 3: 
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
									texto('and','a.id_amplificador',' = ','-',$txtbuscar);
									
					break;					

				case 4: 
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
										texto('and','a.id_nodo',' = ','-',$txtbuscar);
					break;					

				case 5: 
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
										texto('and','a.id_hub',' = ','-',$txtbuscar);
									
					break;					
				case 6: 
					if ($txtbuscar=='****')	
						$sqlquery= "select id_cabecera,nom_cabecera,direccion,latitud,longitud,id_ered,flag  from cabecera where flag in (1,0)";
					else 
						$sqlquery= "select id_cabecera,nom_cabecera,direccion,latitud,longitud,id_ered,flag from cabecera where flag in (1,0)".
									texto('and','a.id_cabecera',' = ','-',$txtbuscar);
								
					break;
			}
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($sqlquery);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
					//$arr[] = $row;
					switch($ered){
						case 1: 
							$html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>".
								   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>".
									"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS DEL CABLE MODEM</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Cable</div></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->id_cable_modem ."</span></th>".
										"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->nom_cable_modem  . "</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >MAC</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->num_mac ."</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->fec_instalacion . "</span></th></tr></table>";
							break;		
						case 2: 
							$html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>".
								   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>".
									"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS DEL TAP</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Tap</div></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->id_tap ."</span></th>".
										"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->nom_tap  . "</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Num. Bornes</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->cant_borne ."</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->fec_instalacion . "</span></th></tr></table>";
							break;
						case 3: 
							$html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>".
								   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>".
									"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS DEL AMPLIFICADOR</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Tap</div></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->id_amplificador ."</span></th>".
										"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->nom_amplificador  . "</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Num. Bornes</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->direccion ."</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->fec_instalacion . "</span></th></tr></table>";
							break;
						case 4: 
							$html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>".
								   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>".
									"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS DEL NODO</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Tap</div></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->id_nodo ."</span></th>".
										"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->nom_nodo  . "</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Num. Bornes</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->direccion ."</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->fec_instalacion . "</span></th></tr></table>";
							break;
						case 5: 
							$html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>".
								   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>".
									"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS DEL HUB</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Tap</div></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->id_hub ."</span></th>".
										"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->nom_hub . "</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Num. Bornes</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->direccion ."</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->fec_instalacion . "</span></th></tr></table>";
							break;
						case 6: 
							$html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>".
								   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>".
									"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS DE LA CABECERA</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Tap</div></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->id_cabecera ."</span></th>".
										"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>".
										"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->nom_cabecera . "</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Num. Bornes</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>". $row->direccion ."</span></th></tr>".
									"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>".
										"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" . $row->fec_instalacion . "</span></th></tr></table>";
							break;				
					}
				}			
				//echo '{"results":'.json_encode($arr).'}';
				echo $html;
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