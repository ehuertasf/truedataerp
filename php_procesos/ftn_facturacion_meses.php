<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

    $hoy=date("Y-m-d");
    $year=substr($hoy,0,4);
    $month=substr($hoy,5,2);
    $dia=substr($hoy,8,2);

    switch($month){
        case '01':
            $f_vencimiento=$year.'-01-31';
            $ult_dia_pago=31;       //31 de Enero
            $ult_dia_facturado=31;  //04 de Marzo
            $next_month='02';
            $cant_dias_next_month=30;
            break;
        case '02':
            $f_vencimiento=$year.'-03-04';
            $ult_dia_pago=04;       //04 de Marzo
            $ult_dia_facturado=04;  //04 de Marzo
            $next_month='03';
            $cant_dias_next_month=31;
            break;
        case '03':
            $f_vencimiento=$year.'-03-31';
            $ult_dia_pago=31;       //31 de Marzo
            $ult_dia_facturado=30;  //30 de Abril
            $cant_dias_next_month=30;
            $next_month='04';
            break;
        case '04':
            $f_vencimiento=$year.'-04-30';
            $ult_dia_pago=30;       //30 de Abril
            $ult_dia_facturado=31;  //31 de Mayo
            $next_month='05';
            $cant_dias_next_month=31;
            break;
        case '05':
            $f_vencimiento=$year.'-05-31';
            $ult_dia_pago=31;       //31 de Mayo
            $ult_dia_facturado=30;  //30 de Junio
            $next_month='06';
            $cant_dias_next_month=30;
            break;
        case '06':
            $f_vencimiento=$year.'-06-30';
            $ult_dia_pago=30;       //30 de Junio
            $ult_dia_facturado=31;  //31 de Julio
            $next_month='07';
            $cant_dias_next_month=31;
            break;
        case '07':
            $f_vencimiento=$year.'-07-31';
            $ult_dia_pago=31;       //31 de Julio
            $ult_dia_facturado=31;  //31 de Agosto
            $next_month='08';
            $cant_dias_next_month=31;
            break;
        case '08':
            $f_vencimiento=$year.'-08-31';
            $ult_dia_pago=31;       //31 de Agosto
            $ult_dia_facturado=30;  //30 de Setiembre
            $next_month='09';
            $cant_dias_next_month=30;
            break;
        case '09':
            $f_vencimiento=$year.'-09-30';
            $ult_dia_pago=30;       //30 de Setiembre
            $ult_dia_facturado=31;  //30 de Octubre
            $next_month='10';
            $cant_dias_next_month=31;
            break;
        case '10':
            $f_vencimiento=$year.'-10-31';
            $ult_dia_pago=31;       //30 de Octubre
            $ult_dia_facturado=30;  //30 de Noviembre
            $next_month='11';
            $cant_dias_next_month=30;
            break;
        case '11':
            $f_vencimiento=$year.'-11-30';
            $ult_dia_pago=30;       //30 de Noviembre
            $ult_dia_facturado=31;  //31 de Diciembre
            $next_month='12';
            $cant_dias_next_month=31;
            break;
        case '12':
            $f_vencimiento=$year.'-12-31';
            $ult_dia_pago=31;       //31 de Diciembre
            $ult_dia_facturado=31;  //31 de Enero
            $next_month='01';
            $cant_dias_next_month=31;
            break;
    }

?>
