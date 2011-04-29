Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"
Ext.QuickTips.init();
Ext.onReady(function(){

  var ds = new Ext.data.Store({
      proxy: new Ext.data.HttpProxy({
        url: 'frame_repuesto.php', 
        waitMsg: 'Buscando...'
      }),
      reader: new Ext.data.JsonReader({
        root: 'lista_productos',
        id: 'post_id'
        },[
          {name:'idproducto',mapping: 'idproducto'},
          {name:'cadena',mapping: 'cadena'}
        ])
  });
  
  var resultTpl = new Ext.XTemplate(
      '<tpl for="."><div class="search-item">',
          '<h3><span>{cadena}</span></h3><br>',
          
      '</div></tpl>'
  );
  
  var search = new Ext.form.ComboBox({
      id:'caja1',
      store: ds,
      displayField:'cadena',
      typeAhead: false,
      loadingText: 'Buscando...',
      width: 300,
      pageSize:10,
      hideTrigger:true,
      tpl: resultTpl,
      renderTo: 'productos',
      itemSelector: 'div.search-item',
      onSelect: function(record){ 
          
          $('caja1').value=record.data.cadena;
      }
  });

  
  var ds2 = new Ext.data.Store({
      proxy: new Ext.data.HttpProxy({
        url: 'frame_vendedor.php', 
        waitMsg: 'Buscando...'
      }),
      reader: new Ext.data.JsonReader({
        root: 'lista_vendedores',
        id: 'post_id'
        },[
          {name:'idvendedor',mapping: 'idvendedor'},
          {name:'cadena',mapping: 'cadena'}
        ])
  });
  
  var resultTpl2 = new Ext.XTemplate(
      '<tpl for="."><div class="search-item">',
          '<h3><span>{cadena}</span></h3><br>',
          
      '</div></tpl>'
  );
  
  var search2 = new Ext.form.ComboBox({
      id:'caja2',
      store: ds2,
      displayField:'cadena',
      typeAhead: false,
      loadingText: 'Buscando...',
      width: 300,
      pageSize:10,
      hideTrigger:true,
      tpl: resultTpl2,
      renderTo: 'vendedores',
      itemSelector: 'div.search-item',
      onSelect: function(record){ 
          
          $('caja2').value=record.data.cadena;
      }
  });  
  
  var xfecha=new Ext.form.DateField({
      fieldLabel	:'Fecha Ini.',
      id			:'fecha1',
      name		:'fecha1',
      width		:110,
      format		:'d-m-Y',
      //renderTo  :'fecha',
      renderer	:function(value) { return value ? new Date(value).dateFormat('d.m.Y') : ''; },
      allowBlank	:false
  });
});
         
function agregar_producto(iddiv){  
  var j_vendedor  =$F('caja2');
  var j_producto  =$F('caja1');
  var j_cantidad  =$F('cantidad');
  var j_idusuario =$F('idusuario');  
  var j_usuario   =$F('usuario');
    
  var j_array_vendedor=new Array()
  j_array_vendedor=j_vendedor.split("|");

  var j_array=new Array()
  j_array=j_producto.split("|");  
  
  if(j_cantidad!=0){
    new Ajax.Updater('listado_productos','p_entrega_vendedor.php',{
      parameters: {
        cod_vendedor: j_array_vendedor[0],
        codigo:     j_array[0],
        cantidad:   j_cantidad,
        idusuario:  j_idusuario,
        caso:       1  
      }
    });
    $('caja2').disabled="true"; 
    $('caja1').value='';
    $('cantidad').value='';  
    $('btn_validar_ing').style.display="block";
  }else{
    Ext.Msg.alert('AVISO','Debe ingresar la cantidad.');
  }    
}

function elimina_producto_tmp(id,idusuario){
  Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el registro?',function(btn,text){
    if(btn=='yes'){
      new Ajax.Request('p_elimina_ingreso_vendedor_tmp.php',{
        method:'post',
        parameters:{
          caso: 1,        
          id: id,
          idusuario : idusuario
        },
        onSuccess: function(transport){
          if(transport.responseText==1){
            new Ajax.Updater('listado_productos','p_elimina_ingreso_vendedor_tmp.php',{
              parameters: {
                caso:  2,
                idusuario:  idusuario  
              }
            });            
            Ext.Msg.alert('Aviso','El registro seleccionado fue eliminado');        
          }
        }
      });    
    }
  });

}

function recargaPagina(){
	window.location.reload();	
}

function valida_ingreso(){
  //var j_fecha     =$F('fecha1');
  var j_vendedor =$F('caja2');
  var j_idusuario =$F('idusuario');  

  var j_array_vendedor=new Array()
  j_array_vendedor=j_vendedor.split("|");
  
   
  Ext.Msg.confirm('CONFIRMACION!','Realmente desea validar en ingreso de esta informaci&oacute;n?',function(btn,text){
    //if(j_fecha.length==10){
      if(btn=='yes'){
        new Ajax.Request('p_entrega_vendedor.php',{
          method:'post',
          parameters:{
            caso:       	2,        
            cod_vendedor:   j_array_vendedor[0],
            idusuario : 	j_idusuario
            //fecha:      j_fecha
          },
          onSuccess: function(transport){
            if(transport.responseText==1){    
				Ext.Msg.show({
				   title:'CONFIRMACION',
				   msg: 'Los productos y sus cantidades han sido almacenados en el registro de muestras que tiene el vendedor.',
				   buttons: Ext.Msg.OK,
				   fn: recargaPagina,
				   animEl: 'elId',
				   icon: Ext.MessageBox.INFO
				});
              	//Ext.Msg.alert('AVISO','Los productos y sus cantidades han sido agregados al stock del almac&eacute;n.');              	
				//                                    
            }else if(transport.responseText==2){	//Si ocurrio un error grave borro la guia y sus detalles
            	new Ajax.Request('p_entrega_vendedor.php',{
            		method:'post',
					parameters:{
		            	caso:         3,        
		            	cod_vendedor: j_array_vendedor[0],
		            	idusuario 	: j_idusuario
		          },
		          onSuccess: function(transport){
		          	if(transport.responseText==1)	Ext.Msg.alert('AVISO','Ocurrio un error al grabar la informaci&oacute;n. Es muy probable que los datos no se hayan guardado.');		          			          	
		          }
            	});		
            }else if(transport.responseText==3){
				Ext.Msg.alert('AVISO','Ocurrio un error al actualizar el stock. Comuniquese con el administrador del sistema.');		          			          	            	
            }
          }
        });    
      }
   /* }else{
      Ext.Msg.alert('AVISO','Debe ingresar la fecha correctamente.');      
    }*/
  });  
}


