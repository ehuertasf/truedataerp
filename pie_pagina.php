<?php
/**
 * Funcion para mostrar el pie de pagina en todas las paginas de la web
 * @author Ricardo De la Torre
 *
 * @param int $margin_top
 * @return mixed
 */
function pie_pagina($margin_top){
    $hoy    =date("Y-m-d");
    $year   =substr($hoy,0,4)

?>

    <div id="center1">
            <table width="850" cellpadding="0" cellspacing="0" align="center" border="0" style="margin-top:<?=$margin_top;?>px;">
            <tr>
                    <td align="center">
                            <div style="color:#C3C3C3;  font-family: Tahoma, Verdana; font-size:11px">&nbsp;
                                <b>2009 - <?=$year?> - Desnetel</b>
                            </div>
                    </td>
            </tr>
            </table>
    </div>

<?php
}
?>