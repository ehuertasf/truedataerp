<?php
/**
 * Administracion de distritos
 * @author Ricardo De la Torre
 * @version 1.0
 *
 * Este script recibe los datos de @see admin_distrito.js
 */

ini_set("display_errors", "Off");
error_reporting(E_ALL ^ E_NOTICE);

header("Content-type: application/json; charset=UTF-8");
header("Cache-control: No-Cache");
header("Pragma: No-Cache");

$x = (isset($_POST['x']) ? $_POST['x'] : $_GET['x']);

$arr = array();
switch ($x){
        case 0: //Lista Distritos
            include_once("conexion.php");
            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $query = "SELECT a.desc_distrito,a.id_ciudad,IF(a.estado=1,'Activo','Inactivo') AS estado,a.estado AS est,a.id_distrito AS id,b.desc_ciudad
                        FROM distrito a,ciudad b WHERE a.id_ciudad=b.id_ciudad ORDER BY 1;";

            $stmt =$dbh->prepare($query);
            $stmt->execute();
            while($row=$stmt->fetchObject()){
                $arr[] = $row;
            }

            $jsonresult = json_encode($arr);
            echo '({"listadodis":'.$jsonresult.'})';

            break;

        case 4: //Graba Distrito
            include_once("conexion.php");
            $desc	= $_POST['desc'];
            $idci	= $_POST['idciudad'];

            if($_POST["activo"]=='true') $estado=1;
            if($_POST["inactivo"]=='true') $estado=0;

            if($accion==1){ //Nuevo
                try {
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $dbh->beginTransaction();
                    $sql = "INSERT INTO distrito(desc_distrito,id_ciudad,estado)
                                    values(:desc,:ciu,:estado)" ;
                    $stmt=$dbh->prepare($sql);
                    $stmt->execute(array(
                        ':desc'     => strtoupper(trim($desc)),
                        ':ciu'      => $idci,
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

                    $sql="UPDATE distrito SET desc_distrito=:xdesc_ciudad,estado=:xestado,id_ciudad=:ciu WHERE id_distrito=:xid;";
                    $stmt = $dbh->prepare($sql);
                    $stmt->bindParam(':xid',$_POST["id"]);
                    $stmt->bindParam(':xdesc_ciudad',strtoupper(trim($desc)));
                    $stmt->bindParam(':ciu',$idci);
                    $stmt->bindParam(':xestado',$estado);
                    $stmt->execute();

                    print 3;

                }catch (PDOException $e){
                    //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                    echo "{success: false}";
                }


            }
            break;

        case 5: //Consulta Vendedor
            include_once("conexion.php");
            $id	= $_POST['id'];
            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $query = "SELECT CONCAT('CV0',id_vendedor) AS codigo,ap_paterno,ap_materno,nombre,dni,fec_ingreso,direccion,telefono_fijo,
                    telefono_celular,IF(estado=1,'Activo','Inactivo') AS estado,estado AS est,id_vendedor AS id
                    FROM vendedor WHERE id_vendedor=:id;";

            $stmt =$dbh->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $nombre     =utf8_decode($row['nombre']);
                $ape_pa     =utf8_decode($row['ap_paterno']);
                $ape_ma     =utf8_decode($row['ap_materno']);
                $direcc     =utf8_decode($row['direccion']);
                $dni        =$row['dni'];
                $codigo     =$row['codigo'];
                $id         =$row['id'];
                $estado     =$row['estado'];
                $est        =$row['est'];
                $celul1     =$row['telefono_fijo'];
                $celul2     =$row['telefono_celular'];
            }

            $jsonresult = json_encode($arr);

            $response = array(
                    'nombre'        =>$nombre,
                    'apellido_pa'   =>$ape_pa,
                    'apellido_ma'   =>$ape_ma,
                    'direccion'     =>$direcc,
                    'dni'           =>$dni,
                    'codigo'        =>$codigo,
                    'id'            =>$id,
                    'estado'        =>$estado,
                    'est'           =>$est,
                    'celular1'      =>$celul1,
                    'celular2'      =>$celul2
                );
            $json_response = json_encode($response);
            echo $json_response;

            break;

}
?>
