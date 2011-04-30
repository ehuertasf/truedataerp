
<?php
/**
 * Retorna el key de google maps dinamicamente
 * @author Ernesto Hernandez
 * aryge s.a.c
 * 2009
 */



function getRealIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    }

    return $_SERVER['REMOTE_ADDR'];
}


$ip_real = $_SERVER['SERVER_NAME'];


$sqlquery = "SELECT `key` FROM keymap WHERE ip='$ip_real'";
$key = '';
try {
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $dbh->prepare($sqlquery);
    $stmt->execute();
    while ($row = $stmt->fetchObject()) {
        $key = $row->key;
    }
    if ($key !== '') {
        echo "<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=" . $key . "' type='text/javascript'></script>";
    } else {
        
    }

} catch (PDOException $e) {
    echo 'PDO Excepciones.  ';
    echo 'Error con la base de datos: <br />';
    echo 'SQL Query: ', $sqlquery;
    echo '<pre>';
    echo 'Error: ' . $e->getMessage() . '<br />';
    echo 'Archivo: ' . $e->getFile() . '<br />';
    echo 'Linea: ' . $e->getLine() . '<br />';
    echo '</pre>';
}

?>
