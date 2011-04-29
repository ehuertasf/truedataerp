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
                $f_registro =$_POST['txt_fecha'];
                $email      =$_POST['idtxt_email'];
                $manzana    =$_POST['idtxt_mza_inst_postal'];
                $piso       =$_POST['idtxt_piso'];

                if($email=='usuario@dominio.com')   $email  ='';
                if($manzana=='Mza/Lte...')          $manzana='';
                if($piso=='Piso...')                $piso   ='';


                $f_registro=substr($f_registro,6,4)."-".substr($f_registro,3,2)."-".substr($f_registro,0,2);
            
                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

                $sql = 'INSERT IGNORE INTO cliente (ap_paterno,ap_materno,nombre,id_tipo_doc,num_documento,telefono_casa,telefono_celular,
                    id_tipo_vivienda,sexo,profesion,empresa,cargo,id_tipo_relab,id_estado_civil,email,
                    direccion_postal,id_distrito,num_domicilio,mza_lte,conyuge,ref_familiar,oficina,piso,f_registro,id_vendedor,
                    id_tipo_cliente)
                    VALUES (:xap_paterno,:xap_materno,:xnombre,:xid_tipo_doc,:xnum_documento,:xtelefono_casa,:xtelefono_celular,
                    :xid_tipo_vivienda,:xsexo,:xprofesion,:xempresa,:xcargo,:xid_tipo_relab,:xid_estado_civil,:xemail,
                    :xdireccion_postal,:xid_distrito,:xnum_domicilio,:xmza_lte,:xconyuge,:xref_familiar,:xoficina,:xpiso,:xf_registro,:xid_vendedor,
                    :xidtipocliente)';

                $stmt1 = $dbh->prepare($sql);
                $stmt1->bindParam(':xap_paterno',strtoupper(utf8_encode(trim($_POST['idtxt_apellido_pa']))));
                $stmt1->bindParam(':xap_materno',strtoupper(utf8_encode(trim($_POST['idtxt_apellido_ma']))));
                $stmt1->bindParam(':xnombre',strtoupper(utf8_encode(trim($_POST['idtxt_nombres']))));
                $stmt1->bindParam(':xid_tipo_doc',$_POST['rb-tdoc']);
                $stmt1->bindParam(':xnum_documento',trim($_POST['idtxt_num_doc']));
                $stmt1->bindParam(':xtelefono_casa',trim($_POST['idtxt_telef_fijo']));
                $stmt1->bindParam(':xtelefono_celular',trim($_POST['idtxt_telef_movil']));
                $stmt1->bindParam(':xid_tipo_vivienda',$_POST['rb-tvivienda']);
                $stmt1->bindParam(':xsexo',$_POST['rb-tsexo']);
                $stmt1->bindParam(':xprofesion',strtoupper(utf8_encode(trim($_POST['idtxt_profesion']))));
                $stmt1->bindParam(':xempresa',strtoupper(utf8_encode(trim($_POST['idtxt_empresa']))));
                $stmt1->bindParam(':xcargo',strtoupper(utf8_encode(trim($_POST['idtxt_cargo']))));
                $stmt1->bindParam(':xid_tipo_relab',$_POST['rb-trlaboral']);
                $stmt1->bindParam(':xid_estado_civil',$_POST['rb-testadocivil']);
                $stmt1->bindParam(':xemail',$email);
                $stmt1->bindParam(':xdireccion_postal',strtoupper(utf8_encode(trim($_POST['idtxt_direccion_inst_postal']))));
                $stmt1->bindParam(':xid_distrito',$_POST['id_distrito']);
                $stmt1->bindParam(':xnum_domicilio',trim($_POST['idtxt_num_inst_postal']));
                $stmt1->bindParam(':xmza_lte',strtoupper(utf8_encode(trim($manzana))));
                $stmt1->bindParam(':xconyuge',strtoupper(utf8_encode(trim($_POST['idtxt_conyuge']))));
                $stmt1->bindParam(':xref_familiar',strtoupper(utf8_encode(trim($_POST['idtxt_nom_familiar']))));
                $stmt1->bindParam(':xoficina',strtoupper(utf8_encode(trim($_POST['idtxt_oficina']))));
                $stmt1->bindParam(':xpiso',strtoupper(utf8_encode(trim($piso))));
                $stmt1->bindParam(':xf_registro',$f_registro);
                $stmt1->bindParam(':xid_vendedor',$_POST['id_vendedor']);
                $stmt1->bindParam(':xidtipocliente',$_POST['id_tipo_cliente']);
                $stmt1->execute();

                $ultimo_id_insertado=$dbh->lastInsertId();

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

                    try{
                        $sql4='UPDATE cliente SET codcli=CONCAT("COD",:xult_id) WHERE id_cliente=:xult_id';
                        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                        $stmt4 = $dbh->prepare($sql4);
                        $stmt4->bindParam(':xult_id', $ultimo_id_insertado);
                        $stmt4->execute();
                       

                        echo json_encode(
                            array(
                            "success"   => true,
                            "codcli"    => "COD".$ultimo_id_insertado
                        ));
                    }catch (PDOException $e){
                        echo "{success: false, errors: { reason: 'Problemas al registrar los datos.' }}";
                        echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
                    }
                    
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
            echo "{success: false, errors: { reason: 'El Cliente ya se encuentra registrado.' }}";
			//echo 'Error: ' .$e->getMessage() . ' en el archivo: ' . $e->getFile() . ' en la linea: ' . $e->getLine() . '<br />';
	  	}

        break;
}

?>

