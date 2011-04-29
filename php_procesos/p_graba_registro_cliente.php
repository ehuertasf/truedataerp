<?php

ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);

$arr = array();
$accion = $_POST["action"];

switch ($accion) {
    case 'nuevo':
        //GRABAMOS LOS DATOS DE REGISTRO DEL CLIENTE Y SU MOVIMIENTO EN EL HISTORICO CLIENTE
	  	try{
        
			include_once("conexion.php");
			$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$dbh->beginTransaction();
			$sql = 'INSERT INTO cliente (ap_paterno,ap_materno,nombre,id_tipo_doc,num_documento,telefono_casa,telefono_celular,
                    id_tipo_vivienda,sexo,profesion,empresa,cargo,id_tipo_relab,id_estado_civil,email,
                    direccion_postal,id_distrito,num_domicilio,mza_lte)
					VALUES (:xap_paterno,:xap_materno,:xnombre,:xid_tipo_doc,:xnum_documento,:xtelefono_casa,:xtelefono_celular,
                    :xid_tipo_vivienda,:xsexo,:xprofesion,:xempresa,:xcargo,:xid_tipo_relab,:xid_estado_civil,:xemail,
                    :xdireccion_postal,:xid_distrito,:xnum_domicilio,:xmza_lte)';
			$stmt1 = $dbh->prepare($sql);
			$stmt1->execute(array(
				':xap_paterno'		=>strtoupper(utf8_encode(trim($_POST['idtxt_apellido_pa']))),
				':xap_materno'		=>strtoupper(utf8_encode(trim($_POST['idtxt_apellido_ma']))),
				':xnombre'          =>strtoupper(utf8_encode(trim($_POST['idtxt_nombres']))),
				':xid_tipo_doc'		=>$_POST['rb-tdoc'],
				':xnum_documento'	=>trim($_POST['idtxt_num_doc']),
				':xtelefono_casa'	=>trim($_POST['idtxt_telef_fijo']),
				':xtelefono_celular'=>trim($_POST['idtxt_telef_movil']),
				':xid_tipo_vivienda'=>$_POST['rb-tvivienda'],
				':xsexo'            =>$_POST['rb-tsexo'],
				':xprofesion'		=>strtoupper(utf8_encode(trim($_POST['idtxt_profesion']))),
				':xempresa'         =>strtoupper(utf8_encode(trim($_POST['idtxt_empresa']))),
				':xcargo'           =>strtoupper(utf8_encode(trim($_POST['idtxt_cargo']))),
				':xid_tipo_relab'	=>$_POST['rb-trlaboral'],
				':xid_estado_civil'	=>$_POST['rb-testadocivil'],				
				':xemail'           =>$_POST['idtxt_email'],
                ':xdireccion_postal'=>strtoupper(utf8_encode(trim($_POST['idtxt_direccion_inst_postal']))),
                ':xid_distrito'     =>$_POST['id_distrito'],
                ':xnum_domicilio'	=>trim($_POST['idtxt_num_inst_postal']),
                ':xmza_lte'         =>strtoupper(utf8_encode(trim($_POST['idtxt_mza_inst_postal'])))
	  		));
	  		$dbh->commit();

            //No relaciono la tabla cliente.id_cliente con la tabla historico_cliente.id_cliente para no tener que
            //usar Last_Insert_Id(). Lo que hago es insertar en la tabla historico cliente el tipo de documento y
            //el numero de documento en esta tabla ya que la combinacion de estos datos en la tabla cliente son unica.
            //De esta manera me aseguro que el cliente que se guarda en historico cliente sea el mismo que el que se
            //grabo en el primer query. Posterior a esto ya actualizo el campo id_cliente de historico_cliente.
            try{
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $dbh->beginTransaction();
                $sql2="INSERT INTO historico_cliente (id_user,id_accion,f_movimiento,id_tipo_doc,num_documento,modulo)
                        VALUES (:xiduser,1,now(),:xid_tipo_doc,:xnum_documento,'Registro Cliente')";
                $stmt2 = $dbh->prepare($sql2);
                $stmt2->execute(array(
                    ':xiduser'          =>$_POST['iduser'],
                    ':xid_tipo_doc'     =>$_POST['rb-tdoc'],
                    ':xnum_documento'	=>trim($_POST['idtxt_num_doc'])
                ));
                $dbh->commit();
                try{
                    $sql3='UPDATE historico_cliente a,cliente b SET a.id_cliente=b.id_cliente
                            WHERE a.id_tipo_doc=b.id_tipo_doc and a.num_documento=b.num_documento';
                    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $stmt3 = $dbh->prepare($sql3);
                    $stmt3->execute();
                    echo "{success: true}";
                }catch (PDOException $e){
                    echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                    //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                }
            }catch (PDOException $e){
                $dbh->rollBack();
                echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                //echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
            }
	  	}catch (PDOException $e){
	  		$dbh->rollBack();
            echo "{success: false, errors: { reason: 'El Cliente ya se encuentra registrado.' }}";
			//echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
	  	}

        break;
}

?>
