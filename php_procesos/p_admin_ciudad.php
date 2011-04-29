<?php
/**
 * Administracion de ciudades
 * @author Ricardo De la Torre
 * @version 1.0
 *
 * Este script recibe los datos de @see admin_ciudad.js
 */

ini_set("display_errors", "Off");
error_reporting(E_ALL ^ E_NOTICE);

header("Content-type: application/json; charset=UTF-8");
header("Cache-control: No-Cache");
header("Pragma: No-Cache");

$x = (isset($_POST['x']) ? $_POST['x'] : $_GET['x']);

$arr = array();
switch ($x){
        case 0: //Lista Ciudades
            include_once("conexion.php");
            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $query = "SELECT desc_ciudad,id_zonal,IF(estado=1,'Activo','Inactivo') AS estado,estado AS est,id_ciudad AS id
                    FROM ciudad ORDER BY 1;";

            $stmt =$dbh->prepare($query);
            $stmt->execute();
            while($row=$stmt->fetchObject()){
                $arr[] = $row;
            }

            $jsonresult = json_encode($arr);
            echo '({"listadociu":'.$jsonresult.'})';

            break;

        case 4: //Graba Ciudad
            include_once("conexion.php");
            $desc	= $_POST['desc'];

            if($_POST["activo"]=='true') $estado=1;
            if($_POST["inactivo"]=='true') $estado=0;

            if($accion==1){ //Nuevo
                try {
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $dbh->beginTransaction();
                    $sql = "INSERT INTO ciudad(desc_ciudad,id_zonal,estado)
                                    values(:desc,11,:estado)" ;
                    $stmt=$dbh->prepare($sql);
                    $stmt->execute(array(
                        ':desc'     => strtoupper(trim($desc)),
                        ':estado'   => $estado
                    ));
                    $n=$dbh->lastInsertId();
                    $dbh->commit();
                    if($n==0) {
                        print 2;
                    }else{
                        print 1;
                    }
                } catch (Exception $e) {
                    $dbh->rollBack();
                    //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';

                }

            }else if($accion==2){   //Modificar
                try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

                    $sql="UPDATE ciudad SET desc_ciudad=:xdesc_ciudad,estado=:xestado WHERE id_ciudad=:xid;";
                    $stmt = $dbh->prepare($sql);
                    $stmt->bindParam(':xid',$_POST["id"]);
                    $stmt->bindParam(':xdesc_ciudad',strtoupper(trim($desc)));
                    $stmt->bindParam(':xestado',$estado);
                    $stmt->execute();

                    print 3;

                }catch (PDOException $e){
                    //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                    echo "{success: false}";
                }


            }
            break;

}
?>
