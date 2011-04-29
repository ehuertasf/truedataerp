
<?php
include("php_procesos/conexion.php");
//echo 'IPSERVER'.$_SERVER['SERVER_NAME'];return;
      function getRealIP() {
          if (!empty($_SERVER['HTTP_CLIENT_IP']))
              {//echo 'HTTP_CLIENT_IP='.$_SERVER['HTTP_CLIENT_IP'];
return $_SERVER['HTTP_CLIENT_IP'];
}
          if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
              {//echo 'HTTP_X_FORWARDED_FOR='.$_SERVER['HTTP_X_FORWARDED_FOR'];
return $_SERVER['HTTP_X_FORWARDED_FOR'];
}
                //echo 'REMOTE_ADDR='.$_SERVER['REMOTE_ADDR'];
return $_SERVER['REMOTE_ADDR'];
      }
//$ip_real=trim(getRealIP());
$ip_real=$_SERVER['SERVER_NAME'];
//echo $ip_real;

$sqlquery= "SELECT `key` FROM keymap WHERE ip='$ip_real'";
$key='';
try{
                                $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                                $stmt=$dbh->prepare($sqlquery);
                                $stmt->execute();
                                while($row=$stmt->fetchObject()){
                                        $key = $row->key;
                                }
                                if ($key!=='')
                                {
                                echo "<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=".$key."' type='text/javascript'></script>";
                                }else {

                                }
                                //echo '{"results":'.json_encode($arr).'}';
                        }catch (PDOException $e){
                                echo 'PDO Excepciones.  ';
                                echo 'Error con la base de datos: <br />';
                                echo 'SQL Query: ', $sqlquery;
                                echo '<pre>';
                                echo 'Error: ' .$e->getMessage() . '<br />';
                                echo 'Archivo: ' . $e->getFile() . '<br />';
                                echo 'Linea: ' . $e->getLine() . '<br />';
                                echo '</pre>';
                        }
/*



<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=ABQIAAAATU_QaAK6ctarcM0DWuBfxRS-DBsCO0Ah7I84wSNzR5kwUWS6PRTfhQTbPB13DO2AgZk3L6B047UGqQ" type="text/javascript"></script>
*/
?>
