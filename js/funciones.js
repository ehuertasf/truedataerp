function GoEnter(e,pagina,iddiv)
{ 
	try{
	var characterCode;
	if(e && e.which)
	{ 
		e = e
		characterCode = e.which 
	}
	else
	{
		e = event
		characterCode = e.keyCode 
	}
	if(characterCode == 13)
	{ 
		busca_producto(pagina,iddiv);
		return false
	}
	else
	{
		return true
	}
	}catch (err){
		busca_producto(pagina,iddiv);
		//vacio
	}

}

function busca_producto(pagina,iddiv){
	
	new Ajax.Updater(iddiv,pagina,{
			parameters: {buscar: $F('input1')}
		}
	)
}


function centrar() { 
	iz=(screen.width-document.body.clientWidth) / 2; 
	de=(screen.height-document.body.clientHeight) / 2; 
	moveTo(iz,de); 
} 

function trim(cadena)
{	if (cadena != '' && cadena != null) {
		for (i = 0; i < cadena.length;) {
			if (cadena.charAt(i) == " ") 
				cadena = cadena.substring(i + 1, cadena.length);
			else 
				break;
		}
		
		for (i = cadena.length - 1; i >= 0; i = cadena.length - 1) {
			if (cadena.charAt(i) == " ") 
				cadena = cadena.substring(0, i);
			else 
				break;
		}
	}
	return cadena;
}

function BuscarenArray(lista, valor){
var ind, pos;
for(ind=0; ind<lista.length; ind++)
{       if (lista[ind] == valor)
        break;
}
pos = (ind < lista.length)? ind : -1;
return (pos);
}

function nuevoAjax()
{ 
	var xmlhttp=false; 
	try 
	{ xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); }
	catch(e)
	{	try
		{ xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); } 
		catch(E) { xmlhttp=false; }
	}
	if (!xmlhttp && typeof XMLHttpRequest!="undefined") { xmlhttp=new XMLHttpRequest(); } 
	return xmlhttp; 
}

function consulta_stock(idproducto){
	var retorno=0;
	var ajax=nuevoAjax();
	ajax.open("POST", "query.php?", false);
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.onreadystatechange=function()
		{	if (ajax.readyState==4)
			{	if(!ajax.responseText) { alert('Servidor Respondio vacio:_'+ajax.responseText+'_');}
				else retorno= parseFloat(ajax.responseText);
				
			}
		}
	ajax.send("n=8&idproducto="+idproducto);
	return retorno;
}
