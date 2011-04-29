<?php
/**
 * Mantenimientos varios
 * @author Ricardo De la Torre
 *
 */
ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$arr = array();
$f = $_POST["f"];

switch ($f) {
	case 1:     // LISTA DEPARTAMENTOS
		include_once("conexion.php");
		try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql ="select id_zonal,desc_zonal,estado from zonal where estado=1 order by 2";
                    $stmt1 =$dbh->prepare($sql);
                    $stmt1->execute();
                    while($row=$stmt1->fetchObject()){
                        $arr1[] = $row;
                    }
                    echo '{"zonales":'.json_encode($arr1).'}';
		}catch (PDOException $e){
                    echo 'SQL Query: ', $sql . '<br/>';
                    echo 'Error: '   .$e->getMessage() . '<br />';
                    echo 'Archivo: ' .$e->getFile() . '<br />';
                    echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
        case 2:     // LISTA CIUDADES
		include_once("conexion.php");
		try{
                    $idDpto=$_POST["id_zonal"];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql ="select id_ciudad,desc_ciudad from ciudad where estado=1 and id_zonal=:j_zonal order by 2";
                    $stmt1 =$dbh->prepare($sql);
                    $stmt1->bindParam(':j_zonal', $idDpto);
                    $stmt1->execute();
                    while($row=$stmt1->fetchObject()){
                        $arr1[] = $row;
                    }
                    echo '{"ciudades":'.json_encode($arr1).'}';
		}catch (PDOException $e){
                    echo 'SQL Query: ', $sql . '<br/>';
                    echo 'Error: '   .$e->getMessage() . '<br />';
                    echo 'Archivo: ' .$e->getFile() . '<br />';
                    echo 'Linea: '   .$e->getLine() . '<br />';
		}
                break;
	case 3:     // LISTA DISTRITOS
		include_once("conexion.php");
		try{
                    $idCiudad=$_POST["id_ciudad"];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql2 ="select id_distrito,desc_distrito from distrito where estado=1 and id_ciudad=:j_ciudad order by 2";
                    $stmt1 =$dbh->prepare($sql2);
                    $stmt1->bindParam(':j_ciudad', $idCiudad);
                    $stmt1->execute();
                    while($row=$stmt1->fetchObject()){
                        $arr1[] = $row;
                    }
                    echo '{"distritos":'.json_encode($arr1).'}';
		}catch (PDOException $e){
                    echo 'SQL Query: ', $sql . '<br/>';
                    echo 'Error: '   .$e->getMessage() . '<br />';
                    echo 'Archivo: ' .$e->getFile() . '<br />';
                    echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
	case 4:     // LISTA VENDEDORES
		include_once("conexion.php");
		try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql2 ="select id_vendedor,CONCAT('CV0',id_vendedor) AS cod_vendedor,concat(ap_paterno,' ',ap_materno,',',nombre) as nom_completo
                            from vendedor where estado=1 order by 2";
                    $stmt1 =$dbh->prepare($sql2);
                    $stmt1->execute();
                    while($row=$stmt1->fetchObject()){
                        $arr1[] = $row;
                    }
                    echo '{"vendedores":'.json_encode($arr1).'}';
		}catch (PDOException $e){
                    echo 'SQL Query: ', $sql . '<br/>';
                    echo 'Error: '   .$e->getMessage() . '<br />';
                    echo 'Archivo: ' .$e->getFile() . '<br />';
                    echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
	case 5:     // LISTA SERVICIOS
		include_once("conexion.php");
		try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql2 ="select a.id_servicio,a.nom_servicio,a.desc_servicio,a.habilita_cantidad,a.precio_unitario,
                            a.precio_por_dia,a.monto_por_tv_adicional,a.id_moneda,a.id_tiposervicio,concat(b.pref_moneda,' ',a.precio_unitario) as monto,
                            concat(b.pref_moneda,' ',a.monto_por_tv_adicional) as monto_tv,pref_moneda
                            from servicio a,moneda b where a.id_moneda=b.id_moneda and estado=1 order by 2";
                    $stmt1 =$dbh->prepare($sql2);
                    $stmt1->execute();
                    while($row=$stmt1->fetchObject()){
                        $arr1[] = $row;
                    }
                    echo '{"servicios":'.json_encode($arr1).'}';
		}catch (PDOException $e){
                    echo 'SQL Query: ', $sql . '<br/>';
                    echo 'Error: '   .$e->getMessage() . '<br />';
                    echo 'Archivo: ' .$e->getFile() . '<br />';
                    echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
	case 6:     // LISTA TECNICOS
		include_once("conexion.php");
		try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql6 ="select id_tecnico,cod_tecnico,concat(ap_paterno,' ',ap_materno,', ',nombres) as nom_tecnico,dni
                            from tecnico where estado=1 and id_tecnico!=1 order by 2";
                    $stmt6 =$dbh->prepare($sql6);
                    $stmt6->execute();
                    while($row=$stmt6->fetchObject()){
                        $arr6[] = $row;
                    }
                    echo '{"tecnicos":'.json_encode($arr6).'}';
		}catch (PDOException $e){
                    echo 'SQL Query: ', $sql . '<br/>';
                    echo 'Error: '   .$e->getMessage() . '<br />';
                    echo 'Archivo: ' .$e->getFile() . '<br />';
                    echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
        case 7:     //LISTA TIPO DE CLIENTE
		include_once("conexion.php");
		try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $sql7 ="select id_tipo_cliente,tipo_cliente from tipo_cliente order by 2";
                    $stmt7 =$dbh->prepare($sql7);
                    $stmt7->execute();
                    while($row=$stmt7->fetchObject()){
                        $arr7[] = $row;
                    }
                    echo '{"tipo_clientes":'.json_encode($arr7).'}';
		}catch (PDOException $e){
                    echo 'SQL Query: ', $sql . '<br/>';
                    echo 'Error: '   .$e->getMessage() . '<br />';
                    echo 'Archivo: ' .$e->getFile() . '<br />';
                    echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
    }
?>