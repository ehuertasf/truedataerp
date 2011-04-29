<?php
/***********************************************************************************************************/
/* FUNCIONES EN PHP */
/***********************************************************************************************************/
// Funcion de Comparacion de Fechas
function cmp($a, $b)
{
   if ($a['fecha'] == $b['fecha']) {
       return 0;
   }
   return ($a['fecha'] > $b['fecha']) ? -1 : 1;
}

function limpia_cadena($value)
{
   $new_string = ereg_replace("[^A-Za-z0-9 \_\/\-\.]", "-", $value);
   return $new_string;
};

function restar_fechas_horas($fechamayor, $fechamenor)
{
	$date1=$fechamayor; //"2007-04-16 19:18";
	$date2=$fechamenor;  //"2007-04-15 13:05";
	
	$s = strtotime($date1)-strtotime($date2);
	$d = intval($s/86400);
	$s -= $d*86400;
	$h = intval($s/3600);
	$s -= $h*3600;
	$m = intval($s/60);
	$s -= $m*60;
		
	$dif= (($d*24)+$h).",".hrs.",".$m."min";
	$dif2= $d.$space." ".dias.",".$h." ".hrs.",".$m."min";
	return $dif2 ;
};
function suma_fechas($fecha,$ndias)
{
      if (preg_match("/[0-9]{1,2}\/[0-9]{1,2}\/([0-9][0-9]){1,2}/",$fecha))
              list($dia,$mes,$ano)=split("/", $fecha);
      if (preg_match("/[0-9]{1,2}-[0-9]{1,2}-([0-9][0-9]){1,2}/",$fecha))
              list($dia,$mes,$ano)=split("-",$fecha);
        $nueva = mktime(0,0,0, $mes,$dia,$ano) + $ndias * 24 * 60 * 60;
        $nuevafecha=date("d-m-Y",$nueva);
      return ($nuevafecha);
}

function resta_fechas($fecha,$ndias)
{
      if (preg_match("/[0-9]{1,2}\/[0-9]{1,2}\/([0-9][0-9]){1,2}/",$fecha))
              list($dia,$mes,$ano)=split("/", $fecha);
      if (preg_match("/[0-9]{1,2}-[0-9]{1,2}-([0-9][0-9]){1,2}/",$fecha))
              list($dia,$mes,$ano)=split("-",$fecha);
        $nueva = mktime(0,0,0, $mes,$dia,$ano) - $ndias * 24 * 60 * 60;
        $nuevafecha=date("d-m-Y",$nueva);
      return ($nuevafecha);
}

function cambio_fecha2($date)   // de fechas YYYYmmdd pasar a YYYY-mm-dd
{
        $year = substr($date, 0,4) ;
        $mes = substr($date, 4,2) ;
        $dia = substr($date,6,2) ;

        return $year."-".$mes."-".$dia;

};

function cambio_fecha($date)   // de fechas  YYYY-mm-dd H:i:s pasar a dd-mm-YYYY H:i:s 
{
	$tmp = split(" ",$date);

	$fecha = split("-",$tmp[0]);
	$hora = split(":",$tmp[1]);

	return $fecha[2]."-".$fecha[1]."-".$fecha[0]." ".$tmp[1]; 
};

function texto($operador,$nom_campo,$op_asignacion,$swcomillas,$valor)
{	
	$texto='';
	if (isset($valor)) {
	if((strtoupper($operador)=='AND' or strtoupper($operador)=='OR' or $operador=='') and !empty($nom_campo) and !empty($op_asignacion) and !empty($swcomillas) and !empty($valor))
	{
		if($operador!='') $texto .= (' '.$operador);
		else $texto .= '';
		if($nom_campo!='') $texto .= (' '.$nom_campo);
		else $texto .= '';
		if($op_asignacion!='') $texto .= $op_asignacion;
		else $texto .= '';
		switch ($swcomillas)
		{	case '-':	// Sin omillas
				$texto .=$valor;
				break;
			case '1': 	// Con comillas
				$texto .=('"'.$valor.'"'); 
				break;
			case '2': 	// Con parentesis
				$texto .=('('.$valor.')'); 
				break;
			case '3': 	// Con "%%" para LIKE
				$texto .=('"%'.$valor.'%"'); 
				break;
		}	
		return $texto;
	}else return $texto; 
	}else return $texto;
};
//Recibe cadena separados por comas 
//Devuelve cadena con comillas por cada item (Igual que funcion zonales)
function comillas($cadena){
	if (!empty($cadena) and $cadena!='undefined')	
	{	$arraycadena = explode(",", $cadena);
		$longitud= count($arraycadena);
		while (list($key, $val) = each($arraycadena))
		{	if ($key!=($longitud-1)) $nuevacadena .= "'".$val."',";
			else $nuevacadena .= "'".$val."'";
		}
		return $nuevacadena;
	}else return '';
};
function segmentos($segmento){
	if (!empty($segmento) and $segmento!='undefined')
	{	$sql_segmento=mysql_query("select codigo from tb_segmentos where seg_cli=".$segmento);
		if (!$sql_segmento)  die('Invalid sql_segmento: '.mysql_error());
		$indice = 1;
		$num_rows = mysql_num_rows($sql_segmento);
		while ($rowseg = @mysql_fetch_assoc($sql_segmento))
		{	if ($indice!=$num_rows) $nuevosegmento .= "'".trim($rowseg['codigo'])."',";
			else $nuevosegmento .= "'".trim($rowseg['codigo'])."'";
			$indice++;
		}
		return $nuevosegmento;
	}else return '';
};

function zonales($zonal){
	if (!empty($zonal) and $zonal!='undefined')	
	{	$arrayzonal = explode(",", $zonal);
		$longitud= count($arrayzonal);
		while (list($key, $val) = each($arrayzonal))
		{	if ($key!=($longitud-1)) $nuevazonal .= "'".$val."',";
			else $nuevazonal .= "'".$val."'";
		}
		return $nuevazonal;
	}else return '';
};



function parseToXML($htmlStr) 
{ $htmlStr=TRIM($htmlStr);

$xmlStr=str_replace('<','&lt;',$htmlStr);
$xmlStr=str_replace('>','&gt;',$xmlStr);
$xmlStr=str_replace('"','&quot;',$xmlStr);
$xmlStr=str_replace('�','&apos;',$xmlStr);
$xmlStr=str_replace('`','&apos;',$xmlStr);
$xmlStr=str_replace("'",'&apos;',$xmlStr);
$xmlStr=str_replace("�",'&#183;',$xmlStr);
$xmlStr=str_replace("'",'&apos;',$xmlStr);
$xmlStr=str_replace("'",'&apos;',$xmlStr);
$xmlStr=str_replace("-",'-',$xmlStr);
$xmlStr=str_replace("...",'...',$xmlStr);
$xmlStr=str_replace("..",'..',$xmlStr);
$xmlStr=str_replace("�",'&#209;',$xmlStr);
$xmlStr=str_replace("�",'&#241;',$xmlStr);
$xmlStr=str_replace("�",'o',$xmlStr);
$xmlStr=str_replace("&",'y',$xmlStr);
$xmlStr=str_replace("ñ",'n',$xmlStr);
$xmlStr=str_replace("Ñ",'N',$xmlStr);
$xmlStr=str_replace("¥",'N',$xmlStr);


/*
$xmlStr=str_replace("�",'&#192;',$xmlStr);
$xmlStr=str_replace("�",'&#193;',$xmlStr);
$xmlStr=str_replace("�",'&#200;',$xmlStr);
$xmlStr=str_replace("�",'&#201;',$xmlStr);
$xmlStr=str_replace("�",'&#204;',$xmlStr);
$xmlStr=str_replace("�",'&#205;',$xmlStr);
$xmlStr=str_replace("�",'&#210;',$xmlStr);
$xmlStr=str_replace("�",'&#211;',$xmlStr);
$xmlStr=str_replace("�",'&#217;',$xmlStr);
$xmlStr=str_replace("�",'&#218;',$xmlStr);
$xmlStr=str_replace("�",'&#220;',$xmlStr);
$xmlStr=str_replace("�",'&#223;',$xmlStr);
$xmlStr=str_replace("�",'&#224;',$xmlStr);
$xmlStr=str_replace("�",'&#225;',$xmlStr);
$xmlStr=str_replace("�",'&#228;',$xmlStr);
$xmlStr=str_replace("�",'&#231;',$xmlStr);
$xmlStr=str_replace("�",'&#233;',$xmlStr);
$xmlStr=str_replace("�",'&#233;',$xmlStr);
$xmlStr=str_replace("�",'&#235;',$xmlStr);
$xmlStr=str_replace("�",'&#236;',$xmlStr);
$xmlStr=str_replace("�",'&#237;',$xmlStr);
$xmlStr=str_replace("�",'&#242;',$xmlStr);
$xmlStr=str_replace("�",'&#243;',$xmlStr);
$xmlStr=str_replace("�",'&#246;',$xmlStr);
$xmlStr=str_replace("�",'&#249;',$xmlStr);
$xmlStr=str_replace("�",'&#250;',$xmlStr);
$xmlStr=str_replace("�",'&#251;',$xmlStr); 
$xmlStr=str_replace("&",'&#251;',$xmlStr); 
//$xmlStr=str_replace('�','&#209;',$xmlStr);
//$xmlStr=str_replace('&#209;','-',$xmlStr);
*/
return $xmlStr; 
};

?>