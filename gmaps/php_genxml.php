<?php
	ini_set("display_errors", "Off");
	error_reporting(E_ALL ^ E_NOTICE);
	include_once("conexion.php");
	include("f_funciones.php");
	
	
		
	/*require("phpsqlajax_dbinfo.php");
	require("f_funciones.php");


	// Opens a connection to a MySQL server AND Set the active MySQL database
		$connection=mysql_connect (localhost, $username, $password);
		if (!$connection) die('Not connected : ' . mysql_error());
		$db_selected = mysql_select_db($database, $connection);
		if (!$db_selected) die ('Can\'t use db : ' . mysql_error());
	
	$source=$_GET["source"];
	$sw=0;
	switch ($source){
	case 'georeferencia':
		$zonal=$_GET["zonal"];	//Las zonales vienen separadas por ','
		$zonales = cadenaIN($zonal,',');
		$mdf=$_GET["mdf"];
		if($mdf=='Seleccionar...') $mdf='';
		$empresa=$_GET["empresa"];
		$tecnico=$_GET["tecnico"];
		$tipo=$_GET["tipo"];
		$negocio=$_GET["negocio"];
		$p_empresa=$_GET["p_empresa"];
		if($p_empresa!='TP') $empresa=$p_empresa;
		$segmento=$_GET["segmento"];
		//print $segmento;
		$nuevosegmento = segmentos($segmento);
		if(($zonal=='undefined' or $zonal=='') and 
			($mdf=='undefined' or $mdf=='') and 
			($empresa=='undefined' or $empresa=='') and 
			($tecnico=='undefined' or $tecnico=='') and 
			($tipo=='undefined' or $tipo=='') and 
			($negocio=='undefined' or $negocio=='')) $sw=1;
		$campos_query = "a.zonal,a.nro_actuacion,a.descripcion,a.d_producto,b.nom_tipo,c.nom_negocio,a.eecc,a.telefono,a.cliente,a.tecnico,a.mdf,a.latitud,a.longitud,a.estado,a.segmento,a.f_actuacion_1,a.negocio";
		$where_latlon_query = "and a.latitud!='0.000000' and a.longitud!='0.000000'";
		$where2_query = "and a.eecc!='' and a.eecc is not null and trim(a.eecc)!='-'";
		$where3_query = trim(	texto('and','b.id','=','-',$tipo).
								texto('and','c.id','=','-',$negocio).
								texto('and','a.eecc','=','1',$empresa).
								texto('and','a.mdf','=','1',$mdf).
								texto('and','a.tecnico',' like ','3',$tecnico).
								texto('and','a.zonal',' in ','2',$zonales).
								texto('and','a.segmento',' in ','2',$nuevosegmento)
							);
		break;
	case 'impresion':
		//$dato contiene los Nros de actuaciones separados por '|||'
		$dato=$_GET['dato'];
		
		$nuevodato = cadenaIN($dato,'|||');
		if($dato=='undefined') $sw=1;
		$campos_query = "CASE 
			WHEN (a.agenda in ('S','N') and now()<a.inicio_agenda and a.estado not in('en curso','Aceptada','En Desplaza')) then '4'
			WHEN a.agenda in ('S','N') and a.estado in('en curso','Aceptada','En Desplaza') THEN '5'
			WHEN a.agenda in ('S','N') and now()>=a.inicio_agenda AND now()<DATE_SUB(a.fin_agenda,INTERVAL '30:0' MINUTE_SECOND) and a.estado not in('en curso','Aceptada','En Desplaza') THEN '3'
			WHEN a.agenda in ('S','N') and now()>=DATE_SUB(a.fin_agenda,INTERVAL '30:0' MINUTE_SECOND) AND now()<a.fin_agenda and a.estado not in('en curso','Aceptada','En Desplaza') THEN '2'
			WHEN a.agenda in ('S','N') and (now()>=a.fin_agenda and a.estado not in('en curso','Aceptada','En Desplaza')) THEN '1'
			WHEN (agenda='V') THEN '6'
			ELSE '-' END as alarma,a.agenda,a.zonal,a.nro_actuacion,a.descripcion,a.d_producto,b.nom_tipo,c.nom_negocio,a.eecc,a.telefono,a.cliente,a.tecnico,a.mdf,a.latitud,a.longitud,a.estado,a.segmento,a.f_actuacion_1,a.negocio";
		$where_latlon_query = "and a.latitud!='0.000000' and a.longitud!='0.000000'";
		$where2_query = "and a.eecc!='' and a.eecc is not null and trim(a.eecc)!='-'";
		$where3_query = "and a.nro_actuacion in (".$nuevodato.")";
		//print ($where3_query);
		break;
	}


		//$campos_query = "a.zonal,a.nro_actuacion,a.descripcion,a.d_producto,b.nom_tipo,c.nom_negocio,a.eecc,a.telefono,a.cliente,a.tecnico,a.mdf,a.latitud,a.longitud,a.estado,a.segmento,a.f_actuacion_1,a.negocio";
		$idNodo		= $_GET["idNodo"];
		$idAmplif	= $_GET["idAmplif"];
		$idTap		= $_GET["idTap"];
		
		
		$from_query = "tmp_pendientes a, tb_tipos b, tb_negocios c, tb_estados d";
		$where1_query = "a.tipo_1=b.id and trim(a.negocio)=c.id and a.negocio not like 'E%' and a.estado=d.desc_estado";
		
		$query = trim("SELECT ".$campos_query." FROM ".$from_query." WHERE ".$where1_query." ".$where2_query." ".$where3_query." ".$where_latlon_query)." ORDER BY a.tecnico ASC,a.f_actuacion_1 ASC,a.nro_actuacion ASC";
		//print ($query);
	*/
		$idNodo		= $_GET["idNodo"];
		$idAmplif	= $_GET["idAmplif"];
		$idTap		= $_GET["idTap"];
		
//		echo 'NODO='.$idNodo.'_AMPLIF='.$idAmplif.'_TAP='.$idTap;
		//$query="select id_cable_modem as id,latitud,longitud, 1 as tipo from cable_modem where id_ered_padre=$idTap";
		
		$query="select id_cable_modem as id,nom_cable_modem as nom,latitud,longitud, 1 as tipo from cable_modem where id_ered_padre=$idTap
				union all
				select id_tap as id,nom_tap as nom,latitud,longitud, 2 as tipo from tap where id_tap=$idTap
				union all
				select id_nodo as id,nom_nodo as nom,latitud,longitud, 4 as tipo from nodo where id_nodo=$idNodo";
		
		if ($idAmplif!='') 
			$query=$query. " union all
							select id_amplificador as id,nom_amplificador as nom,latitud,longitud, 3 as tipo from amplificador where id_amplificador=$idAmplif";

		$query1 =trim("SELECT  max(a.latitud) as maxlat, max(a.longitud) as maxlon, min(a.latitud) as minlat, min(a.longitud) as minlon".
					 " FROM (".$query.") as a");
					 
		$query2 =trim("select c.desc_area_nodo,c.color_area,c.transparencia_area,c.color_linea,c.transparencia_linea,c.ancho_linea,c.puntos
						from nodo as a 
						left join area_nodo as c on a.id_area_nodo=c.id_area_nodo
						where a.flag in (1) and id_nodo=$idNodo");
			
		header("Content-type: text/xml; charset=iso-8859-1");
		echo '<?xml-stylesheet type="text/xsl" href="stylesheet.xsl"?>';
		// Start XML file, echo parent node
		echo '<markers>';	
			

			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($query1);
				$stmt->execute();
				while($row1=$stmt->fetchObject()){
					
					$minlat=$row1->minlat;
					$minlon=$row1->minlon;
					$maxlat=$row1->maxlat;
					$maxlon=$row1->maxlon;
					$latitudcenter=($minlat+$maxlat)/2;
					$longitudcenter=($minlon+$maxlon)/2;
					
					echo '<marker ';
					echo 'lat_center="' . $latitudcenter . '" ';
					echo 'lon_center="' . $longitudcenter. '" ';
					echo 'min_lat="' . $minlat. '" ';
					echo 'min_lon="' . $minlon. '" ';
					echo 'max_lat="' . $maxlat. '" ';
					echo 'max_lon="' . $maxlon. '" ';
					echo '/>';
				}
			}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $query1;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}
					
			
			try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($query2);
				$stmt->execute();
				while($row2=$stmt->fetchObject()){
					$desc_area_nodo		=	$row2->desc_area_nodo ;
					$color_area			= 	$row2->color_area ;
					$transparencia_area	=	$row2->transparencia_area ;
					$color_linea		=	$row2->color_linea ;
					$transparencia_linea=	$row2->transparencia_linea ;
					$ancho_linea		=	$row2->ancho_linea ;
					$puntos				=	$row2->puntos ;
					echo '<marker ';
					echo 'desc_area_nodo="' . $desc_area_nodo . '" ';
					echo 'color_area="' . $color_area. '" ';
					echo 'transparencia_area="' . $transparencia_area. '" ';
					echo 'color_linea="' . $color_linea. '" ';
					echo 'transparencia_linea="' . $transparencia_linea. '" ';
					echo 'ancho_linea="' . $ancho_linea. '" ';
					echo 'puntos="' . $puntos. '" ';
					echo '/>';
				}
			}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $query2;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}

			


		try{
				$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$stmt=$dbh->prepare($query);
				$stmt->execute();
				while($row=$stmt->fetchObject()){
				//	var_dump($row);
				//	$arr[] = $row;
							
				//echo '{"results":'.json_encode($arr).'}';
			

		//$result = mysql_query($query);
		//if (!$result) die('Invalid query: ' . mysql_error());
	//	@mysql_query("SET NAMES utf8");
	//	@mysql_query("SET CHARACTER_SET utf8");

		//$cant_averias = mysql_num_rows($result);
		//if ($cant_averias!=0){
/*				
			$query3= trim(	"SELECT distinct a.mdf"." FROM ".$from_query.
							" WHERE ".$where1_query." ".$where2_query." ".$where3_query." ".$where_latlon_query).
							" ORDER BY mdf";
			$result3 = mysql_query($query3);
			if (!$result3)  die('Invalid query3: '.mysql_error());
			$num_rows = mysql_num_rows($result3);
			$contador = 0; 
			$cadena_mdfsel = '';
			while ($row3 = @mysql_fetch_assoc($result3)){
				$mdfsel = trim($row3['mdf']);
				if($contador==0 and $num_rows==1) $cadena_mdfsel.='("'.$mdfsel.'")';
				if($contador==0 and $num_rows!=1) $cadena_mdfsel.='("'.$mdfsel.'",';
				if($contador!=($num_rows-1) and $contador!==0 and $num_rows!=1) $cadena_mdfsel.='"'.$mdfsel.'",';
				if($contador==($num_rows-1) and $num_rows!=1) $cadena_mdfsel.='"'.$mdfsel.'")';
				$contador++;
			}
		
		$from_query = "tmp_pendientes a, tb_tipos b, tb_negocios c, tb_estados d";
		$where1_query = "a.tipo_1=b.id and a.negocio=c.id and a.estado=d.desc_estado";
		
			$query1 =trim("SELECT  max(a.latitud) as maxlat, max(a.longitud) as maxlon, min(a.latitud) as minlat, min(a.longitud) as minlon".
					 " FROM ".$from_query." WHERE ".$where1_query." and a.latitud!='0.000000' and a.longitud!='0.000000' ".$where2_query." ".$where3_query);
			
			$result1 = mysql_query($query1);
			
			//print ($query1);
			//print (mysql_num_rows($result1));
			if (!$result1)  die('Invalid query1: '.mysql_error());
			$row1 = @mysql_fetch_array($result1);
			
			$minlat=$row1[2];
			$minlon=$row1[3];
			$maxlat=$row1[0];
			$maxlon=$row1[1];
			$latitudcenter=($minlat+$maxlat)/2;
			$longitudcenter=($minlon+$maxlon)/2;
			
			if ($num_rows==0) {
				$querymdf ="
				SELECT zonal,mdf,d_mdf,dir_mdf,tecno,eje_x,eje_y,empresa
				FROM tb_mdfs
				WHERE eje_y BETWEEN $minlat and $maxlat and eje_x BETWEEN $minlon and $maxlon";
				}
			else {
				$querymdf ="
				SELECT zonal,mdf,d_mdf,dir_mdf,tecno,eje_x,eje_y,empresa
				FROM tb_mdfs
				WHERE mdf IN $cadena_mdfsel";
				
				$queryarmario ="
				SELECT macodarm,magescodmd,coorx,coory 
				FROM tb_armarios
				WHERE magescodmd IN $cadena_mdfsel";
				}
			//print ($querymdf);
			$resultmdf = mysql_query($querymdf);
			if (!$resultmdf)  die('Invalid querymdf: '.mysql_error());
			$rowmdf = mysql_num_rows($resultmdf);
			
			$resultarmario = mysql_query($queryarmario);
			if (!$resultarmario)  die('Invalid queryarmario: '.mysql_error());
			$rowarm = mysql_num_rows($resultarmario);
			
			$punteroinicio=$rowmdf+$rowarm;
*/
			
/*				echo '<marker ';
			  		echo 'inicio="' . $punteroinicio . '" ';
					echo 'finmdf="' . $rowmdf . '" ';
					echo 'cant_averias="' . $cant_averias . '" ';
					echo 'lat_center="' . $latitudcenter . '" ';
					echo 'lon_center="' . $longitudcenter. '" ';
					echo 'min_lat="' . $minlat. '" ';
					echo 'min_lon="' . $minlon. '" ';
					echo 'max_lat="' . $maxlat. '" ';
					echo 'max_lon="' . $maxlon. '" ';
				echo '/>';
				if ($rowmdf>0){ 
					while ($row2 = @mysql_fetch_assoc($resultmdf)){
						echo '<marker ';
							echo 'zonal="' . parseToXML($row2['zonal']) . '" ';
							echo 'mdf="' . parseToXML($row2['mdf']) . '" ';
							echo 'd_mdf="' . parseToXML($row2['d_mdf']) . '" ';
							echo 'dir_mdf="' . parseToXML($row2['dir_mdf']) . '" ';
							echo 'tecno="' . parseToXML($row2['tecno']) . '" ';
							echo 'lat="' . $row2['eje_y'] . '" ';
							echo 'lon="' . $row2['eje_x'] . '" ';
						echo '/>';
					}
				}
				if ($rowarm>0){ 
					while ($row4 = @mysql_fetch_assoc($resultarmario)){
						echo '<marker ';
							echo 'armario="' . parseToXML($row4['macodarm']) . '" ';
							echo 'mdf="' . parseToXML($row4['magescodmd']) . '" ';
							echo 'lat="' . $row4['coory'] . '" ';
							echo 'lon="' . $row4['coorx'] . '" ';
						echo '/>';
					}
				}
*/
				// Iterate through the rows, printing XML nodes for each
			//	while ($row = @mysql_fetch_assoc($result)){
			/*		echo '<marker ';
					echo 'tipo="' . parseToXML($row['tipo']) . '" ';
					echo 'id_cable_modem="' . parseToXML($row['id_cable_modem']) . '" ';
					echo 'nom_cable_modem="' . parseToXML($row['nom_cable_modem']) . '" ';
					echo 'num_mac="' . parseToXML($row['num_mac']) . '" ';
					echo 'latitud="' . parseToXML($row['latitud']) . '" ';
					echo 'longitud="' . parseToXML($row['longitud']) . '" ';
					echo 'fec_instalacion="' . $row['fec_instalacion'] . '" ';
					echo '/>';
*/
					echo '<marker ';
					echo 'tipo="' . parseToXML($row->tipo) . '" ';
					echo 'id="' . parseToXML($row->id) . '" ';
					echo 'nom="' . parseToXML($row->nom) . '" ';
					echo 'latitud="' . parseToXML($row->latitud) . '" ';
					echo 'longitud="' . parseToXML($row->longitud) . '" ';
					echo '/>';


				  // ADD TO XML DOCUMENT NODE
/*					echo '<marker ';
					echo 'nro_actuacion="' . parseToXML($row['nro_actuacion']) . '" ';
					echo 'cliente="' . parseToXML($row['cliente']) . '" ';
					echo 'telefono="' . parseToXML($row['telefono']) . '" ';
					echo 'descripcion="' . parseToXML($row['descripcion']) . '" ';
					echo 'd_producto="' . parseToXML($row['d_producto']) . '" ';
					echo 'tipo_1="' . parseToXML($row['nom_tipo']) . '" ';
					echo 'tecnico="' . parseToXML($row['tecnico']) . '" ';
					echo 'estado="' . parseToXML($row['estado']) . '" ';
					echo 'negocio="' . parseToXML($row['nom_negocio']) . '" ';
					echo 'mdf="' . parseToXML($row['mdf']) . '" ';
					echo 'latitud="' . $row['latitud'] . '" ';
					echo 'longitud="' . $row['longitud'] . '" ';
					echo 'eecc="' . $row['eecc'] . '" ';
					echo 'zonal="' . parseToXML($row['zonal']) . '" ';
					echo '/>';
*/
			//	}
			// End XML file
			

				}
			echo '</markers>';

	
	
	}catch (PDOException $e){
				echo 'PDO Excepciones.	';
				echo 'Error con la base de datos: <br />';
				echo 'SQL Query: ', $query;
				echo '<pre>';
				echo 'Error: ' .$e->getMessage() . '<br />';
				echo 'Archivo: ' . $e->getFile() . '<br />';
				echo 'Linea: ' . $e->getLine() . '<br />';
				echo '</pre>';
			}

	
?>

