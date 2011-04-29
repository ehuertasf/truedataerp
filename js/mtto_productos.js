/*window.onload=function(){
	carga()
}*/
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
    Ext.QuickTips.init();
	var btn_agregar = new Ext.Button({
        text	:'Agregar',
        id		:'btn1',
        width	:150,
        renderTo:'btn_agregar',
        handler	:agrega_producto,
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
		new Ajax.Request('p_busca_producto.php', {
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
	new Ajax.Request('p_busca_producto.php', {
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
    new Ajax.Updater('contenido','p_ftn_formulario.php',{
      parameters: {
        caso:       1  
      }
    });	
    $('actuacion').innerHTML="";
}

function buscador(){
	new Ajax.Request('p_busca_producto.php', {
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

function modificar_producto(idproducto){
	
	new Ajax.Request('p_mtto_producto.php', {
		method: 'post',
		parameters:{
			n:1,
			idproducto:idproducto
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
	Ext.Msg.confirm('ALERTA!','Realmente desea modificar el producto?',function(btn,text){
    	if(btn=='yes'){
			new Ajax.Request('p_mtto_productos.php', {
				method: 'post',
				parameters:{
					tarea		:'modificar',
					idproducto	:$F('id_pr'),
					grupo		:$F('familia'),
					producto	:$F('d_producto'),
					codigo		:$F('c_codigoI'),
					codigo_mask	:$F('c_codigoII'),
					peso		:$F('peso'),
					unidad		:$F('unidad'),
					precio_u	:$F('precio_s'),
					precio_d	:$F('precio_d'),
					precio2_d	:$F('precio_d2'),
					empaque		:$F('empaque'),
					marca		:$F('marca'),
					idusuario	:$F('idusuario')					
				},
			
				onSuccess: function(transport) {
					if(transport.responseText==1){			
						new Ajax.Request('p_busca_producto.php', {
							method: 'post',
							parameters:{
								n:2,
								buscar:$F('d_producto')
							},
						
							onSuccess: function(transport) {
								$('contenido').innerHTML=transport.responseText;
								
							}
						});				
						$('mensajes').innerHTML="";						
						$('actuacion').innerHTML="Registro actualizado";
					}else if(transport.responseText==5){
						$('actuacion').innerHTML="No puede usar (,)  como signo decimal. En su lugar use el (.)";
					}else if(transport.responseText==7){
						$('mensajes').innerHTML="<b>No puede usar caracteres extra&ntilde;os en el campo c&oacute;digo I (solo guiones). <br> Recuerde que la longitud m&iacute;nima es de 3 caracteres y la m&aacute;xima de 10<br><br></b>";
					}else if(transport.responseText==8){
						$('mensajes').innerHTML="<b>No puede usar caracteres extra&ntilde;os en el campo c&oacute;digo II (solo guiones). <br> Recuerde que la longitud m&iacute;nima es de 3 caracteres y la m&aacute;xima de 10<br><br></b>";
					}else if(transport.responseText==9){
						$('mensajes').innerHTML="<b>No puede usar caracteres extra&ntilde;os en el campo descripci&oacute;n. <br> Recuerde que la longitud m&iacute;nima es de 3 caracteres y la m&aacute;xima de 30<br><br></b>";
					}
					
				}
			});
    	}
	});
}

function eliminar_producto(idproducto){
	
	Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el producto?',function(btn,text){
    	if(btn=='yes'){
			new Ajax.Request('p_mtto_productos.php', {
				method: 'post',
				parameters:{
					tarea		:'borrar',
					idproducto	:idproducto,
					idusuario	:$F('idusuario')
				},
			
				onSuccess: function(transport) {
					if(transport.responseText==1){
						$('contenido').innerHTML="";		
						$('actuacion').innerHTML="Registro eliminado";
					}else if(transport.responseText==3){
						$('contenido').innerHTML="";		
						$('actuacion').innerHTML="Este registro no puede ser eliminado por tener movimientos hist&oacute;ricos";
						
					}
				}
			});
    	}
	});
	
}

function mostrar_todos(){
	$('actuacion').innerHTML="";
	new Ajax.Request('p_busca_producto.php', {
		method: 'post',
		parameters:{
			n:1
		},
	
		onSuccess: function(transport) {
			$('contenido').innerHTML=transport.responseText;
			
		}
	});
}

function agrega_producto(){
	$('actuacion').innerHTML="";
	new Ajax.Request('p_busca_producto.php', {
		method: 'post',
		parameters:{
			n:3
		},
	
		onSuccess: function(transport) {
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
		if($F('familia')!='---' && $F('unidad')!='---' && $F('marca')!='---'){
	    	if(btn=='yes'){
				new Ajax.Request('p_mtto_productos.php', {
					method: 'post',
					parameters:{
						tarea		:'nuevo',
						grupo		:$F('familia'),
						producto	:$F('d_producto'),
						codigo		:$F('c_codigoI'),
						codigo_mask	:$F('c_codigoII'),
						peso		:$F('peso'),
						unidad		:$F('unidad'),
						precio_u	:$F('precio_s'),
						precio_d	:$F('precio_d'),
						precio2_d	:$F('precio_d2'),
						empaque		:$F('empaque'),
						marca		:$F('marca'),
						idusuario	:$F('idusuario')					
					},
				
					onSuccess: function(transport) {
						if(transport.responseText==1){
							new Ajax.Request('p_busca_producto.php', {
								method: 'post',
								parameters:{
									n:2,
									buscar:$F('d_producto')
								},
							
								onSuccess: function(transport) {
									$('contenido').innerHTML=transport.responseText;
									
								}
							});				
							$('actuacion').innerHTML="Registro ingresado";
						}else if(transport.responseText==5){
							$('actuacion').innerHTML="No puede usar (,)  como signo decimal. En su lugar use el (.)";
						}
						
					}
				});
	    	}
		}else{
			Ext.MessageBox.alert('Aviso','Debe seleccionar un valor de Familia, Unidad y Peso');
		}
	});	
}
