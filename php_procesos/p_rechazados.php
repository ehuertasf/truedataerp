<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$arr = array();
$f = $_POST['f'];
$start = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limit = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);

switch ($f) {
	case 1:     // CONSULTA CLIENTES EN ESTADO RECHAZADO
		include_once("conexion.php");
		try{
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $jsql="select count(*) from pedido where id_estado=5";
            $stmt0 =$dbh->prepare($jsql);
            $stmt0 ->execute();
            $total_filas=$stmt0->fetchColumn();
            if($total_filas==0){
                echo '{success:false}';
            }else{
                $sql ="select a.id_pedido,a.f_reg_ped,concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,
                        concat(a.direccion_inst,' ',a.num_domicilio,' ',a.mza_lte,' - ',c.desc_distrito,' - ',d.desc_ciudad) as direccion,
                        f.nom_servicio
                        from pedido a,cliente b, distrito c,ciudad d,zonal e,servicio f
                        where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad
                        and d.id_zonal=e.id_zonal and a.id_estado=5 and a.id_servicio=f.id_servicio
                        order by 2
                        limit $start,$limit ";
                
                $stmt1 =$dbh->prepare($sql);
                $stmt1->execute();
                while($row=$stmt1->fetchObject()){
                    $arr1[] = $row;
                }

                Echo '{success:true,tlt_rechazados:'.$total_filas.',lst_rechazados:'.json_encode($arr1).'}';
            }
		}catch (PDOException $e){
			echo 'SQL Query: ', $sql . '<br/>';
			echo 'Error: '   .$e->getMessage() . '<br />';
			echo 'Archivo: ' .$e->getFile() . '<br />';
			echo 'Linea: '   .$e->getLine() . '<br />';
		}
		break;
}
?>

