<html>
<head>
<!--            <script src='http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=ABQIAAAAOKHsmBIf-BuJfd4vssIwfRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSf79Ce9m2jj0pVXkXdWir1JWxuAg' type='text/javascript'></script>-->
            
    <?php
    include_once("conexion.php");
    include('../gmaps/keymap.php');
    ?>
            <meta http-equiv="content-type" content="text/html; charset=utf-8"/>


            <script type="text/javascript">
            //<![CDATA[

            var iconBlue = new GIcon(); 
            iconBlue.image = 'http://labs.google.com/ridefinder/images/mm_20_blue.png';
            iconBlue.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
            iconBlue.iconSize = new GSize(12, 20);
            iconBlue.shadowSize = new GSize(22, 20);
            iconBlue.iconAnchor = new GPoint(6, 20);
            iconBlue.infoWindowAnchor = new GPoint(5, 1);



            var customIcons = [];
            customIcons["cliente"] = iconBlue;


            function load(pedido) {

              if (GBrowserIsCompatible()) {
                var map = new GMap2(document.getElementById("map"));
                map.addControl(new GSmallMapControl());
                map.addControl(new GMapTypeControl());
//                map.setCenter(new GLatLng(47.614495, -122.341861), 13);

                GDownloadUrl("phpsqlajax_genxml.php?ped="+pedido, function(data) {
                  var xml = GXml.parse(data);
                  var markers = xml.documentElement.getElementsByTagName("marker");
                  for (var i = 0; i < markers.length; i++) {
                    var point = new GLatLng(parseFloat(markers[i].getAttribute("coord_x")),
                                            parseFloat(markers[i].getAttribute("coord_y")));
                    var marker = createMarker(point);
                    map.addOverlay(marker);
                  }
                });
              }
            }

            function createMarker(point) {
                var name="cliente";
              var marker = new GMarker(point, customIcons["cliente"]);
              var html = "<b>" + name + "</b> <br/>";
              GEvent.addListener(marker, 'click', function() {
                marker.openInfoWindowHtml(html);
              });
              return marker;
            }
            //]]>
          </script>

          </head>

        
	<style type='text/css'>
		H1.SaltoDePagina {PAGE-BREAK-AFTER: always}
		<!--

		.td3,.Estilo3,.columna1,.columna2,.columna3,.columna4,.columna5,.columna6,.columna7,.columna8{
			font-family: Tahoma, Verdana;
			border-style:  none;
			border-bottom-style: dotted;
			border-right-style: dotted;
			height:20px	}

		tr {font-size: 9px;}
		.td3 {}
		.td2 {font-size: 9px;
			border-style: none;
			border-top-style: inset;
			}
		.Estilo3 {
			font-size: 12px;
			border-style: none;
			border-bottom-style: dotted;}

		.columna1,.columna3,.columna5,.columna7 {
			text-align: left;
			background: #E5ECF9;
			font-weight: 600;
			text-indent: 3px;}



		.boton_imprimir{
			font-family: Verdana, Arial, Helvetica, sans-serif;
			font-size: 12px;
			font-weight: lighter;
			color: #000000;
			background: #87CEFA;
			border-width: 2px;
			height:25px;}
		-->
	</style>
	<script language="JavaScript">
		function imprimir(){
			window.print()
		}
	</script>
</head>

<?php

try{
    $iduser =$_GET["iduser"];
    $texto  =$_GET["ids"];
    $datos  =explode(",",$texto);
    $long   =count($datos);
    $fechaimp=date("Y-m-d G:i");    
    
    include_once("conexion.php");
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $sql="select a.id_pedido,a.f_reg_ped,concat(b.ap_paterno,' ',b.ap_materno,', ',b.nombre) as nombre,
        concat(a.direccion_inst,' ',a.num_domicilio,' ',a.mza_lte,' - ',c.desc_distrito,' - ',d.desc_ciudad) as direccion,
        concat(g.ap_paterno,' ',g.ap_materno,', ',g.nombres) as nom_tecnico,h.nom_servicio,a.cant_eq,
        a.f_prg_ped,i.desc_estado,a.observaciones,concat(j.ap_paterno,' ',j.ap_materno,', ',j.nombre) as vendedor,
        b.num_documento,b.telefono_casa,b.telefono_trabajo,b.telefono_celular
        from pedido a,cliente b, distrito c,ciudad d,zonal e,pedido_movimientos f,tecnico g,servicio h,pedido_estado i,vendedor j
        where a.id_cliente=b.id_cliente and a.id_distrito=c.id_distrito and c.id_ciudad=d.id_ciudad
        and d.id_zonal=e.id_zonal and a.id_pedido=f.id_pedido and a.id_servicio=h.id_servicio and a.id_estado=i.id_estado
        and a.id_vendedor=j.id_vendedor and a.id_estado =4 and f.id_estado =4
        and f.id_tecnico=g.id_tecnico and a.id_pedido  in ($texto)
        order by 2 ";

        $stmt0 =$dbh->prepare($sql);
        $stmt0->execute();

        $stmt1 =$dbh->prepare($sql);
        $stmt1->execute();
        
        $cant_filas=$stmt0->rowCount();
        $tecnico=''; $cant_tecnicos=0; $sw=1; $fila=0; $tecnico_old=''; $cadena='';
        while($row2=$stmt0->fetch(PDO::FETCH_ASSOC))
        {	$fila+=1;
            $tecnico=trim($row2['nom_tecnico']);
            $actuacion=trim($row2['id_pedido']);
            if ($sw==1)
            {	$tecnico_old=$tecnico;
                $sw=2;
                $cadena=$tecnico.'$$$'.$actuacion;
            }else{	
                if ($tecnico!=$tecnico_old)
                {	$actuacionxtecnico[]=$cadena;
                    $cadena=$tecnico.'$$$'.$actuacion;
                    $tecnico_old=$tecnico;
                }else $cadena.='|||'.$actuacion;
            }
            if ($fila==$cant_filas) $actuacionxtecnico[]=$cadena;
        }


        $tecnico=''; $cant_tecnicos=0; $sw=1; $fila=0; $tecnico_old=''; $item=0;
        while ($row = $stmt1->fetch(PDO::FETCH_ASSOC)) {
            $fila+=1;
            $tecnico=trim($row['nom_tecnico']);

            $item+=1;
            if ($sw==1)
            {	$tecnico_old=$tecnico;
                $sw=2;$cant_tecnicos+=1;
                $cant_averiasxtec=cant_averiasxtec($tecnico, $actuacionxtecnico);
                $nro_actuaciones = busca($tecnico, $actuacionxtecnico);
                cabecera_mapa($tecnico,$cant_averiasxtec,$fechadata,$fechaimp,$cant_tecnicos,$nro_actuaciones,$datos[0],$datos[1]);
                
            }
            
            if ($tecnico!=$tecnico_old)
            {	$item=1;
                $tecnico_old=$tecnico;
                $sw=2;$cant_tecnicos += 1;
                $cant_averiasxtec=cant_averiasxtec($tecnico, $actuacionxtecnico);
                echo "</td></tr></table>";
                echo "<H1 class=SaltoDePagina> </H1>"; 
                $nro_actuaciones = busca($tecnico, $actuacionxtecnico);
                cabecera_mapa($tecnico,$cant_averiasxtec,$fechadata,$fechaimp,$cant_tecnicos,$nro_actuaciones,$datos[0],$datos[1]);
            }

        ?>
            <table border=1 cellpadding=0 cellspacing=0 width="680" STYLE="border-style: inset">
            <tr>
                <td rowspan=9 align='center' height=120 width=13 STYLE="border-right-style:dotted"><?=$item?></td>
                <td class="columna1"    width="100">Nro Pedido</td>
                <td class="td3"         width="100">&nbsp;<?=$row['id_pedido']?></td>
                <td class="columna1"    width="100">RUC / DNI</td>
                <td class="columna2"    width="80">&nbsp;<?=$row['num_documento']?></td>
                <td class="columna5"    width="90">Fecha Registro</td>
                <td class="td3"         width="100">&nbsp;<?=$row['f_reg_ped']?></td>
            </tr>
            <tr>
                <td class="columna7">Cliente</td>
                <td class="td3" colspan="7">&nbsp;<?=$row['nombre']?></td>
            </tr>
            <tr>
                <td class="columna1">Direcci&oacute;n</td>
                <td class="td3" colspan=5>&nbsp;<?=$row['direccion']?></td>
            </tr>
            <tr>
                <td class="columna1">Telef. Casa</td>
                <td class="td3" >&nbsp;<?=$row['telefono_casa']?></td>
                <td class="columna1">Telef. Trabajo</td>
                <td class="td3">&nbsp;<?=$row['telefono_trabajo']?></td>
                <td class="columna1">Telef. Celular</td>
                <td class="td3">&nbsp;<?=$row['telefono_celular']?></td>
            </tr>
            <tr>
                <td class="columna7">T&eacute;cnico</td>
                <td class="columna8" colspan="6">&nbsp;<?=$row['nom_tecnico']?></td>
            </tr>
            <tr>
                <td class="columna1">Servicio Contratado</td>
                <td class="td3" colspan=7>&nbsp;<?=$row['nom_servicio']?></td>
            </tr>
            <tr>
                <td class="columna1">Cant. Equipos</td>
                <td class="columna2" colspan="3">&nbsp;<?=$row['cant_eq']?></td>
                <td class="columna5">Fecha Programada</td>
                <td class="td3" colspan="2">&nbsp;<?=$row['f_prg_ped']?></td>
            </tr>
            <tr>
                <td class="columna1">Observaciones</td>
                <td class="td3" colspan="6">&nbsp;<?=$row['observaciones']?></td>
            </tr>
            <tr>
                <td class="columna3">Vendedor</td>
                <td class="td3" colspan="6">&nbsp;<?=$row['vendedor']?></td>
            </tr>
            </table>
            <br>
            </body>
        <?php
            if ($fila==$cant_filas)
            { 	echo "</td></tr></table><br>";

                echo "<table border='0'>";
                echo "<tr><td border='0' width=580 align='center' STYLE='border-style: none'>
                            <div id='noprint'><input type='button' name='imprimir' value='Imprimir' class='boton_imprimir' onclick='imprimir()'></div>
                        </td></tr>";
                echo "</table>";
            }
        
            $item++;
        }

}catch (PDOException $e){
    echo 'SQL Query: ', $sql . '<br/>';
    echo 'Error: '   .$e->getMessage() . '<br />';
    echo 'Archivo: ' .$e->getFile() . '<br />';
    echo 'Linea: '   .$e->getLine() . '<br />';
}

//Funcion que devuelve los Nro_actuaciones seleccionadas para un tecnico especifico
function busca($tecnico, $arraytecnicos)
{	$len=count($arraytecnicos);
	for($i=0;$i<$len;$i++)
	{	$valor = explode('$$$',$arraytecnicos[$i]);
		if ($valor[0]==$tecnico) return $valor[1];
		unset($valor);
	}
	return 0;
}

function cant_averiasxtec($tecnico, $arraytecnicos)
{	$len=count($arraytecnicos);
	for($i=0;$i<$len;$i++)
	{	$valor = explode('$$$',$arraytecnicos[$i]);
		if ($valor[0]==$tecnico){
			$valor2 = explode('|||',$valor[1]);
			return count($valor2);
		}
		unset($valor);
	}
	return 0;
}

function cabecera_mapa($tecnico,$cant_averiasxtec,$fechadata,$fechaimp,$cant_tecnicos,$nro_actuaciones,$swmdf,$swarmario){
    ?>
        <body onload='load(13)' onunload='GUnload()'>
        <div id='map' style='width: 500px; height: 300px'></div>
        
        
        <table width='600' border='1'>
			<tr><td STYLE='border-style: none'>
					<table width='680' border='1' style='border-style:none' cellpadding=0 cellspacing=0>
						<tr><td width='596' colspan='3' align='center' bgcolor='#E5ECF9' class='Estilo3' style='border-style: none'>Tecnico: <b>".$tecnico."</b></td></tr>
						<tr><td align='center' bgcolor='#E5ECF9' class='Estilo3' style='border-style: inset'>Nro. Ordenes: ".$cant_averiasxtec."</td>
							<td align='center' bgcolor='#E5ECF9' class='Estilo3' style='border-style: inset'>F/H Impresi&oacute;n: "<?=$fechaimp?>."</td>
							<td align='center' bgcolor='#E5ECF9' class='Estilo3' style='border-style: inset'>&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>

			<tr align='center'>
				<td class='td2'><br>
<?php
}


function obtener_valores_mapa($pedido){
    $sql="select b.coord_x,b.coord_y from pedido a,geo_comercial b where a.id_pedido=b.id_pedido and a.pedido=".$pedido;
    
}

//function markers_mapa($pedido){

?>    

<?php

//}
?>
</body>
</html>