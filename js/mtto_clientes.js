
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
    Ext.QuickTips.init();
	var btn_agregar = new Ext.Button({
        text	:'Agregar',
        id		:'btn1',
        width	:150,
        renderTo:'btn_agregar',
        handler	:agrega_cliente,
		iconCls	:'agregar'
	}); 

	var btn_Buscar = new Ext.Button({
        text	:'&nbsp;&nbsp;Buscar&nbsp;',
        id		:'btn2',
        width	:150,
        renderTo:'btn_buscar',
        handler	:mostrar_buscador,
		iconCls	:'search'	
	});	
	
	var btn_mostrar = new Ext.Button({
        text	:'Mostrar&nbsp;',
        id		:'btn3',
        width	:150,
        renderTo:'btn_mostrar',
        handler	:mostrar_todos,
		iconCls	:'mostrar'	
	});	
	
	
			
});

function GoEnter(e,iddiv)
{ 
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
		new Ajax.Request('p_busca_cliente.php', {
			method: 'post',
			parameters:{
				n:2,
				buscar:$F('buscar')
			},
		
			onSuccess: function(transport) {
				$('contenido').innerHTML=transport.responseText;
			}
		});
		//return false 
	}
	else
	{
		return true 
	}

}

function carga(){
	new Ajax.Request('p_busca_cliente.php', {
		method: 'post',
		parameters:{
			n: 1		
		},
	
		onSuccess: function(transport) {
			$('contenido').innerHTML=transport.responseText;
		}
	});
}

function mostrar_buscador(){
    new Ajax.Updater('contenido','p_ftn_cliente.php',{
      parameters: {
        caso:       1  
      }
    });	
    $('actuacion').innerHTML="";
}

function buscador(){
	new Ajax.Request('p_busca_cliente.php', {
		method: 'post',
		parameters:{
			n:2,
			buscar:$F('buscar')
		},
	
		onSuccess: function(transport) {
			$('contenido').innerHTML=transport.responseText;
			
		}
	});
}		



function modificar_cliente(idcliente){
	
	new Ajax.Request('p_mtto_cliente.php', {
		method: 'post',
		parameters:{
			n:1,
			idcliente:idcliente
		},
	
		onSuccess: function(transport) {
			$('actuacion').innerHTML=transport.responseText;
			
			var btn_modficacion = new Ext.Button({
		        text	:'Grabar',
		        id		:'btn4',
		        width	:150,
		        renderTo:'btn_graba_modificacion',
		        handler	:grabar_modificaciones,
				iconCls	:'check'	
			});					
		}
	});
}

function grabar_modificaciones(){
	Ext.Msg.confirm('ALERTA!','Realmente desea modificar los datos del cliente?',function(btn,text){
		try{
	    	if(btn=='yes'){
				new Ajax.Request('p_mtto_clientes.php', {
					method: 'post',
					parameters:{
						tarea		:'modificar',
						idcliente	:$F('id_pr'),
						cod_cli		:$F('codigo'),
						nombre		:$F('nombre'),
						dpto		:$F('departamento'),
						ciudad		:$F('ciudad'),
						distrito	:$F('distrito'),
						ruc			:$F('ruc'),
						dni			:$F('dni'),
						email		:$F('email'),
						direccion	:$F('direccion1'),
						direccion2	:$F('direccion2'),
						direccion3	:$F('direccion3'),
						direccion4	:$F('direccion4'),
						telef1		:$F('telefono1'),
						telef2		:$F('telefono2'),
						contacto	:$F('contacto'),
						observaciones		:$F('observaciones'),
						idusuario_logeado	:$F('idusuario')					
					},
				
					onSuccess: function(transport) {
						if(transport.responseText==1){
							$('mensajes').innerHTML="";
							new Ajax.Request('p_busca_cliente.php', {
								method: 'post',
								parameters:{
									n:2,
									buscar:$F('nombre')
								},
							
								onSuccess: function(transport) {
									$('contenido').innerHTML=transport.responseText;
									
								}
							});			
							$('mensajes').innerHTML="";	
							$('actuacion').innerHTML="Registro actualizado";
						}else if(transport.responseText==4){
							$('mensajes').innerHTML="<b>Verifique el c&oacute;digo del cliente no puede contener caracteres extra&ntilde;os ni espacios en blanco</b><br><br>";
						}else if(transport.responseText==5){
							$('mensajes').innerHTML="<b>No puede usar (,)  como signo decimal. En su lugar use el (.)</b><br><br>";
						}else if(transport.responseText==6){
							$('mensajes').innerHTML="<b>Debe ingresar como minimo la direcci&oacute;n 1 y no puede contener caracteres extra&ntilde;os.</b><br><br>";
						}else if(transport.responseText==7 || transport.responseText==8 || transport.responseText==9){
							$('mensajes').innerHTML="<b>No puede ingresar caracteres extra&ntilde;os.</b><br><br>";
						}else if(transport.responseText==10){
							$('mensajes').innerHTML="<b>La direcci&oacute;n de E-mail no es valida.</b><br><br>";
						}
						
					}
	    	
				});
		
	    	}
		}catch(err){
			Ext.MessageBox.alert('Aviso','Debe seleccionar el Departamento, Ciudad y Distrito');
		}
	});
}

function eliminar_cliente(idcliente){
	
	Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el producto?',function(btn,text){
    	if(btn=='yes'){
			new Ajax.Request('p_mtto_clientes.php', {
				method: 'post',
				parameters:{
					tarea		:'borrar',
					idcliente	:idcliente,
					idusuario_logeado	:$F('idusuario')
				},
			
				onSuccess: function(transport) {
					if(transport.responseText==1){
						$('contenido').innerHTML="";		
						$('actuacion').innerHTML="Registro eliminado";
					}else if(transport.responseText==3){
						$('contenido').innerHTML="";		
						$('actuacion').innerHTML="<b>Este registro no puede ser eliminado por tener movimientos hist&oacute;ricos</b>";
						
					}
				}
			});
    	}
	});
	
}

function mostrar_todos(){
	$('actuacion').innerHTML="";
	new Ajax.Request('p_busca_cliente.php', {
		method: 'post',
		parameters:{
			n:1
		},
	
		onSuccess: function(transport) {
			$('contenido').innerHTML=transport.responseText;
			
		}
	});
}

function agrega_cliente(){
	$('actuacion').innerHTML="";
	new Ajax.Request('p_busca_cliente.php', {
		method: 'post',
		parameters:{
			n:3
		},
	
		onSuccess: function(transport) {
			//var scs=transport.responseText.extractScript();
			//scs.evalScript();
			$('contenido').innerHTML=transport.responseText;
			
			var btn_nuevo = new Ext.Button({
		        text	:'Grabar',
		        id		:'btn6',
		        width	:150,
		        renderTo:'btn_graba_nuevo',
		        handler	:grabar_nuevo,
				iconCls	:'check'	
			});					
		}
	});
}

function grabar_nuevo(){
	Ext.Msg.confirm('ALERTA!','Desea grabar los datos?',function(btn,text){
		try{
	    	if(btn=='yes'){
				new Ajax.Request('p_mtto_clientes.php', {
					method: 'post',
					parameters:{
						tarea		:'nuevo',
						cod_cli		:$F('codigo'),
						nombre		:$F('nombre'),
						dpto		:$F('departamento'),
						ciudad		:$F('ciudad'),
						distrito	:$F('distrito'),
						ruc			:$F('ruc'),
						dni			:$F('dni'),
						email		:$F('email'),
						direccion	:$F('direccion1'),
						direccion2	:$F('direccion2'),
						direccion3	:$F('direccion3'),
						direccion4	:$F('direccion4'),
						telef1		:$F('telefono1'),
						telef2		:$F('telefono2'),
						contacto	:$F('contacto'),
						observaciones		:$F('observaciones'),
						idusuario_logeado	:$F('idusuario')				
					},
				
					onSuccess: function(transport) {
						if(transport.responseText==1){
							new Ajax.Request('p_busca_cliente.php', {
								method: 'post',
								parameters:{
									n:2,
									buscar:$F('codigo')
								},
							
								onSuccess: function(transport) {
									$('contenido').innerHTML=transport.responseText;
									
								}
							});				
							$('actuacion').innerHTML="Registro ingresado";
						}else if(transport.responseText==4){
							$('mensajes').innerHTML="<b>Verifique el c&oacute;digo del cliente no puede contener caracteres extra&ntilde;os ni espacios en blanco</b><br><br>";							
						}else if(transport.responseText==5){
							$('mensajes').innerHTML="<b>No puede usar (,)  como signo decimal. En su lugar use el (.)</b><br><br>";
						}else if(transport.responseText==6){
							$('mensajes').innerHTML="<b>Debe ingresar como minimo la direcci&oacute;n 1 y no puede contener caracteres extra&ntilde;os.</b><br><br>";
						}else if(transport.responseText==7 || transport.responseText==8 || transport.responseText==9){
							$('mensajes').innerHTML="<b>No puede ingresar caracteres extra&ntilde;os.</b><br><br>";
						}else if(transport.responseText==10){
							$('mensajes').innerHTML="<b>La direcci&oacute;n de E-mail no es valida.</b><br><br>";
						}					
							
					}
				});
	    	}
		}catch(err){
			Ext.MessageBox.alert('Aviso','Debe seleccionar el Departamento, Ciudad y Distrito');	
		}
	});	
}

function muestra_ciudad()
{
	var miOpcion=document.forms[0].departamento.selectedIndex;
     	busca_ciudad(document.forms[0].departamento.options[miOpcion].value);
}

function busca_ciudad(iddepartamento){
	$('f_ciudad').innerHTML="";
	new Ajax.Request('p_mtto_cliente.php', {
		method: 'post',
		parameters:{
			n		:2,
			iddpto	:iddepartamento
		},
		onSuccess: function(transport) {
			$('f_ciudad').innerHTML=transport.responseText;
		}
	});	
}

function muestra_distrito()
{
	var miOpcion2=document.forms[0].departamento.selectedIndex;
     	busca_distrito(document.forms[0].departamento.options[miOpcion2].value);
}

function busca_distrito(idciudad){
	$('f_distrito').innerHTML="";
	new Ajax.Request('p_mtto_cliente.php', {
		method: 'post',
		parameters:{
			n		:3,
			idciu	:idciudad
		},
		onSuccess: function(transport) {
			$('f_distrito').innerHTML=transport.responseText;
		}
	});	
}

function limpia_combos(){
	$('f_ciudad').innerHTML="";
	$('f_distrito').innerHTML="";	
}