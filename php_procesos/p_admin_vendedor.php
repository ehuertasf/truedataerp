<?php
/**
 * Administracion de vendedores
 * @author Ricardo De la Torre
 * @version 1.0
 *
 * Este script recibe los datos de @see admin_vendedor.js
 */

ini_set("display_errors", "Off");
error_reporting(E_ALL ^ E_NOTICE);

header("Content-type: application/json; charset=UTF-8");
header("Cache-control: No-Cache");
header("Pragma: No-Cache");

$x = (isset($_POST['x']) ? $_POST['x'] : $_GET['x']);

$arr = array();
switch ($x){
        case 0: //Lista Vendedores
            include_once("conexion.php");
            $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $query = "SELECT CONCAT('CV0',id_vendedor) AS codigo,ap_paterno,ap_materno,nombre,dni,fec_ingreso,direccion,telefono_fijo,
                    telefono_celular,IF(estado=1,'Activo','Inactivo') AS estado,estado AS est,id_vendedor AS id
                    FROM vendedor ORDER BY 1;";

            $stmt =$dbh->prepare($query);
            $stmt->execute();
            while($row=$stmt->fetchObject()){
                $arr[] = $row;
            }

            $jsonresult = json_encode($arr);
            echo '({"listadoven":'.$jsonresult.'})';

            break;

        case 4: //Graba Vendedor
            include_once("conexion.php");
            $nomve	= $_POST['nombre'];
            $apepa	= $_POST['apellido_pa'];
            $apema	= $_POST['apellido_ma'];
            $celu1	= $_POST['celular1'];
            $celu2	= $_POST['celular2'];
            $dni	= $_POST['dni'];
            $direc	= $_POST['iddireccion'];
            $accion	= $_POST['accion'];
            $estado	= $_POST['rb-tvendedor'];

            if($accion==1){ //Nuevo
                try {
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $dbh->beginTransaction();
                    $sql = "INSERT INTO vendedor(ap_paterno,ap_materno,nombre,dni,fec_ingreso,direccion,telefono_fijo,telefono_celular,estado)
                                    values(:ape_pa,:ape_ma,:nombre,:dni,CURDATE(),:direccion,:telefono1,:telefono2,:estado)" ;
                    $stmt=$dbh->prepare($sql);
                    $stmt->execute(array(
                        ':ape_pa'       => ucfirst(trim($apepa)),
                        ':ape_ma'       => ucfirst(trim($apema)),
                        ':nombre'       => ucfirst(trim($nomve)),
                        ':dni'          => trim($dni),
                        ':direccion'    => trim($direc),
                        ':telefono1'    => trim($celu1),
                        ':telefono2'    => trim($celu2),
                        ':estado'       => $estado
                    ));

                    $dbh->commit();
                    echo "{success: true}";
                } catch (Exception $e) {
                    $dbh->rollBack();
                    //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                    echo "{success: false}";
                }

            }else if($accion==2){   //Modificar
                try{
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

                    $sql="UPDATE vendedor SET ap_paterno=:xap_paterno,ap_materno=:xap_materno,nombre=:xnombre,
                        dni=:xdni,direccion=:xdireccion,telefono_fijo=:xcelular1,telefono_celular=:xcelular2,
                        estado=:xestado WHERE id_vendedor=:xid;";
                    $stmt = $dbh->prepare($sql);
                    $stmt->bindParam(':xid',$_POST["id"]);
                    $stmt->bindParam(':xap_paterno',ucfirst(trim($apepa)));
                    $stmt->bindParam(':xap_materno',ucfirst(trim($apema)));
                    $stmt->bindParam(':xnombre',ucfirst(trim($nomve)));
                    $stmt->bindParam(':xdni',trim($dni));
                    $stmt->bindParam(':xdireccion',trim($direc));
                    $stmt->bindParam(':xcelular1',trim($celu1));
                    $stmt->bindParam(':xcelular2',trim($celu2));
                    $stmt->bindParam(':xestado',$estado);
                    $stmt->execute();
                    
                    echo "{success: true}";

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
