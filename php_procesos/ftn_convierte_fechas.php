<?php

function ftn_covierte_fechas_gmt($fecha){
    $j_mes=substr($fecha,4,3);
    switch($j_mes){
        case 'Jan':
            $mes='01';
            break;
        case 'Feb':
            $mes='02';
            break;
        case 'Mar':
            $mes='03';
            break;
        case 'Apr':
            $mes='04';
            break;
        case 'May':
            $mes='05';
            break;
        case 'Jun':
            $mes='06';
            break;
        case 'Jul':
            $mes='07';
            break;
        case 'Aug':
            $mes='08';
            break;
        case 'Oct':
            $mes='10';
            break;
        case 'Nov':
            $mes='11';
            break;
        case 'Dec':
            $mes='12';
            break;
    }

    $fecha=substr($fecha,11,4).'-'.$mes.'-'.substr($fecha,8,2);
    return $fecha;
}
?>
